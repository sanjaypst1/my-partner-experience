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
      'A capability can be centrally complete and still land badly, because the teams closest to the customer were not consulted, prepared or supported.',
    myResponsibility:
      'Coordinate the end-to-end implementation and make the capability work for customer-facing teams, not only for the teams designing it centrally.',
    actions: [
      'Mapped the complete stakeholder and customer journey before planning delivery',
      'Named the awareness, value, readiness, access, process, support and feedback stages',
      'Built one integrated roadmap across business, technology, operations, communication and adoption',
      'Separated common standards from legitimate local adaptation',
    ],
    challenges: [
      'Central design versus local operational reality',
      'Different stakeholder maturity and unclear hand-offs',
      'Limited visibility of who was actually ready',
    ],
    resolution:
      'Journey-based planning with role-specific readiness, named support routes and a pilot before wider rollout.',
    reusableOutputs: [
      'Stakeholder and experience journey map',
      'Role-specific readiness checklists',
      'Reusable deployment asset pack',
    ],
    measuresOfSuccess: [
      'Readiness confirmed by evidence rather than assertion',
      'Support and escalation routes used, not bypassed',
      'Feedback captured and carried into the next deployment',
    ],
    pax8Relevance:
      'Partner experience is shaped by Academy, Content, Marketing, Sales, support and regional execution as much as by the Marketplace itself. This is how I manage that whole chain.',
  },
  {
    id: 'pillar-ubs',
    caseStudyId: 'ubs',
    employer: 'UBS',
    promise: 'Scale it across regions',
    keyword: 'Scale',
    accent: 'violet',
    businessProblem:
      'A centrally defined initiative had to land in regions with different stakeholders, processes, dependencies, control requirements and delivery capacity.',
    myResponsibility:
      'Preserve a common program core while making each regional implementation practical, compliant and adoptable.',
    actions: [
      'Classified requirements as global non-negotiables, mandatory local requirements or local preferences',
      'Ran fit-gap assessments and regional readiness reviews',
      'Maintained one integrated roadmap with regional milestones',
      'Rolled out in waves where readiness genuinely differed',
    ],
    challenges: [
      'Time zones, language and market maturity differences',
      'Local control requirements and constrained regional capacity',
      'Pressure for a single global date regardless of readiness',
    ],
    resolution:
      'Standardise the core, configure the edges, gate each wave on readiness evidence and give every local variation a named owner.',
    reusableOutputs: [
      'Requirement classification model',
      'Reusable regional deployment lifecycle',
      'Common status and reporting definitions',
    ],
    measuresOfSuccess: [
      'Share of components reused rather than rebuilt',
      'Rollout predictability wave over wave',
      'No unmanaged program forks',
    ],
    pax8Relevance:
      'The same model can scale Academy, sales-enablement, new-market and partner-transformation programs across Australia and APAC without losing consistency.',
  },
  {
    id: 'pillar-nab',
    caseStudyId: 'nab-compass',
    employer: 'NAB',
    promise: 'Govern delivery and benefits',
    keyword: 'Governance',
    accent: 'amber',
    businessProblem:
      'Multiple business, technology, operations, risk and change workstreams each held their own plan, so leadership had no reliable integrated view.',
    myResponsibility:
      'Through Compass, help establish a reusable governance and benefits framework that improved visibility and accountability without adding administrative burden.',
    actions: [
      'Created integrated cross-functional roadmaps with common milestone and status definitions',
      'Established RAID, dependency, action and decision management with named owners',
      'Separated delivery reviews from executive decision forums',
      'Defined benefit hypotheses, baselines and ownership, and kept measuring after launch',
    ],
    challenges: [
      'Inconsistent RAG status and late dependency identification',
      'Executive reporting that described activity instead of enabling decisions',
      'Project completion being mistaken for benefit realisation',
    ],
    resolution:
      'One integrated roadmap, proportionate governance, decision-oriented reporting and benefits tracked beyond go-live.',
    reusableOutputs: [
      'Integrated roadmap and dependency model',
      'Decision-oriented executive report pack',
      'Benefits hypothesis and measurement framework',
    ],
    measuresOfSuccess: [
      'Decision turnaround time',
      'Dependencies identified before they became issues',
      'Benefits still being measured after implementation closed',
    ],
    pax8Relevance:
      'Success should not end when an Academy program launches or an event runs. It continues through participation, capability, application, adoption and commercial impact.',
  },
  {
    id: 'pillar-merck',
    caseStudyId: 'merck-cornerstone',
    employer: 'Merck',
    promise: 'Make it repeatable',
    keyword: 'Repeatability',
    accent: 'magenta',
    businessProblem:
      'Strong quality and traceability were required, but inconsistent templates, review practices and ownership caused repeated effort and uncertainty about readiness.',
    myResponsibility:
      'Through Cornerstone, help establish a repeatable lifecycle so assets could be created once, reviewed effectively, released and reused.',
    actions: [
      'Mapped the asset lifecycle from need through development, specialist review, approval, release, feedback and maintenance',
      'Clarified author, reviewer, approver and owner roles',
      'Introduced reusable templates, quality criteria and release-readiness checks',
      'Applied version control, review dates and retirement dates',
    ],
    challenges: [
      'Duplicate reviews and unclear approval ownership',
      'Version confusion and material ageing after release',
      'Local teams creating uncontrolled variants',
    ],
    resolution:
      'Minimum quality standards, modular reusable content, controlled versions and defined maintenance with feedback from every deployment.',
    reusableOutputs: [
      'Asset lifecycle with named roles',
      'Template and quality-criteria library',
      'Modular content structure supporting controlled local variation',
    ],
    measuresOfSuccess: [
      'Review cycles per asset',
      'Assets reused across deployments',
      'Release predictability',
    ],
    pax8Relevance:
      'Content and product specialists keep ownership of educational and technical accuracy. The Partner Experience PM owns roadmap, dependencies, readiness, pilot, launch and measurement.',
  },
];

