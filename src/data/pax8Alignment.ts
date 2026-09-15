/**
 * Pax8-facing content.
 *
 * Everything in `hypotheticalProgram` and `pax8Translation` is forward-looking. It is
 * an illustration of how the approaches in the case studies could be applied — not
 * work delivered, and not a statement about Pax8's actual roadmap. Components must
 * render it inside <HypotheticalFrame>, which prints the label below.
 */

import type {
  ChallengeResolution,
  HypotheticalProgram,
  NinetyDayPhase,
} from '@/types/portfolio';

export const HYPOTHETICAL_LABEL =
  'Hypothetical application of my experience to the Pax8 partner ecosystem';

/** Context I bring to the conversation, stated as understanding rather than experience. */
export const pax8Understanding = {
  ecosystem:
    'Pax8 serves MSP partners who provide cloud, cybersecurity, AI, productivity and managed services to SMB customers. The partner is the customer, and the SMB outcome is downstream of the partner’s capability.',
  implication:
    'That makes the work one-to-many by nature. A Partner Experience program has to improve the journey for a whole population of partners at different maturity levels, in several regions, without a relationship manager present for every interaction.',
  boundary:
    'I have not worked at Pax8 and have not managed MSP partners directly. What I have done is solve closely comparable problems in channel, regional-scaling, governance and content-lifecycle programs.',
};

export const hypotheticalProgram: HypotheticalProgram = {
  name: 'APAC Partner Transformation Accelerator',
  purpose:
    'Help MSP partners understand, position, adopt and operationalise cloud, cybersecurity, AI and managed-intelligence solutions for SMB customers.',
  disclaimer:
    'Illustrative only. This is not a Pax8 program, not a proposal I have been briefed on, and not a confirmed roadmap. It exists to show how I would structure such a program.',
  partnerAudiences: [
    'MSP owners',
    'Sales and account teams',
    'Technical specialists',
    'Security teams',
    'Service-delivery leaders',
    'Operations managers',
  ],
  stakeholders: [
    'Experience leadership',
    'Academy',
    'Academy Content',
    'Marketing',
    'Sales',
    'Partner Experience',
    'Regional stakeholders',
    'Product and vendor specialists',
    'Platform and analytics teams',
    'Facilitators and coaches',
  ],
  roadmap: [
    { id: 'discover', label: 'Discover', detail: 'Partner friction, existing assets, data available today.' },
    { id: 'segment', label: 'Segment', detail: 'By maturity, role, region and business model.' },
    { id: 'define', label: 'Define', detail: 'Outcome, behaviour change sought, sponsor, measures.' },
    { id: 'design', label: 'Design', detail: 'Journey, pathways, formats and asset set per role.' },
    { id: 'build', label: 'Build', detail: 'Specialists author; program management manages dependencies.' },
    { id: 'pilot', label: 'Pilot', detail: 'One cohort, one region, honest feedback, recorded decisions.' },
    { id: 'launch', label: 'Launch', detail: 'Readiness criteria met, communications sequenced.' },
    { id: 'scale', label: 'Scale', detail: 'Waves by regional readiness, core held constant.' },
    { id: 'measure', label: 'Measure', detail: 'Delivery, engagement, capability and business levels.' },
    { id: 'improve', label: 'Improve', detail: 'Evidence returns to design; assets versioned or retired.' },
  ],
  outputs: [
    'On-demand modules',
    'Instructor-led learning',
    'Sales plays',
    'Solution-positioning guides',
    'Operational playbooks',
    'Regional events',
    'Partner communications',
    'Implementation checklists',
    'Partner feedback mechanisms',
    'Adoption dashboards',
  ],
  technologyThemes: [
    'Microsoft 365',
    'Azure',
    'Microsoft security',
    'Google Cloud and Workspace',
    'AI and automation',
    'Cybersecurity',
    'Backup and business continuity',
    'IT operations',
    'Managed intelligence',
  ],
};

/**
 * Section 4 "Pax8 translation" toggle. The generic model is what I have actually
 * worked in; the Pax8 model is the hypothetical equivalent.
 */
export const pax8Translation = {
  generic: {
    id: 'generic',
    label: 'Generic channel model',
    caption: 'The structure I have worked in.',
    nodes: [
      { id: 'vendor', label: 'Central capability owner', role: 'Defines the capability and its standards' },
      { id: 'platform', label: 'Channel platform', role: 'Distributes and supports the capability' },
      { id: 'partner', label: 'Channel partner', role: 'Positions and delivers it locally' },
      { id: 'customer', label: 'End customer', role: 'Experiences the outcome' },
    ],
  },
  pax8: {
    id: 'pax8',
    label: 'Hypothetical Pax8 model',
    caption: 'The same structure, mapped to the Pax8 ecosystem as I understand it.',
    nodes: [
      { id: 'vendor', label: 'Vendor', role: 'Builds the product and its technical narrative' },
      { id: 'platform', label: 'Pax8 Marketplace', role: 'Aggregates, provisions and enables at scale' },
      { id: 'partner', label: 'MSP partner', role: 'Packages it as a managed service' },
      { id: 'customer', label: 'SMB customer', role: 'Gets a working outcome, not a product' },
    ],
  },
} as const;

