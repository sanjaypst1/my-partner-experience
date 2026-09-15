import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { ecosystemLinks, ecosystemNodes, layerMeta, nodeById } from './ecosystemModel';
import type { EcosystemLayer } from './ecosystemModel';
import { useDocumentVisible } from '@/hooks/useDocumentVisible';

const SIGNAL_COUNT = 16;

const X_SPREAD = 1.4;
const Y_SPREAD = 0.9;

/** Node positions in scene space. Z stays shallow: this is a diagram, not a flythrough. */
function scenePosition(x: number, y: number, seed: number): [number, number, number] {
  return [x * X_SPREAD, y * Y_SPREAD, Math.sin(seed * 2.3) * 0.35];
}

/** Bounding box of the diagram, with room for node radii and the platform glow. */
const DIAGRAM_BOUNDS = (() => {
  const xs = ecosystemNodes.map((node) => node.x * X_SPREAD);
  const ys = ecosystemNodes.map((node) => node.y * Y_SPREAD);
  const padding = 0.25;
  return {
    minX: Math.min(...xs) - padding,
    maxX: Math.max(...xs) + padding,
    minY: Math.min(...ys) - padding,
    maxY: Math.max(...ys) + padding,
  };
})();

/**
 * Fits the whole diagram inside the canvas. The canvas itself is positioned in the hero
 * (right-hand side on desktop, full width on mobile), so this only has to scale to fit —
 * which keeps the composition stable from a phone to an ultrawide display.
 */
function FitToViewport({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();

  const width = DIAGRAM_BOUNDS.maxX - DIAGRAM_BOUNDS.minX;
  const height = DIAGRAM_BOUNDS.maxY - DIAGRAM_BOUNDS.minY;
  const centreX = (DIAGRAM_BOUNDS.minX + DIAGRAM_BOUNDS.maxX) / 2;
  const centreY = (DIAGRAM_BOUNDS.minY + DIAGRAM_BOUNDS.maxY) / 2;

  // Fit to whichever axis is tighter, then cap it so the diagram never becomes coarse on
  // a very large display.
  const scale = Math.min(
    (Math.min(viewport.width / width, viewport.height / height) * 9) / 10,
    0.82,
  );

  return (
    <group scale={scale} position={[-centreX * scale, -centreY * scale, 0]}>
      {children}
    </group>
  );
}

/**
 * One layer of nodes. Each node owns its material so brightness can be animated per
 * node — the point of the visual is that readiness spreads through the chain, which a
 * single shared material cannot express.
 *
 * Roughly twenty small spheres in total, so individual meshes cost nothing here.
 */
function NodeLayer({ layer }: { layer: EcosystemLayer }) {
  const nodes = useMemo(() => ecosystemNodes.filter((node) => node.layer === layer), [layer]);
  const meta = layerMeta[layer];
  const isPlatform = layer === 'platform';
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const geometry = useMemo(
    () => new THREE.SphereGeometry(isPlatform ? 0.26 : 0.085, isPlatform ? 32 : 16, isPlatform ? 32 : 16),
    [isPlatform],
  );

  const materials = useMemo(
    () =>
      nodes.map(
        () =>
          new THREE.MeshStandardMaterial({
            color: meta.hex,
            emissive: new THREE.Color(meta.hex),
            emissiveIntensity: 0.7,
            roughness: 0.35,
            metalness: 0.1,
          }),
      ),
    [nodes, meta.hex],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      materials.forEach((material) => material.dispose());
    },
    [geometry, materials],
  );

  // A slow wave of readiness travelling along the chain: each node brightens and swells
  // as the wave reaches its column, then settles back.
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    nodes.forEach((node, index) => {
      const mesh = meshRefs.current[index];
      if (!mesh) return;
      const wave = 0.5 + 0.5 * Math.sin(time * 0.55 - node.x * 1.6 + index * 0.35);
      // Sharpened so nodes genuinely travel from dim to bright as the wave arrives,
      // rather than hovering near full brightness the whole time.
      const readiness = node.intensity * Math.pow(wave, 1.6);
      mesh.scale.setScalar(1 + (isPlatform ? 0.05 : 0.16) * wave);
      // Tone mapping is off, so values stay at or below 1 to remain saturated rather
      // than clipping towards white.
      materials[index].emissiveIntensity = isPlatform
        ? 0.6 + readiness * 0.2
        : 0.16 + readiness * 0.86;
    });
  });

  return (
    <group>
      {nodes.map((node, index) => (
        <mesh
          key={node.id}
          ref={(mesh) => {
            meshRefs.current[index] = mesh;
          }}
          geometry={geometry}
          material={materials[index]}
          position={scenePosition(node.x, node.y, index)}
        />
      ))}
    </group>
  );
}

/**
 * A soft additive glow behind the platform node, so the hub reads as the source of light
 * in the chain rather than just the largest circle.
 */
