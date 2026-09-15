/**
 * SINGLE SOURCE OF TRUTH FOR SITE CONTENT.
 *
 * Edit this file to update the site — components read from it and never hold copy of their own.
 *
 * Integrity rules, please keep them:
 *  - Do not put a number in `value` unless you can point to it in a document. Set `source` too.
 *  - Leave `verified: false` and write the prompt in `placeholder` until then.
 *  - Set `showUnverifiedPlaceholders: false` before public sharing to hide every unverified item.
 */

import type {
  CaseStudy,
  ContactAction,
  JourneyStage,
  LifecycleStage,
  OperatingModelPillar,
  RegionNode,
  ScalingPattern,
  SectionMeta,
} from '@/types/portfolio';

export interface SiteConfig {
  /**
   * true  → private review mode: unverified metrics appear as "Metric to verify" prompts.
   * false → production mode: every unverified metric and open question is removed from the DOM.
   */
  showUnverifiedPlaceholders: boolean;
  /** Total walkthrough length is derived from section minutes; see `sections` below. */
  walkthroughAutoAdvance: boolean;
}

export const siteConfig: SiteConfig = {
  // Share-ready: unverified metrics and open prompts stay out of the public site.
  showUnverifiedPlaceholders: false,
  walkthroughAutoAdvance: false,
};

export const person = {
  name: 'Sanjay Singh Rawat',
  role: 'Project, Program and Partner Experience Leader',
  location: 'Victoria, Australia',
  targetRole: 'Project Manager, Partner Experience',
  targetCompany: 'Pax8',
  valueProposition:
    'I turn strategic ideas into scalable partner experiences by connecting journey design, regional execution, governance, enablement, operational readiness and measurable business outcomes.',
  coreStory: 'Designed once. Proven through a pilot. Improved through feedback. Deployed many times.',
  modelStatement: 'Journey + Scale + Governance + Repeatability',
} as const;

export const heroContent = {
  headline: 'Building Partner Experiences That Scale',
  supportingLine:
    'From channel journey design to regional rollout, governance, enablement and measurable business outcomes.',
  primaryCta: 'Start the Partner Experience Walkthrough',
  secondaryCta: 'Explore My Experience',
  summaryPoints: [
    {
      id: 'journey',
      label: 'Journey',
      detail: 'Design the experience around the people closest to the customer, not the org chart.',
    },
    {
      id: 'scale',
      label: 'Scale',
      detail: 'Hold a common core steady while each region implements something practical.',
    },
    {
      id: 'governance',
      label: 'Governance',
      detail: 'Proportionate structure that speeds decisions instead of generating reports.',
    },
    {
      id: 'repeatability',
      label: 'Repeatability',
      detail: 'Build assets once, review them properly, then reuse them deployment after deployment.',
    },
  ],
} as const;

export const confidentialityNotice =
  'This portfolio describes transferable program-management approaches. Confidential organisational information, client data and proprietary implementation details have been intentionally excluded.';

/**
 * Walkthrough order and narration budget. Minutes total ~10, inside the 8–12 minute target.
 * `exploreLabel` marks the eight destinations offered under "Explore freely".
 */
export const sections: SectionMeta[] = [
  { id: 'hero', walkthroughTitle: 'Opening: the value proposition', minutes: 0.5, exploreLabel: 'Executive Summary' },
  {
    id: 'partner-experience-problem',
    walkthroughTitle: 'The Partner Experience problem',
    minutes: 0.75,
  },
  { id: 'operating-model', walkthroughTitle: 'My operating model', minutes: 1, exploreLabel: 'Experience Programs' },
  { id: 'daimler', walkthroughTitle: 'Daimler Mercedes-Benz: the channel experience', minutes: 1, parent: 'operating-model' },
  { id: 'ubs', walkthroughTitle: 'UBS: scaling across regions', minutes: 1, parent: 'operating-model' },
  { id: 'nab-compass', walkthroughTitle: 'NAB Compass: governance and benefits', minutes: 1, parent: 'operating-model' },
  { id: 'merck-cornerstone', walkthroughTitle: 'Merck Cornerstone: quality and repeatability', minutes: 1, parent: 'operating-model' },
  { id: 'bank-of-america', walkthroughTitle: 'Bank of America: multi-party deployments', minutes: 0.5, parent: 'operating-model' },
  { id: 'build-once', walkthroughTitle: 'Build once, deploy many', minutes: 0.75 },
  { id: 'pax8-application', walkthroughTitle: 'A hypothetical Pax8 application', minutes: 1, exploreLabel: 'Pax8 Fit' },
  { id: 'scaling-challenges', walkthroughTitle: 'Twelve scaling challenges', minutes: 0.75, exploreLabel: 'Scaling Challenges' },
  { id: 'ninety-days', walkthroughTitle: 'How I would deliver the role', minutes: 0.75, exploreLabel: '90-Day Approach' },
  { id: 'metrics', walkthroughTitle: 'Metrics and evidence', minutes: 0.75, exploreLabel: 'Metrics' },
  { id: 'conversation', walkthroughTitle: 'What I would like to explore with Pax8', minutes: 0.5, exploreLabel: 'Interview Discussion' },
  { id: 'closing', walkthroughTitle: 'Closing', minutes: 0.25, exploreLabel: 'Contact' },
];

/* ------------------------------------------------------------------ *
 * SECTION 2 — The Partner Experience problem
 * ------------------------------------------------------------------ */