/* ------------------------------------------------------------------ *
 * SECTIONS 4–8 — Case studies
 * ------------------------------------------------------------------ */

const unverifiedRole = (placeholder = '[Insert exact role title]') => ({
  value: null,
  placeholder,
  verified: false,
});

const unverifiedTimeframe = (placeholder = '[Insert delivery timeframe]') => ({
  value: null,
  placeholder,
  verified: false,
});

export const caseStudies: CaseStudy[] = [
  {
    id: 'daimler',
    order: 1,
    tier: 'primary',
    employer: 'Daimler Mercedes-Benz',
    title: 'Daimler Mercedes-Benz: Designing a Consistent Channel Experience',
    eyebrow: 'Section 04 — Journey',
    role: unverifiedRole(),
    timeframe: unverifiedTimeframe(),
    capabilityDemonstrated:
      'Partner journey, channel coordination, readiness, communications, support and adoption.',
    situation:
      'At Daimler Mercedes-Benz, customer outcomes depended on coordination between central business functions, technology teams, regional operations, support functions and channel-facing stakeholders. A centrally designed capability could be technically complete but still create an inconsistent experience if customer-facing teams were not consulted, prepared or supported.',
    task:
      'My responsibility was to coordinate the end-to-end implementation and ensure the capability worked for the teams closest to the customer, not only for the teams designing it centrally.',
    actions: [
      'Mapped the complete stakeholder and customer journey',
      'Identified awareness, value communication, readiness, access, process, support and feedback stages',
      'Created an integrated roadmap across business, technology, operations, communication and adoption',
      'Distinguished common standards from legitimate local adaptations',
      'Coordinated readiness reviews and ownership',
      'Piloted the approach with an initial stakeholder group',
      'Converted the improved approach into reusable deployment assets',
      'Established feedback loops for future deployments',
    ],
    challenges: [
      'Central design versus local operational reality',
      'Different stakeholder maturity',
      'Unclear hand-offs',
      'Inconsistent communications',
      'Limited readiness visibility',
      'Risk of technical completion without operational adoption',
    ],
    resolutions: [
      'Journey-based planning',
      'Role-specific readiness',
      'Common deployment assets',
      'Controlled local flexibility',
      'Named support and escalation routes',
      'Post-launch feedback',
    ],
    reusableOutputs: [
      'Journey map covering awareness through feedback',
      'Readiness checklist per customer-facing role',
      'Deployment asset pack reused by later rollouts',
    ],
    successMeasures: [
      'Customer-facing teams could explain the value, not just operate the system',
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
        explanation: 'Distinct functions and channel-facing groups inside the deployment scope.',
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
        explanation: 'Sites or markets that received the capability.',
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
        explanation: 'Use of the capability by customer-facing teams after launch.',
        level: 'capability',
      },
      {
        id: 'daimler-benefit',
        label: 'Delivery or operational benefit',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Insert verified business outcome]',
        explanation: 'The operational or commercial result attributed to the deployment.',
        level: 'business',
      },
    ],
    openVerifications: [
      '[Confirm whether dealers were directly involved]',
      '[Insert actual technology platform]',
      '[Insert exact role title]',
      '[Insert number of regions]',
    ],
    pax8Relevance:
      "Pax8's partner experience is influenced not only by the Marketplace product but also by Academy, Content, Marketing, Sales, Partner Experience, support and regional execution. My Daimler experience taught me to manage this complete value chain.",
    confidentialityNote:
      'Described at the level of approach and coordination. Platform names, internal process detail and commercial terms are excluded.',
    tags: ['Partner journey', 'Readiness', 'Communications', 'Channel coordination', 'Adoption'],
    accent: 'cyan',
  },
  {
    id: 'ubs',
    order: 2,
    tier: 'primary',
    employer: 'UBS',
    title: 'UBS: Scaling a Common Program Across Regions',
    eyebrow: 'Section 05 — Scale',
    role: unverifiedRole(),
    timeframe: unverifiedTimeframe(),
    capabilityDemonstrated:
      'ANZ and APAC scaling, global-local alignment, new-market readiness and wave-based rollout.',
    situation:
      'At UBS, a centrally defined initiative needed to be deployed across regions with different stakeholder environments, operating processes, local dependencies, control requirements and implementation capacity.',
    task:
      'My responsibility was to preserve a common program core while making each regional implementation practical, compliant and adoptable.',
    actions: [
      'Classified requirements into global non-negotiables, mandatory local requirements and local preferences',
      'Performed fit-gap assessments',
      'Conducted regional readiness reviews',
      'Created a reusable deployment lifecycle',
      'Maintained one integrated roadmap with regional milestones',
      'Used wave-based rollout where readiness differed',
      'Established common status and reporting definitions',
      'Captured lessons from one region and incorporated them into the next rollout',
    ],
    challenges: [
      'Time zones',
      'Different market maturity',
      'Product or capability availability',
      'Local control requirements',
      'Regional capacity',
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
      'Wave plan tied to readiness evidence',
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
        explanation: 'Markets that received the common program core.',
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
        explanation: 'Regional take-up of the deployed capability.',
        level: 'capability',
      },
    ],
    openVerifications: [
      '[Insert number of regions]',
      '[Insert exact role title]',
      '[Confirm which markets can be named publicly]',
      '[Insert delivery timeframe]',
    ],
    pax8Relevance:
      'This model can help Pax8 scale Academy, sales-enablement, new-market and partner-transformation programs across Australia and APAC while preserving consistency.',
    confidentialityNote:
      'Regional detail is kept abstract. No client data, control documentation or internal process specifics are included.',
    tags: ['APAC', 'Wave rollout', 'Fit-gap', 'Global-local', 'New market readiness'],
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
    role: unverifiedRole(),
    timeframe: unverifiedTimeframe(),
    capabilityDemonstrated:
      'Program roadmaps, governance, executive reporting, dependencies, risks, budgets, resource coordination and benefits realisation.',
    situation:
      'At NAB, complex initiatives involved multiple business, technology, operations, risk and change workstreams. Individual teams maintained their own plans, but leadership needed one reliable view of integrated delivery and expected benefits.',
    task:
      'Through Compass, I helped establish a reusable governance and benefits framework that improved visibility and accountability without adding unnecessary administrative burden.',
    actions: [
      'Defined the business problem, target audience and expected outcome',
      'Created integrated cross-functional roadmaps',
      'Introduced common milestone and status definitions',
      'Established RAID, dependency, action and decision management',
      'Defined sponsors, owners and escalation paths',
      'Separated delivery reviews from executive decision forums',
      'Introduced readiness criteria',
      'Connected communications, change and adoption to the delivery plan',
      'Defined benefit hypotheses, baselines and ownership',
      'Continued measurement beyond implementation',
    ],
    challenges: [
      'Disconnected workstream plans',
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
      'Integrated roadmap template with common milestone definitions',
      'RAID, dependency and decision registers with named owners',
      'Executive pack structured around decisions requested',
      'Benefits hypothesis, baseline and ownership model',
    ],
    successMeasures: [
      'Leadership worked from one view of delivery instead of several',
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
        explanation: 'Business, technology, operations, risk and change workstreams in one roadmap.',
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
        explanation: 'Benefits measured against baseline after implementation.',
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
      '[Insert exact role title]',
      '[Confirm whether the Compass program name can be stated publicly]',
    ],
    pax8Relevance:
      'For Pax8, success should not end when an Academy program launches or an event occurs. It should continue through partner participation, capability, application, adoption and commercial or operational impact.',
    confidentialityNote:
      'Framework and approach only. No portfolio data, financials, risk detail or internal reporting artefacts are reproduced.',
    tags: ['Governance', 'RAID', 'Executive reporting', 'Dependencies', 'Benefits realisation'],
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
    role: unverifiedRole(),
    timeframe: unverifiedTimeframe(),
    capabilityDemonstrated:
      'Content-development lifecycle, quality, documentation, ownership, version control, reusable assets and continuous improvement.',
    situation:
      'At Merck, teams required strong quality, traceability and documentation, but inconsistent templates, review practices and ownership created repeated effort and uncertainty about readiness.',
    task:
      'Through Cornerstone, I helped establish a repeatable lifecycle through which program assets could be created once, reviewed effectively, released and reused across subsequent implementations.',
    actions: [
      'Mapped the asset lifecycle from need through development, specialist review, approval, release, feedback and maintenance',
      'Defined target audiences and use cases',
      'Clarified author, reviewer, approver and owner roles',
      'Established reusable templates',
      'Introduced quality and acceptance criteria',
      'Defined review and approval milestones',
      'Applied version and change control',
      'Established release-readiness checks',
      'Introduced review, maintenance and retirement dates',
      'Used modular assets to support controlled local variation',
    ],
    challenges: [
      'Different templates',
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
      'Asset lifecycle with author, reviewer, approver and owner named at each stage',
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
        explanation: 'Implementations that drew on the reusable lifecycle.',
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
      '[Insert exact role title]',
      '[Confirm whether the Cornerstone program name can be stated publicly]',
      '[Confirm whether I authored content or coordinated authors]',
      '[Insert delivery timeframe]',
    ],
    pax8Relevance:
      'Academy Content and product specialists can retain ownership of educational and technical accuracy, while the Partner Experience PM manages the roadmap, dependencies, Marketing requirements, regional readiness, pilot, launch and measurement.',
    confidentialityNote:
      'Lifecycle design only. No regulated documentation, validation evidence or proprietary content is reproduced.',
    tags: ['Content lifecycle', 'Quality', 'Version control', 'Reuse', 'Continuous improvement'],
    accent: 'magenta',
  },
  {
    id: 'bank-of-america',
    order: 5,
    tier: 'supporting',
    employer: 'Bank of America',
    title: 'Bank of America: Coordinating Multi-Party Deployments',
    eyebrow: 'Section 08 — Supporting case study',
    role: unverifiedRole(),
    timeframe: unverifiedTimeframe(),
    capabilityDemonstrated:
      'Business and technology orchestration, vendor dependencies, repeatable deployment stages, go/no-go decisions, hypercare and handover.',
    situation:
      'Client deployments required business and technology teams, risk and control stakeholders, and internal or external vendors to commit to the same sequence. Any one party moving late moved the whole date.',
    task:
      'My responsibility was to coordinate the parties through repeatable deployment stages so each new client implementation started from proven ground rather than from scratch.',
    actions: [
      'Orchestrated business and technology delivery against one sequence',
      'Engaged risk and control stakeholders early rather than at approval',
      'Managed internal and external vendor dependencies as explicit commitments',
      'Ran fit-gap assessment for each new client deployment',
      'Coordinated testing and readiness evidence',
      'Held genuine go/no-go decisions against defined criteria',
      'Ran hypercare and a structured handover to run teams',
      'Fed lessons into the next deployment',
    ],
    challenges: [
      'Multi-party commitments with different planning cycles',
      'Vendor timing changes outside my control',
      'Control and approval requirements discovered late',
      'Pressure to declare readiness before evidence existed',
    ],
    resolutions: [
      'Explicit dependency register with named owners on both sides',
      'Repeatable deployment stages with entry and exit criteria',
      'Readiness evidence as the basis for go/no-go',
      'Hypercare and handover treated as part of delivery, not afterthoughts',
    ],
    reusableOutputs: [
      'Repeatable client deployment stage model',
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
        label: 'Client deployments coordinated',
        value: null,
        verified: false,
        publicSafe: true,
        placeholder: '[Insert number of deployments]',
        explanation: 'Client implementations delivered through the repeatable stage model.',
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
        explanation: 'Deployment package reused for a subsequent client.',
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
      '[Insert exact role title]',
      '[Confirm whether clients can be described by sector only]',
      '[Insert actual technology platform]',
      '[Confirm whether vendors were external or internal]',
    ],
    pax8Relevance:
      'Partner Experience initiatives may require coordination between Pax8, technology vendors, regional teams and MSP partners. Multi-party commitments must be managed as explicit dependencies.',
    confidentialityNote:
      'Client identities, architecture and control detail are excluded. Only the coordination pattern is described.',
    tags: ['Multi-party delivery', 'Vendor coordination', 'Go/no-go', 'Hypercare', 'Reusable deployment'],
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
  { id: 'anz', label: 'ANZ', x: 68, y: 78, wave: 1, note: 'Pilot wave — closest to the design team.' },
  { id: 'sea', label: 'South-East Asia', x: 52, y: 54, wave: 2, note: 'Language and delivery-format variation.' },
  { id: 'north-asia', label: 'North Asia', x: 74, y: 34, wave: 2, note: 'Local control requirements.' },
  { id: 'india', label: 'India', x: 30, y: 48, wave: 2, note: 'Scale and capacity considerations.' },
  { id: 'japan', label: 'Japan', x: 86, y: 26, wave: 3, note: 'Translation and formality expectations.' },
  { id: 'pacific', label: 'Pacific', x: 88, y: 66, wave: 3, note: 'Small markets, shared support model.' },
  { id: 'emea-link', label: 'Global core', x: 12, y: 20, wave: 1, note: 'Where the non-negotiables are defined.' },
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
    { id: 'daimler', employer: 'Daimler', contribution: 'Partner journey' },
    { id: 'ubs', employer: 'UBS', contribution: 'Regional scale' },
    { id: 'nab-compass', employer: 'NAB Compass', contribution: 'Governance and benefits' },
    { id: 'merck-cornerstone', employer: 'Merck Cornerstone', contribution: 'Quality and repeatability' },
  ],
} as const;