/* ------------------------------------------------------------------ *
 * SECTION 11 — Challenges in scaling Partner Experience
 * ------------------------------------------------------------------ */

export const scalingChallenges: ChallengeResolution[] = [
  {
    id: 'competing-priorities',
    number: 1,
    title: 'Competing partner priorities',
    problem:
      'External partners cannot be directed like employees and may work with competing vendors.',
    response:
      'Clarify partner value, reduce time to value, segment communications and connect enablement to profitability, efficiency or risk reduction.',
    drawsOn: 'Daimler — journey',
    tags: ['Value proposition', 'Segmentation'],
  },
  {
    id: 'partner-maturity',
    number: 2,
    title: 'Different partner maturity',
    problem:
      'A three-person MSP and a mature service provider require different depth and support.',
    response:
      'Create foundation and advanced pathways, segment by role and maturity, retain a common core and compare metrics by cohort.',
    drawsOn: 'Merck Cornerstone — modularity',
    tags: ['Pathways', 'Cohorts'],
  },
  {
    id: 'global-regional',
    number: 3,
    title: 'Global consistency versus regional relevance',
    problem:
      'APAC regions may differ in time zones, languages, regulations, product availability and delivery capacity.',
    response: 'Use UBS-style requirement classification, readiness assessments and phased rollout.',
    drawsOn: 'UBS — scale',
    tags: ['APAC', 'Waves'],
  },
  {
    id: 'changing-technology',
    number: 4,
    title: 'Rapidly changing technology',
    problem: 'Cloud, cybersecurity and AI material can become outdated during development.',
    response:
      'Use Cornerstone-style modular content, owners, versions, update triggers and retirement dates.',
    drawsOn: 'Merck Cornerstone — repeatability',
    tags: ['Version control', 'Modularity'],
  },
  {
    id: 'sme-capacity',
    number: 5,
    title: 'Limited SME capacity',
    problem: 'Technical and product experts support multiple priorities.',
    response:
      'Forecast demand, reserve capacity, provide focused briefs, define approval dates and escalate portfolio conflicts early.',
    drawsOn: 'NAB Compass — governance',
    tags: ['Capacity', 'Briefs'],
  },
  {
    id: 'fragmented-ownership',
    number: 6,
    title: 'Fragmented functional ownership',
    problem:
      'Content, Marketing, Sales and regions can optimise their own deliverables without owning the complete partner outcome.',
    response:
      'Maintain one integrated roadmap, shared readiness criteria, named dependencies and one accountable outcome sponsor.',
    drawsOn: 'NAB Compass — governance',
    tags: ['Integrated roadmap', 'Accountability'],
  },
  {
    id: 'completion-versus-adoption',
    number: 7,
    title: 'High completion but weak adoption',
    problem: 'Partners may complete learning but not apply it.',
    response:
      'Define desired behaviour first, provide implementation assets, reinforce through partner-facing teams and measure post-program application.',
    drawsOn: 'Daimler — journey',
    tags: ['Behaviour', 'Reinforcement'],
  },
  {
    id: 'fragmented-data',
    number: 8,
    title: 'Weak or fragmented data',
    problem:
      'Learning, campaign, Marketplace, support and commercial data may sit in separate systems.',
    response:
      'Define the minimum viable measurement model and improve data maturity incrementally.',
    drawsOn: 'NAB Compass — benefits',
    tags: ['Measurement', 'Data maturity'],
  },
  {
    id: 'launch-pressure',
    number: 9,
    title: 'Launch pressure',
    problem:
      'Marketing or event dates may be committed before content and regional operations are ready.',
    response:
      'Define readiness criteria early and present options including pilot, phased launch, reduced scope or revised date.',
    drawsOn: 'UBS — readiness evidence',
    tags: ['Readiness', 'Options'],
  },
  {
    id: 'governance-resistance',
    number: 10,
    title: 'Governance resistance',
    problem: 'Creative and regional teams may perceive governance as bureaucracy.',
    response:
      'Co-design minimum viable governance and use it to accelerate decisions and remove blockers.',
    drawsOn: 'NAB Compass — proportionate governance',
    tags: ['Minimum viable governance', 'Co-design'],
  },
  {
    id: 'portfolio-overload',
    number: 11,
    title: 'Program portfolio overload',
    problem:
      'More initiatives may be approved than Content, Marketing, facilitators and regions can support.',
    response:
      'Create a consolidated roadmap and capacity view, then force explicit prioritisation and trade-off decisions.',
    drawsOn: 'NAB Compass — portfolio view',
    tags: ['Capacity', 'Prioritisation'],
  },
  {
    id: 'vendor-dependencies',
    number: 12,
    title: 'Vendor dependencies',
    problem: 'A vendor may change product timing, assets or proposition.',
    response:
      'Manage vendor commitments explicitly, maintain contingencies and avoid baselining unconfirmed assumptions.',
    drawsOn: 'Bank of America — multi-party delivery',
    tags: ['Dependencies', 'Contingency'],
  },
];