export const problemContent = {
  eyebrow: 'Section 02 — The problem',
  title: 'The product is only one link in the chain',
  keyMessage:
    'A strong product alone does not create a strong partner experience. The complete operating chain must work.',
  intro:
    'Partner Experience programs live across several groups at once. Strategy is set in one place, content is written in another, marketing communicates it, regions deliver it, and partners decide whether any of it is worth their time. The experience is only as good as the weakest handover in that chain.',
  distinction: {
    title: 'Partner Experience is not Partner Success',
    experience:
      'Partner Experience is the designed, one-to-many system a partner moves through: how they learn what is available, how they build capability, how they transact, how they get help and how they give feedback. It is a program and design discipline.',
    success:
      'Partner Success is the one-to-one relationship that helps a named partner reach their commercial goals. It is an account and relationship discipline.',
    why: 'The two need each other. Partner Success surfaces the friction; Partner Experience fixes it at the system level so the next thousand partners never hit it.',
  },
  challenges: [
    'Fragmented functional ownership',
    'Different regional requirements',
    'Different partner maturity levels',
    'Limited subject-matter expert capacity',
    'Rapidly changing technology',
    'Weak connection between training and adoption',
    'Inconsistent measurement',
    'Pressure to scale without losing quality',
  ],
} as const;

export const journeyStages: JourneyStage[] = [
  {
    id: 'strategy',
    label: 'Strategy',
    description: 'The outcome the business is actually trying to buy, stated in partner terms.',
    owner: 'Experience leadership',
  },
  {
    id: 'program-design',
    label: 'Program design',
    description: 'Audiences, segments, sequence, dependencies and readiness criteria.',
    owner: 'Program management',
  },
  {
    id: 'content-enablement',
    label: 'Content and enablement',
    description: 'Modules, plays, playbooks and guides authored by the people who own accuracy.',
    owner: 'Content and product specialists',
  },
  {
    id: 'marketing-communication',
    label: 'Marketing and communication',
    description: 'Positioning, invitation, sequencing and reminders that respect partner attention.',
    owner: 'Marketing',
  },
  {
    id: 'regional-readiness',
    label: 'Regional readiness',
    description: 'Local relevance, capacity, timing, language and delivery format confirmed.',
    owner: 'Regional teams',
  },
  {
    id: 'partner-adoption',
    label: 'Partner adoption',
    description: 'Partners apply the capability in their own sales, delivery and operations.',
    owner: 'Partner-facing teams',
  },
  {
    id: 'business-outcomes',
    label: 'Business outcomes',
    description: 'Practice growth, efficiency, retention and downstream customer results.',
    owner: 'Business sponsor',
  },
  {
    id: 'feedback-improvement',
    label: 'Feedback and improvement',
    description: 'Evidence returns to design, so the next deployment starts further ahead.',
    owner: 'Program management',
  },
];

/* ------------------------------------------------------------------ *
 * SECTION 3 — Operating model pillars
 * ------------------------------------------------------------------ */