/**
 * Replace every placeholder href before sharing this site with anybody.
 * `isPlaceholder: true` renders a "configure before sharing" hint in review mode.
 */
export const contactActions: ContactAction[] = [
  {
    id: 'resume',
    label: 'Download résumé',
    href: './resume/sanjay-singh-rawat-resume.pdf',
    kind: 'resume',
    isPlaceholder: true,
    description: 'PDF résumé. Drop the real file at public/resume/ using this exact filename.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/REPLACE-WITH-PROFILE',
    kind: 'linkedin',
    isPlaceholder: true,
    description: 'Public LinkedIn profile.',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:REPLACE-WITH-EMAIL@example.com?subject=Pax8%20Partner%20Experience%20conversation',
    kind: 'email',
    isPlaceholder: true,
    description: 'Direct email with a pre-filled subject line.',
  },
  {
    id: 'booking',
    label: 'Book a conversation',
    href: 'https://REPLACE-WITH-BOOKING-LINK.example.com',
    kind: 'booking',
    isPlaceholder: true,
    description: 'Scheduling link for a 30-minute conversation.',
  },
  {
    id: 'print',
    label: 'Print-friendly case studies',
    href: '#print',
    kind: 'print',
    isPlaceholder: false,
    description: 'Opens the browser print dialog with a linear, ink-friendly layout.',
  },
];