/* ------------------------------------------------------------------ *
 * SECTION 12 — First 90 days
 * ------------------------------------------------------------------ */

export const ninetyDayPhases: NinetyDayPhase[] = [
  {
    id: 'understand',
    window: 'Days 1–30',
    title: 'Understand',
    intent: 'Earn the right to change anything by understanding what already works.',
    activities: [
      'Meet Experience, Academy, Content, Marketing, Sales and regional stakeholders',
      'Review active initiatives and commitments',
      'Understand partner segments and journeys',
      'Review current governance and tools',
      'Identify critical risks and dependencies',
      'Understand the current performance measurement model',
    ],
    accent: 'cyan',
  },
  {
    id: 'align',
    window: 'Days 31–60',
    title: 'Align',
    intent: 'Get one shared view of what is being delivered, by whom, and why.',
    activities: [
      'Consolidate the Experience program roadmap',
      'Confirm objectives, sponsors and owners',
      'Map cross-functional and regional dependencies',
      'Agree minimum reporting standards',
      'Clarify decision rights',
      'Assess resource and SME capacity',
      'Identify quick wins',
    ],
    accent: 'violet',
  },
  {
    id: 'improve',
    window: 'Days 61–90',
    title: 'Improve and deliver',
    intent: 'Show value on a live initiative while making the operating rhythm stick.',
    activities: [
      'Implement practical governance improvements',
      'Establish launch-readiness criteria',
      'Improve executive reporting',
      'Stabilise or progress a priority initiative',
      'Introduce a consistent benefits framework',
      'Create a longer-term scalability roadmap',
    ],
    accent: 'amber',
  },
];

/* ------------------------------------------------------------------ *
 * SECTION 14 — Interview conversation starters
 * ------------------------------------------------------------------ */

export const conversationContent = {
  title: 'What I Would Like to Explore With Pax8',
  intro:
    'These are the questions I would bring to a first conversation. They are the ones whose answers would change how I would sequence the first ninety days.',
  questions: [
    {
      id: 'priorities',
      question:
        'Which Experience initiatives are the highest priority over the next 6 to 12 months?',
      why: 'Sequencing and capacity planning depend on it more than anything else.',
    },
    {
      id: 'pillars',
      question: 'How does Pax8 define its Experience pillars?',
      why: 'I want to use your language for outcomes, not impose a framework.',
    },
    {
      id: 'scope',
      question: 'Is this position primarily aligned to ANZ, APAC or a global portfolio?',
      why: 'It changes the governance model, meeting rhythm and localisation approach.',
    },
    {
      id: 'ownership',
      question:
        'How are responsibilities divided between Academy, Content, Marketing, Sales and Partner Experience?',
      why: 'Clear decision rights prevent the fragmented-ownership problem before it starts.',
    },
    {
      id: 'friction',
      question: 'Where does delivery currently encounter the most friction?',
      why: 'The fastest credible win is usually already known to the team.',
    },
    {
      id: 'academy-marketplace',
      question: 'How is Academy engagement connected to Marketplace adoption and partner growth?',
      why: 'This is the join between enablement and commercial benefit.',
    },
    {
      id: 'balance',
      question:
        'What balance of new-market expansion, partner transformation and operational improvement is expected?',
      why: 'These three demand different roadmaps and different measures.',
    },
    {
      id: 'exceptional',
      question: 'What would exceptional performance look like after six months?',
      why: 'I would rather be measured against your definition than my assumption.',
    },
    {
      id: 'enablement-gaps',
      question: 'Which product areas currently require the greatest partner enablement?',
      why: 'It tells me where SME capacity and content lifecycle pressure will be highest.',
    },
    {
      id: 'maturity',
      question:
        'How mature are the current roadmap, governance and benefits-management practices?',
      why: 'It determines whether I am building foundations or improving an existing rhythm.',
    },
  ],
} as const;