export const operatingModelPillars: OperatingModelPillar[] = [
  {
    id: 'pillar-daimler',
    caseStudyId: 'daimler',
    employer: 'Daimler Mercedes-Benz',
    promise: 'Shape the partner journey',
    keyword: 'Journey',
    accent: 'cyan',
    businessProblem:
      'Digital lending for commercial vehicles and passenger cars had to work as one experience across markets — rent, buy and lease — while regional teams still faced different readiness, process and support realities.',
    myResponsibility:
      'As Regional Program Manager and Coach, coordinate Simba delivery so customer-facing and market teams could adopt a one-stop digital lending ecosystem, not only the central build.',
    actions: [
      'Mapped the end-to-end digital lending journey from forms and OMR through e-sign, e-contracting, insurance and regulatory checks',
      'Aligned central IT (as managed service for the business) with regional operations in markets including Russia, Malaysia and Singapore',
      'Partnered with Learning Academy owners so enablement matched the live Simba journey',
      'Built one integrated roadmap across platform, process, Academy, readiness, communication and adoption',
      'Coached market teams through pilot use of Simba before wider rollout',
    ],
    challenges: [
      'One platform serving rent, buy and lease journeys with different local constraints',
      'Uneven market maturity and unclear hand-offs between digital steps',
      'Risk that technical completion would outrun operational adoption',
    ],
    resolution:
      'Journey-based planning, role-specific readiness, named support routes and a coached pilot before scale-out.',
    reusableOutputs: [
      'Digital lending journey map covering Simba capabilities',
      'Role-specific readiness checklists for market teams',
      'Reusable deployment and coaching pack for later markets',
    ],
    measuresOfSuccess: [
      'Market teams could complete the lending journey without informal workarounds',
      'Readiness evidenced before launch rather than assumed',
      'Feedback from early markets carried into the next deployment',
    ],
    pax8Relevance:
      'Channel and partner outcomes depend on the full operating chain — platform, enablement, communications, regional readiness and support — not on a single product release.',
  },
  {
    id: 'pillar-ubs',
    caseStudyId: 'ubs',
    employer: 'UBS',
    promise: 'Scale it across regions',
    keyword: 'Scale',
    accent: 'violet',
    businessProblem:
      'A Singapore-led global stream had to land cloud and wealth-management capabilities across Hong Kong, Taiwan, India and China without fracturing into unmanaged local forks.',
    myResponsibility:
      'As Program Manager, preserve a common program core while making each regional implementation practical, compliant and adoptable — including products such as Optimus that uplifted how clients trade.',
    actions: [
      'Led the global stream from Singapore and coordinated sub-streams in Hong Kong, Taiwan, India and China',
      'Classified requirements as global non-negotiables, mandatory local requirements or local preferences',
      'Ran fit-gap and readiness reviews before each regional wave',
      'Maintained one integrated roadmap with regional milestones and common status definitions',
    ],
    challenges: [
      'Time zones, market maturity and local control requirements',
      'Cloud capability and product availability differing by market',
      'Pressure for a single global date regardless of readiness',
    ],
    resolution:
      'Standardise the core, configure the edges, gate each wave on readiness evidence and give every local variation a named owner.',
    reusableOutputs: [
      'Requirement classification model',
      'Reusable regional deployment lifecycle',
      'Common status and reporting definitions across sub-streams',
    ],
    measuresOfSuccess: [
      'Share of components reused rather than rebuilt',
      'Rollout predictability wave over wave',
      'No unmanaged program forks between regional sub-streams',
    ],
    pax8Relevance:
      'The same model scales enablement and transformation programs across Australia and APAC while keeping a credible common core.',
  },
  {
    id: 'pillar-nab',
    caseStudyId: 'nab-compass',
    employer: 'NAB',
    promise: 'Govern delivery and benefits',
    keyword: 'Governance',
    accent: 'amber',
    businessProblem:
      'After NAB acquired Citi’s consumer finance business, Compass had to support unsecured lending products through multiple workstreams — without leadership losing a single view of delivery and benefits.',
    myResponsibility:
      'As Delivery Lead, establish integrated governance so Compass delivery stayed visible, decision-ready and connected to adoption and benefits after go-live.',
    actions: [
      'Created integrated cross-functional roadmaps across business, technology, operations, risk and change',
      'Introduced common milestone and status definitions with RAID and dependency ownership',
      'Separated delivery reviews from executive decision forums',
      'Defined benefit hypotheses and kept measurement running after implementation',
    ],
    challenges: [
      'Disconnected workstream plans after a complex business integration',
      'Inconsistent RAG status and late dependency identification',
      'Project completion being mistaken for benefit realisation',
    ],
    resolution:
      'One integrated roadmap, proportionate governance, decision-oriented reporting and benefits tracked beyond go-live.',
    reusableOutputs: [
      'Integrated Compass roadmap and dependency model',
      'Decision-oriented executive report pack',
      'Benefits hypothesis and measurement framework',
    ],
    measuresOfSuccess: [
      'Decision turnaround time',
      'Dependencies identified before they became issues',
      'Benefits still being measured after implementation closed',
    ],
    pax8Relevance:
      'Launch is not the finish line. Participation, capability, application and commercial impact have to stay on the same roadmap as delivery.',
  },
  {
    id: 'pillar-merck',
    caseStudyId: 'merck-cornerstone',
    employer: 'Merck',
    promise: 'Make it repeatable',
    keyword: 'Repeatability',
    accent: 'magenta',
    businessProblem:
      'Cornerstone needed to uplift endpoint protection, firewall and cloud capability with quality and traceability — without restarting process design on every workstream.',
    myResponsibility:
      'As Senior Project Manager, establish a repeatable lifecycle so resiliency and data-integrity assets could be created once, reviewed effectively, released and reused.',
    actions: [
      'Mapped the asset and control lifecycle from need through specialist review, approval, release, feedback and maintenance',
      'Clarified author, reviewer, approver and owner roles across endpoint, firewall and cloud workstreams',
      'Introduced reusable templates, quality criteria and release-readiness checks',
      'Applied version control, review dates and retirement dates',
    ],
    challenges: [
      'Duplicate reviews and unclear approval ownership',
      'Version confusion as controls and guidance aged after release',
      'Local teams creating uncontrolled variants',
    ],
    resolution:
      'Minimum quality standards, modular reusable assets, controlled versions and defined maintenance with feedback from every deployment.',
    reusableOutputs: [
      'Cornerstone asset lifecycle with named roles',
      'Template and quality-criteria library',
      'Modular structure supporting controlled local variation',
    ],
    measuresOfSuccess: [
      'Review cycles per asset',
      'Assets reused across deployments',
      'Release predictability',
    ],
    pax8Relevance:
      'Specialists keep ownership of technical accuracy. Program management owns roadmap, dependencies, readiness, pilot, launch and measurement — quality without unnecessary bureaucracy.',
  },
];
/* ------------------------------------------------------------------ *
 * SECTIONS 4–8 — Case studies
 * ------------------------------------------------------------------ */

const verifiedField = (value: string) => ({
  value,
  placeholder: '',
  verified: true,
});