function PlatformHalo() {
  const platform = useMemo(() => ecosystemNodes.find((node) => node.layer === 'platform'), []);

  // A billboard with a radial falloff. A transparent sphere would read as a hard-edged
  // ball; this reads as light.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColour: { value: new THREE.Color(layerMeta.platform.hex) },
          uStrength: { value: 0.3 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColour;
          uniform float uStrength;
          varying vec2 vUv;
          void main() {
            float falloff = pow(clamp(1.0 - distance(vUv, vec2(0.5)) * 2.0, 0.0, 1.0), 2.6);
            gl_FragColor = vec4(uColour, falloff * uStrength);
          }
        `,
      }),
    [],
  );

  const geometry = useMemo(() => new THREE.PlaneGeometry(2.4, 2.4), []);

  useEffect(
    () => () => {
      material.dispose();
      geometry.dispose();
    },
    [material, geometry],
  );

  useFrame(({ clock }) => {
    const breathe = 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 0.45);
    material.uniforms.uStrength.value = 0.16 + breathe * 0.09;
  });

  if (!platform) return null;

  const [x, y] = scenePosition(platform.x, platform.y, 0);

  return <mesh geometry={geometry} material={material} position={[x, y, -0.2]} />;
}

function LinkLines() {
  const geometry = useMemo(() => {
    const points: number[] = [];
    const colours: number[] = [];
    const colour = new THREE.Color();

    for (const link of ecosystemLinks) {
      const from = nodeById(link.from);
      const to = nodeById(link.to);
      if (!from || !to) continue;
      const a = scenePosition(from.x, from.y, points.length);
      const b = scenePosition(to.x, to.y, points.length + 1);
      points.push(...a, ...b);
      colour.set(layerMeta[from.layer].hex);
      colours.push(colour.r, colour.g, colour.b);
      colour.set(layerMeta[to.layer].hex);
      colours.push(colour.r, colour.g, colour.b);
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colours, 3));
    return bufferGeometry;
  }, []);

  // Geometry is created outside the React tree, so dispose it explicitly.
  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.45} />
    </lineSegments>
  );
}

function Signals() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const paths = useMemo(() => {
    const usable = ecosystemLinks
      .map((link) => ({ from: nodeById(link.from), to: nodeById(link.to) }))
      .filter((entry) => entry.from && entry.to);

    return Array.from({ length: SIGNAL_COUNT }, (_, index) => {
      const entry = usable[index % usable.length];
      const from = entry.from!;
      const to = entry.to!;
      return {
        a: new THREE.Vector3(...scenePosition(from.x, from.y, index)),
        b: new THREE.Vector3(...scenePosition(to.x, to.y, index + 1)),
        offset: (index / SIGNAL_COUNT) * 1.4,
        speed: 0.28 + (index % 5) * 0.05,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = clock.getElapsedTime();

    paths.forEach((path, index) => {
      const t = (time * path.speed + path.offset) % 1;
      dummy.position.lerpVectors(path.a, path.b, t);
      // Fade in and out at the ends so signals appear to travel, not teleport.
      const fade = Math.sin(t * Math.PI);
      // Small enough to read as a signal in transit rather than another node.
      dummy.scale.setScalar(0.016 + fade * 0.03);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, SIGNAL_COUNT]} frustumCulled={false}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial color="#d8fbff" transparent opacity={0.9} />
    </instancedMesh>
  );
}

/** Very restrained pointer parallax. No orbiting, no dramatic camera moves. */
function CameraDrift() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      target.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 0.5,
        y: (event.clientY / window.innerHeight - 0.5) * 0.3,
      };
    };
    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useFrame(() => {
    camera.position.x += (target.current.x - camera.position.x) * 0.03;
    camera.position.y += (-target.current.y - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * The hero ecosystem: vendor nodes, one central platform node, partner nodes and
 * end-customer nodes, with signals travelling along the chain.
 *
 * Only mounted when WebGL is available, motion is allowed and the device can afford it
 * — see `shouldRenderThreeScene`. Everyone else gets `EcosystemFallback`.
 */
export default function HeroEcosystem() {
  const documentVisible = useDocumentVisible();

  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      // Stop rendering entirely while the tab is in the background.
      frameloop={documentVisible ? 'always' : 'never'}
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      // No tone mapping: the palette is the point, and ACES washes the accent colours
      // towards grey.
      flat
      // The scene is decorative; its meaning is provided by the fallback's description.
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.22} />
      <pointLight position={[0, 2, 4]} intensity={10} color="#7c3aed" distance={14} />
      <pointLight position={[3, -2, 3]} intensity={7} color="#0071e3" distance={14} />
      <FitToViewport>
        <PlatformHalo />
        <LinkLines />
        <NodeLayer layer="vendor" />
        <NodeLayer layer="platform" />
        <NodeLayer layer="partner" />
        <NodeLayer layer="customer" />
        <Signals />
      </FitToViewport>
      <CameraDrift />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