export const caseStudies: CaseStudy[] = [
  {
    id: 'daimler',
    order: 1,
    tier: 'primary',
    employer: 'Daimler Mercedes-Benz',
    programName: 'Simba',
    title: 'Daimler Mercedes-Benz: Designing a Consistent Channel Experience',
    eyebrow: 'Section 04 — Journey',
    role: verifiedField('Regional Program Manager and Coach'),
    timeframe: verifiedField('12 months'),
    capabilityDemonstrated:
      'Partner journey, Learning Academy enablement, channel coordination, readiness, communications, support and adoption across a digital lending ecosystem.',
    situation:
      'At Daimler Mercedes-Benz, IT operated as a managed service for the business, building digital lending solutions so markets such as Russia, Malaysia and Singapore could establish Simba — a one-stop shop to rent, buy or lease Daimler commercial vehicles and passenger cars. The platform supported the full digital lending ecosystem: form extraction, OMR, e-sign, e-contracting, welcome letter, insurance components, regulatory compliance checks and related services. Learning Academy and enablement teams prepared market and customer-facing roles to use Simba confidently. A centrally complete build could still create an inconsistent experience if those teams were not consulted, prepared or supported.',
    task:
      'As Regional Program Manager and Coach, my responsibility was to coordinate end-to-end implementation, Learning Academy enablement and coaching so Simba worked for the teams closest to the customer and the markets adopting it — not only for the teams designing it centrally.',
    actions: [
      'Mapped the complete stakeholder and digital lending journey across rent, buy and lease paths',
      'Identified awareness, value communication, readiness, access, process, support and feedback stages for Simba capabilities',
      'Partnered with Learning Academy and content owners so enablement modules matched the live Simba journey',
      'Created an integrated roadmap across business, technology, operations, Academy, communication and adoption',
      'Distinguished common platform standards from legitimate local market adaptations',
      'Coordinated readiness reviews and ownership with regional stakeholders',
      'Piloted the approach with an initial market group and coached teams through first use',
      'Converted the improved approach into reusable deployment, Academy and coaching assets',
      'Established feedback loops so later markets started further ahead',
    ],
    challenges: [
      'Central platform design versus local operational reality in each market',
      'Different stakeholder maturity across Russia, Malaysia and Singapore',
      'Unclear hand-offs between digital lending steps',
      'Inconsistent communications about what Simba could and could not do',
      'Limited readiness visibility before launch',
      'Risk of technical completion without operational adoption',
    ],
    resolutions: [
      'Journey-based planning anchored on the Simba lending ecosystem',
      'Role-specific readiness and coaching',
      'Common deployment assets for later markets',
      'Controlled local flexibility with named owners',
      'Named support and escalation routes',
      'Post-launch feedback into the next wave',
    ],
    reusableOutputs: [
      'Journey map covering Simba capabilities from forms through compliance and onboarding',
      'Readiness checklist per customer-facing and market role',
      'Deployment and coaching pack reused by later rollouts',
    ],
    successMeasures: [
      'Market teams could explain and complete the digital lending journey, not only operate screens',
      'Readiness evidenced before launch rather than assumed',
      'Issues routed to a named owner instead of escalating informally',
    ],
    metrics: [
      {
        id: 'daimler-stakeholder-groups',
        label: 'Stakeholder groups coordinated',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Number of stakeholder groups]',
        explanation: 'Distinct functions and channel-facing groups inside the Simba deployment scope.',
        level: 'delivery',
        countable: true,
      },
      {
        id: 'daimler-rollout-locations',
        label: 'Rollout locations',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Number of rollout locations]',
        explanation: 'Markets that received Simba (including Russia, Malaysia and Singapore in scope).',
        level: 'engagement',
        countable: true,
      },
      {
        id: 'daimler-readiness-issues',
        label: 'Reduction in readiness issues',
        value: null,
        unit: '%',
        verified: false,
        publicSafe: true,
        placeholder: '[Reduction in readiness issues]',
        explanation: 'Readiness defects raised after the pilot compared with before it.',
        level: 'delivery',
      },
      {
        id: 'daimler-adoption',
        label: 'Improvement in adoption',
        value: null,
        unit: '%',
        verified: false,
        publicSafe: true,
        placeholder: '[Improvement in adoption]',
        explanation: 'Use of Simba digital lending capabilities by market teams after launch.',
        level: 'capability',
      },
      {
        id: 'daimler-benefit',
        label: 'Delivery or operational benefit',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Insert verified business outcome]',
        explanation: 'The operational or commercial result attributed to the Simba deployment.',
        level: 'business',
      },
    ],
    openVerifications: [
      '[Confirm whether dealers were directly involved]',
      '[Confirm which Simba capabilities can be named publicly in more detail]',
      '[Insert number of markets beyond Russia, Malaysia and Singapore if applicable]',
    ],
    pax8Relevance:
      'A strong platform is only one link. Channel outcomes depend on enablement, communications, regional readiness, support and feedback — the same operating chain partners move through when adopting cloud and managed services.',
    confidentialityNote:
      'Described at the level of approach and coordination. Confidential process detail and commercial terms are excluded.',
    tags: ['Partner journey', 'Simba', 'Learning Academy', 'Digital lending', 'Readiness', 'Regional coaching', 'Adoption'],
    accent: 'cyan',
  },
  {
    id: 'ubs',
    order: 2,
    tier: 'primary',
    employer: 'UBS',
    programName: 'Optimus',
    title: 'UBS: Scaling a Common Program Across Regions',
    eyebrow: 'Section 05 — Scale',
    role: verifiedField('Program Manager'),
    timeframe: verifiedField('24 months'),
    capabilityDemonstrated:
      'APAC scaling, Learning Academy enablement, global-local alignment, new-market readiness and wave-based rollout for cloud and wealth-management capabilities.',
    situation:
      'At UBS, IT operated as a managed service for the business on Optimus — a global stream run from Singapore with sub-streams in Hong Kong, Taiwan, India and China. The program built cloud capability to support wealth-management products, uplifting how clients trade, as part of a broader one-stop ecosystem of services. Learning Academy pathways had to stay aligned as each regional wave went live. A common core had to land across regions with different stakeholders, processes, control requirements and delivery capacity.',
    task:
      'As Program Manager, my responsibility was to preserve a common Optimus program core — including Learning Academy readiness — while making each regional implementation practical, compliant and adoptable.',
    actions: [
      'Led the Singapore global stream and coordinated sub-streams across Hong Kong, Taiwan, India and China',
      'Classified requirements into global non-negotiables, mandatory local requirements and local preferences',
      'Performed fit-gap assessments for cloud, product and Academy readiness by market',
      'Synchronised Learning Academy content releases with each regional wave',
      'Conducted regional readiness reviews before each wave',
      'Created a reusable deployment lifecycle for subsequent markets',
      'Maintained one integrated roadmap with regional milestones',
      'Used wave-based rollout where readiness genuinely differed',
      'Established common status and reporting definitions across sub-streams',
      'Captured lessons from one region and incorporated them into the next rollout',
    ],
    challenges: [
      'Time zones across Singapore-led and regional sub-streams',
      'Different market maturity and product availability',
      'Local control requirements',
      'Regional capacity constraints',
      'Language and communication differences',
      'Excessive localisation requests',
      'Pressure for a single global date',
    ],
    resolutions: [
      'Standardise the core',
      'Configure the edges',
      'Use readiness evidence',
      'Roll out in waves',
      'Assign ownership for local variations',
      'Prevent unmanaged program forks',
    ],
    reusableOutputs: [
      'Requirement classification model reused for each new market',
      'Regional deployment lifecycle with entry and exit criteria',
      'Wave plan tied to readiness evidence across APAC sub-streams',
    ],
    successMeasures: [
      'Each wave started with fewer open questions than the last',
      'Local variations were owned and documented, not improvised',
      'One roadmap remained credible to both global and regional stakeholders',
    ],
    metrics: [
      {
        id: 'ubs-regions',
        label: 'Countries or regions in scope',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Number of countries or regions]',
        explanation: 'Markets in the Singapore-led stream (including Hong Kong, Taiwan, India and China).',
        level: 'engagement',
        countable: true,
      },
      {
        id: 'ubs-reuse',
        label: 'Common components reused',
        value: null,
        unit: '%',
        verified: false,
        publicSafe: true,
        placeholder: '[Percentage of common components reused]',
        explanation: 'Share of the deployment package reused without rebuild.',
        level: 'delivery',
      },
      {
        id: 'ubs-localisation',
        label: 'Reduction in localisation effort',
        value: null,
        unit: '%',
        verified: false,
        publicSafe: true,
        placeholder: '[Reduction in localisation effort]',
        explanation: 'Effort per market in later waves compared with the first.',
        level: 'delivery',
      },
      {
        id: 'ubs-predictability',
        label: 'Improvement in rollout predictability',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Improvement in rollout predictability]',
        explanation: 'Variance between planned and actual regional milestone dates.',
        level: 'delivery',
      },
      {
        id: 'ubs-adoption',
        label: 'Verified adoption result',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Verified adoption result]',
        explanation: 'Regional take-up of cloud and wealth-management capabilities such as Optimus.',
        level: 'capability',
      },
    ],
    openVerifications: [
      '[Confirm which product names beyond Optimus can be stated publicly]',
      '[Insert verified adoption or reuse figures when cleared]',
    ],
    pax8Relevance:
      'Regional scale works when a common core stays steady and local edges are configured deliberately — the pattern needed when enablement and transformation programs move across Australia and APAC.',
    confidentialityNote:
      'Regional detail is kept at program level. No client data, control documentation or internal process specifics are included.',
    tags: ['APAC', 'Singapore hub', 'Optimus', 'Learning Academy', 'Wave rollout', 'Cloud', 'Wealth management'],
    accent: 'violet',
  },
  {
    id: 'nab-compass',
    order: 3,
    tier: 'primary',
    employer: 'NAB',
    programName: 'Compass',
    title: 'NAB Compass: Governance That Connects Delivery to Benefits',
    eyebrow: 'Section 06 — Governance',
    role: verifiedField('Delivery Lead'),
    timeframe: verifiedField('13 months'),
    capabilityDemonstrated:
      'Program roadmaps, Learning Academy coordination, governance, executive reporting, dependencies, risks, resource coordination and benefits realisation for unsecured lending platforms.',
    situation:
      'At NAB, IT operated as a managed service for the business on the Compass program to support unsecured lending products after NAB acquired the consumer finance business from Citi. Compass was designed as a modern, one-stop ecosystem of services, with Learning Academy enablement part of how teams became ready to operate it. Multiple business, technology, operations, risk, change and Academy workstreams each held plans of their own — leadership needed one reliable view of integrated delivery and expected benefits.',
    task:
      'As Delivery Lead, I established a reusable governance and benefits framework that improved visibility and accountability for Compass — including Academy and enablement dependencies — without adding unnecessary administrative burden.',
    actions: [
      'Defined the business problem, target audience and expected outcome for Compass unsecured lending capabilities',
      'Created integrated cross-functional roadmaps across the post-acquisition delivery landscape',
      'Brought Learning Academy milestones onto the same roadmap as platform and change workstreams',
      'Introduced common milestone and status definitions',
      'Established RAID, dependency, action and decision management',
      'Defined sponsors, owners and escalation paths',
      'Separated delivery reviews from executive decision forums',
      'Introduced readiness criteria before release, including Academy completion where required',
      'Connected communications, change, Academy and adoption to the delivery plan',
      'Defined benefit hypotheses, baselines and ownership',
      'Continued measurement beyond implementation',
    ],
    challenges: [
      'Disconnected workstream plans after a complex business integration',
      'Inconsistent RAG status',
      'Late dependency identification',
      'Competing resource demands',
      'Overly detailed executive reporting',
      'Project completion being mistaken for benefit realisation',
    ],
    resolutions: [
      'Single integrated roadmap',
      'Proportionate governance',
      'Decision-oriented reporting',
      'Evidence-based status',
      'Named dependency owners',
      'Benefits tracked after launch',
    ],
    reusableOutputs: [
      'Integrated Compass roadmap template with common milestone definitions',
      'RAID, dependency and decision registers with named owners',
      'Executive pack structured around decisions requested',
      'Benefits hypothesis, baseline and ownership model',
    ],
    successMeasures: [
      'Leadership worked from one view of Compass delivery instead of several',
      'Status was evidenced, so red meant red',
      'Benefit owners remained accountable after implementation closed',
    ],
    metrics: [
      {
        id: 'nab-workstreams',
        label: 'Workstreams integrated',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Number of workstreams]',
        explanation: 'Business, technology, operations, risk and change workstreams in one Compass roadmap.',
        level: 'delivery',
        countable: true,
      },
      {
        id: 'nab-reporting-effort',
        label: 'Reduction in reporting effort',
        value: null,
        unit: '%',
        verified: false,
        publicSafe: true,
        placeholder: '[Reduction in reporting effort]',
        explanation: 'Preparation effort per reporting cycle after standardisation.',
        level: 'delivery',
      },
      {
        id: 'nab-decision-turnaround',
        label: 'Improvement in decision turnaround',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Improvement in decision turnaround]',
        explanation: 'Elapsed time from decision request to documented decision.',
        level: 'delivery',
      },
      {
        id: 'nab-milestones',
        label: 'Milestones recovered',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Milestones recovered]',
        explanation: 'At-risk milestones brought back to plan after intervention.',
        level: 'delivery',
        countable: true,
      },
      {
        id: 'nab-benefits',
        label: 'Benefits achieved',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Benefits achieved]',
        explanation: 'Benefits measured against baseline after Compass implementation.',
        level: 'business',
      },
      {
        id: 'nab-budget',
        label: 'Budget or delivery size',
        value: null,
        verified: false,
        publicSafe: false,
        placeholder: '[Insert budget]',
        explanation: 'Program financial scale. Confirm whether this can be shared externally.',
        level: 'delivery',
      },
    ],
    openVerifications: [
      '[Insert budget]',
      '[Insert number of stakeholders]',
      '[Confirm which Compass product details can be stated publicly]',
    ],
    pax8Relevance:
      'Delivery health and benefits have to stay connected. When a platform or enablement program launches, the roadmap should still track participation, capability, application and commercial impact.',
    confidentialityNote:
      'Framework and approach only. No portfolio data, financials, risk detail or internal reporting artefacts are reproduced.',
    tags: ['Compass', 'Learning Academy', 'Governance', 'Unsecured lending', 'RAID', 'Benefits realisation', 'Integration'],
    accent: 'amber',
  },
  {
    id: 'merck-cornerstone',
    order: 4,
    tier: 'primary',
    employer: 'Merck',
    programName: 'Cornerstone',
    title: 'Merck Cornerstone: Quality and Repeatability Without Unnecessary Bureaucracy',
    eyebrow: 'Section 07 — Repeatability',
    role: verifiedField('Sr. Project Manager'),
    timeframe: verifiedField('24 months'),
    capabilityDemonstrated:
      'Enterprise resiliency lifecycle, Learning Academy content quality, documentation, ownership, version control, reusable assets and continuous improvement.',
    situation:
      'At Merck, IT operated as a managed service for the business on the Cornerstone program for enterprise resiliency, modernization and data integrity — uplifting endpoint protection, firewall and cloud capability as part of a modern, integrated service ecosystem. Learning Academy and specialist content had to stay accurate as controls changed. Teams required strong quality and traceability, but inconsistent templates, review practices and ownership created repeated effort and uncertainty about readiness.',
    task:
      'As Senior Project Manager, I helped establish a repeatable Cornerstone lifecycle so resiliency, data-integrity and Learning Academy assets could be created once, reviewed effectively, released and reused across subsequent implementations.',
    actions: [
      'Mapped the asset lifecycle from need through development, specialist review, approval, release, feedback and maintenance',
      'Defined target audiences and use cases across endpoint, firewall, cloud and Learning Academy workstreams',
      'Clarified author, reviewer, approver and owner roles — keeping Academy specialists accountable for educational accuracy',
      'Established reusable templates',
      'Introduced quality and acceptance criteria',
      'Defined review and approval milestones',
      'Applied version and change control',
      'Established release-readiness checks',
      'Introduced review, maintenance and retirement dates',
      'Used modular assets to support controlled local variation',
    ],
    challenges: [
      'Different templates across resiliency workstreams',
      'Duplicate reviews',
      'Unclear ownership',
      'Version confusion',
      'Excessive documentation',
      'Outdated material after release',
      'Local teams creating uncontrolled variants',
    ],
    resolutions: [
      'Minimum quality standards',
      'Modular reusable content',
      'Clear approval ownership',
      'Controlled versions',
      'Defined maintenance',
      'Feedback from each deployment',
    ],
    reusableOutputs: [
      'Cornerstone asset lifecycle with author, reviewer, approver and owner named at each stage',
      'Template library with acceptance criteria',
      'Modular content structure enabling controlled local variants',
      'Review, maintenance and retirement schedule',
    ],
    successMeasures: [
      'Assets passed review once rather than circling',
      'Teams could find the current version with confidence',
      'Material was retired deliberately instead of quietly ageing',
    ],
    metrics: [
      {
        id: 'merck-review-cycles',
        label: 'Reduction in review cycles',
        value: null,
        unit: '%',
        verified: false,
        publicSafe: true,
        placeholder: '[Reduction in review cycles]',
        explanation: 'Review rounds per asset before approval.',
        level: 'delivery',
      },
      {
        id: 'merck-rework',
        label: 'Reduction in rework',
        value: null,
        unit: '%',
        verified: false,
        publicSafe: true,
        placeholder: '[Reduction in rework]',
        explanation: 'Effort spent reworking approved assets.',
        level: 'delivery',
      },
      {
        id: 'merck-assets-reused',
        label: 'Assets reused',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Number of assets reused]',
        explanation: 'Assets adopted by a later deployment without rebuild.',
        level: 'delivery',
        countable: true,
      },
      {
        id: 'merck-deployments',
        label: 'Deployments served',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Number of deployments]',
        explanation: 'Implementations that drew on the reusable Cornerstone lifecycle.',
        level: 'engagement',
        countable: true,
      },
      {
        id: 'merck-release-predictability',
        label: 'Improvement in release predictability',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Improvement in release predictability]',
        explanation: 'Planned versus actual release dates after the lifecycle was adopted.',
        level: 'delivery',
      },
    ],
    openVerifications: [
      '[Confirm which Cornerstone control domains can be described in more detail publicly]',
      '[Confirm whether I authored assets or coordinated authors and reviewers]',
    ],
    pax8Relevance:
      'Specialists retain ownership of technical accuracy. Program management runs the roadmap, dependencies, readiness, pilot, launch and measurement — bringing quality discipline without importing unnecessary bureaucracy into a fast-moving environment.',
    confidentialityNote:
      'Lifecycle design only. No regulated documentation, validation evidence or proprietary content is reproduced.',
    tags: ['Cornerstone', 'Learning Academy', 'Resiliency', 'Content lifecycle', 'Quality', 'Version control', 'Reuse'],
    accent: 'magenta',
  },
  {
    id: 'bank-of-america',
    order: 5,
    tier: 'supporting',
    employer: 'Bank of America',
    programName: 'eBanking / Mobile banking',
    title: 'Bank of America: Coordinating Multi-Party Deployments',
    eyebrow: 'Section 08 — Supporting case study',
    role: verifiedField('Delivery Lead and Coach'),
    timeframe: verifiedField('12 months'),
    capabilityDemonstrated:
      'Business and technology orchestration, Learning Academy readiness, vendor dependencies, repeatable deployment stages, go/no-go decisions, hypercare and handover for APAC digital banking.',
    situation:
      'At Bank of America, IT operated as a managed service for the business, building eBanking and mobile banking capabilities so APAC markets could benefit from a modern, one-stop digital banking ecosystem. Learning Academy and coaching prepared regional teams before each go-live. Client and market deployments required business and technology teams, risk and control stakeholders, and internal or external vendors to commit to the same sequence. Any one party moving late moved the whole date.',
    task:
      'As Delivery Lead and Coach, my responsibility was to coordinate the parties through repeatable deployment stages — and coach teams through Learning Academy and operational readiness — so each implementation started from proven ground rather than from scratch.',
    actions: [
      'Orchestrated business and technology delivery against one sequence for eBanking and mobile banking',
      'Engaged risk and control stakeholders early rather than at approval',
      'Managed internal and external vendor dependencies as explicit commitments',
      'Aligned Learning Academy completion with deployment readiness criteria',
      'Ran fit-gap assessment for each new market or client deployment',
      'Coordinated testing and readiness evidence',
      'Held genuine go/no-go decisions against defined criteria',
      'Coached teams through hypercare and a structured handover to run teams',
      'Fed lessons into the next APAC deployment',
    ],
    challenges: [
      'Multi-party commitments with different planning cycles across APAC',
      'Vendor timing changes outside my control',
      'Control and approval requirements discovered late',
      'Pressure to declare readiness before evidence existed',
    ],
    resolutions: [
      'Explicit dependency register with named owners on both sides',
      'Repeatable deployment stages with entry and exit criteria',
      'Readiness evidence as the basis for go/no-go',
      'Hypercare, coaching and handover treated as part of delivery, not afterthoughts',
    ],
    reusableOutputs: [
      'Repeatable digital-banking deployment stage model',
      'Fit-gap assessment template',
      'Go/no-go criteria and hypercare exit checklist',
    ],
    successMeasures: [
      'Each deployment reused more and rebuilt less',
      'Vendor dependencies surfaced early enough to re-plan',
      'Run teams accepted handover with documented support',
    ],
    metrics: [
      {
        id: 'boa-deployments',
        label: 'Deployments coordinated',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Insert number of deployments]',
        explanation: 'APAC implementations delivered through the repeatable stage model.',
        level: 'engagement',
        countable: true,
      },
      {
        id: 'boa-parties',
        label: 'Parties coordinated per deployment',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Insert number of stakeholders]',
        explanation: 'Internal teams and vendors holding commitments in the plan.',
        level: 'delivery',
        countable: true,
      },
      {
        id: 'boa-reuse',
        label: 'Reuse across deployments',
        value: null,
        unit: '%',
        verified: false,
        publicSafe: true,
        placeholder: '[Insert percentage reused]',
        explanation: 'Deployment package reused for a subsequent market.',
        level: 'delivery',
      },
      {
        id: 'boa-outcome',
        label: 'Verified delivery outcome',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Insert verified business outcome]',
        explanation: 'The delivery or operational result attributed to the approach.',
        level: 'business',
      },
    ],
    openVerifications: [
      '[Confirm which APAC markets can be named publicly]',
      '[Confirm whether vendors were external or internal]',
      '[Insert actual platform names if cleared]',
    ],
    pax8Relevance:
      'Multi-party programs only move when vendor, regional and business commitments are explicit dependencies — the same discipline required when technology providers, regional teams and partners share one roadmap.',
    confidentialityNote:
      'Market identities, architecture and control detail are excluded. Only the coordination pattern is described.',
    tags: ['Multi-party delivery', 'APAC', 'Learning Academy', 'eBanking', 'Vendor coordination', 'Go/no-go', 'Coaching'],
    accent: 'cyan',
  },
];

/* ------------------------------------------------------------------ *
 * Diagram labels
 * ------------------------------------------------------------------ *
 * Coordinates below describe an ABSTRACT network, not a map. Borders and true
 * geography are intentionally not drawn — only relative position of region nodes.
 */

export const regionNodes: RegionNode[] = [
  { id: 'sg', label: 'Singapore', x: 52, y: 58, wave: 1, note: 'Global stream hub — design and orchestration.' },
  { id: 'hk', label: 'Hong Kong', x: 68, y: 36, wave: 2, note: 'Regional sub-stream.' },
  { id: 'tw', label: 'Taiwan', x: 78, y: 42, wave: 2, note: 'Regional sub-stream.' },
  { id: 'india', label: 'India', x: 30, y: 48, wave: 2, note: 'Scale and capacity considerations.' },
  { id: 'china', label: 'China', x: 64, y: 28, wave: 2, note: 'Local control and product readiness.' },
  { id: 'anz', label: 'ANZ', x: 72, y: 78, wave: 3, note: 'Later-wave markets where applicable.' },
  { id: 'global-core', label: 'Global core', x: 12, y: 20, wave: 1, note: 'Where the non-negotiables are defined.' },
];

export const compassDirections = [
  {
    id: 'direction',
    heading: 'Direction',
    subject: 'Strategic outcomes',
    detail: 'The outcome the program exists to produce, agreed with a named sponsor.',
    accent: 'cyan' as const,
    angle: 0,
  },
  {
    id: 'control',
    heading: 'Control',
    subject: 'Governance and risk',
    detail: 'RAID, dependencies and decision rights, sized to the program rather than to the template.',
    accent: 'violet' as const,
    angle: 90,
  },
  {
    id: 'momentum',
    heading: 'Momentum',
    subject: 'Delivery and decisions',
    detail: 'Delivery reviews that unblock work, separated from forums that make decisions.',
    accent: 'magenta' as const,
    angle: 180,
  },
  {
    id: 'destination',
    heading: 'Destination',
    subject: 'Adoption and benefits',
    detail: 'Measurement that continues after go-live until the benefit is evidenced.',
    accent: 'amber' as const,
    angle: 270,
  },
];

export const contentLifecycleStages: LifecycleStage[] = [
  { id: 'brief', label: 'Brief', detail: 'Audience, use case, outcome and acceptance criteria agreed up front.', ownerRole: 'Program management' },
  { id: 'develop', label: 'Develop', detail: 'Authored against a template by the people who own accuracy.', ownerRole: 'Author' },
  { id: 'review', label: 'Review', detail: 'One consolidated specialist review, not serial rounds.', ownerRole: 'Reviewer' },
  { id: 'approve', label: 'Approve', detail: 'A named approver, an approval date, a recorded decision.', ownerRole: 'Approver' },
  { id: 'pilot', label: 'Pilot', detail: 'Tested with a real cohort before wide release.', ownerRole: 'Program management' },
  { id: 'release', label: 'Release', detail: 'Version stamped, readiness checks complete.', ownerRole: 'Owner' },
  { id: 'reuse', label: 'Reuse', detail: 'Adopted by the next deployment with controlled local variation.', ownerRole: 'Regional teams' },
  { id: 'measure', label: 'Measure', detail: 'Usage, feedback and capability signals collected.', ownerRole: 'Program management' },
  { id: 'improve', label: 'Improve', detail: 'Updated, re-versioned or retired on a defined date.', ownerRole: 'Owner' },
];

/* ------------------------------------------------------------------ *
 * SECTION 9 — Build once, deploy many
 * ------------------------------------------------------------------ */

export const buildOnceContent = {
  eyebrow: 'Section 09 — Reusable architecture',
  headline: 'Standardise the core. Configure the edges.',
  intro:
    'This is the architecture the four pillars add up to. It is how one designed experience becomes many credible deployments without a rebuild each time.',
  phases: [
    { id: 'discovery', label: 'Discovery', detail: 'Partner problems, segments and existing friction.' },
    { id: 'definition', label: 'Program definition', detail: 'Outcome, audience, scope, sponsor and measures.' },
    { id: 'design', label: 'Experience and content design', detail: 'Journey, modules, plays and assets by role.' },
    { id: 'pilot', label: 'Pilot', detail: 'One cohort, real feedback, decisions recorded.' },
    { id: 'package', label: 'Deployment package', detail: 'Everything a region needs, assembled once.' },
    { id: 'rollout', label: 'Regional rollout', detail: 'Waves gated on readiness evidence.' },
    { id: 'adoption', label: 'Adoption', detail: 'Partners apply it in their own business.' },
    { id: 'benefits', label: 'Benefits', detail: 'Measured against a baseline with a named owner.' },
    { id: 'improvement', label: 'Continuous improvement', detail: 'Evidence returns to design.' },
  ],
  standardisedCore: [
    'Strategic outcome',
    'Partner value proposition',
    'Core content',
    'Quality standards',
    'Governance',
    'Measurement',
    'Brand and experience principles',
    'Security and data requirements',
  ],
  configurableEdges: [
    'Regional examples',
    'Language',
    'Time zones',
    'Delivery format',
    'Partner role',
    'Partner maturity',
    'Product availability',
    'Local regulation',
    'Communications channels',
  ],
} as const;

export const scalingPatterns: ScalingPattern[] = [
  {
    id: 'copy-exactly',
    verdict: 'poor',
    label: 'Copy exactly everywhere',
    approach: 'One package, shipped unchanged into every market.',
    consequence:
      'Fast to produce and cheap to govern, but examples, timing and product availability do not match local reality, so partners disengage.',
  },
  {
    id: 'customise-everything',
    verdict: 'poor-alt',
    label: 'Customise everything for everyone',
    approach: 'Every region and segment gets a bespoke build.',
    consequence:
      'Locally loved and operationally unsustainable. Effort multiplies, versions fork and nothing can be measured consistently.',
  },
  {
    id: 'governed-core',
    verdict: 'good',
    label: 'Common core plus governed adaptation',
    approach: 'A standard core with a defined, owned set of configurable edges.',
    consequence:
      'Consistent measurement and quality, genuine local relevance, and effort that falls with each wave instead of rising.',
  },
];

/* ------------------------------------------------------------------ *
 * SECTION 15 — Closing and contact
 * ------------------------------------------------------------------ */

export const closingContent = {
  eyebrow: 'Section 15 — Closing',
  headline: 'From Strategic Idea to Scalable Partner Outcome',
  statement:
    'I connect teams, regions, content, technology and governance to create partner experiences that can be launched confidently, adopted effectively and improved continuously.',
  summary: [
    { id: 'daimler', employer: 'Daimler Simba', contribution: 'Partner journey' },
    { id: 'ubs', employer: 'UBS Optimus', contribution: 'Regional scale' },
    { id: 'nab-compass', employer: 'NAB Compass', contribution: 'Governance and benefits' },
    { id: 'merck-cornerstone', employer: 'Merck Cornerstone', contribution: 'Quality and repeatability' },
  ],
} as const;

/**
 * Public contact actions. LinkedIn is the only share path on this site.
 */
export const contactActions: ContactAction[] = [
  {
    id: 'linkedin',
    label: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/sanjaysingh13/',
    kind: 'linkedin',
    isPlaceholder: false,
    description: 'Public LinkedIn profile.',
  },
];
