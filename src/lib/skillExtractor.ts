export interface ExtractedSkills {
  coreCS: string[];
  languages: string[];
  web: string[];
  data: string[];
  cloudDevOps: string[];
  testing: string[];
}

export type SkillConfidence = 'know' | 'practice';
export type CompanySize = 'Startup' | 'Mid-size' | 'Enterprise';

export interface CompanyIntel {
  name: string;
  industry: string;
  size: CompanySize;
  typicalHiringFocus: string;
}

export interface RoundMapping {
  round: number;
  title: string;
  description: string;
  whyItMatters: string;
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  skillConfidenceMap: Record<string, SkillConfidence>;
  adjustedReadinessScore: number;
  companyIntel: CompanyIntel | null;
  roundMapping: RoundMapping[];
  plan: DayPlan[];
  checklist: RoundChecklist[];
  questions: string[];
  readinessScore: number;
}

export interface DayPlan {
  day: number;
  title: string;
  tasks: string[];
}

export interface RoundChecklist {
  round: number;
  title: string;
  items: string[];
}

const SKILL_CATEGORIES = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  cloudDevOps: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest'],
};

export function extractSkills(jdText: string): ExtractedSkills {
  const text = jdText.toLowerCase();
  
  const extractCategory = (skills: string[]): string[] => {
    return skills.filter(skill => {
      const skillLower = skill.toLowerCase();
      // Handle special cases like C++ and C#
      const searchTerm = skillLower.replace(/[+#]/g, '\\$&');
      const regex = new RegExp(`\\b${searchTerm}\\b`, 'i');
      return regex.test(text);
    });
  };

  const extracted: ExtractedSkills = {
    coreCS: extractCategory(SKILL_CATEGORIES.coreCS),
    languages: extractCategory(SKILL_CATEGORIES.languages),
    web: extractCategory(SKILL_CATEGORIES.web),
    data: extractCategory(SKILL_CATEGORIES.data),
    cloudDevOps: extractCategory(SKILL_CATEGORIES.cloudDevOps),
    testing: extractCategory(SKILL_CATEGORIES.testing),
  };

  // If no skills detected, show General fresher stack
  const hasAnySkill = Object.values(extracted).some(arr => arr.length > 0);
  if (!hasAnySkill) {
    extracted.coreCS = ['DSA', 'OOP'];
    extracted.languages = ['Java', 'Python'];
    extracted.web = ['HTML/CSS', 'JavaScript Basics'];
  }

  return extracted;
}

export function generateChecklist(skills: ExtractedSkills): RoundChecklist[] {
  const hasSkill = (category: keyof ExtractedSkills, skill: string) => 
    skills[category].includes(skill);

  const hasAny = (category: keyof ExtractedSkills) => 
    skills[category].length > 0;

  return [
    {
      round: 1,
      title: 'Aptitude / Basics',
      items: [
        'Practice quantitative aptitude (percentages, ratios, profit/loss)',
        'Solve logical reasoning puzzles (pattern matching, series)',
        'Review verbal ability (grammar, comprehension)',
        hasAny('coreCS') ? 'Brush up on basic CS fundamentals' : 'Learn basic programming concepts',
        'Complete 2-3 mock aptitude tests',
      ],
    },
    {
      round: 2,
      title: 'DSA + Core CS',
      items: [
        hasSkill('coreCS', 'DSA') ? 'Revise arrays, strings, and hash maps' : 'Learn basic data structures',
        hasSkill('coreCS', 'DSA') ? 'Practice tree and graph traversals' : 'Understand recursion basics',
        hasSkill('coreCS', 'OOP') ? 'Review OOP principles and design patterns' : 'Learn OOP fundamentals',
        hasSkill('coreCS', 'DBMS') ? 'Study SQL queries and normalization' : 'Learn basic database concepts',
        hasSkill('coreCS', 'OS') ? 'Revise processes, threads, and memory management' : 'Understand OS basics',
        hasSkill('coreCS', 'Networks') ? 'Review HTTP, TCP/IP protocols' : 'Learn networking fundamentals',
        'Solve 5-10 LeetCode medium problems',
      ].filter(Boolean),
    },
    {
      round: 3,
      title: 'Tech Interview (Projects + Stack)',
      items: [
        hasAny('languages') ? `Prepare deep dive on ${skills.languages.slice(0, 2).join(', ')}` : 'Learn one programming language deeply',
        hasAny('web') ? `Review ${skills.web.slice(0, 2).join(', ')} concepts and best practices` : 'Understand web development basics',
        hasAny('data') ? `Practice ${skills.data.slice(0, 2).join(', ')} queries and optimization` : 'Learn database fundamentals',
        hasAny('cloudDevOps') ? `Understand ${skills.cloudDevOps.slice(0, 2).join(', ')} basics` : 'Learn deployment fundamentals',
        'Prepare to explain your projects (architecture, challenges, solutions)',
        'Review system design basics (scalability, caching)',
      ].filter(Boolean),
    },
    {
      round: 4,
      title: 'Managerial / HR',
      items: [
        'Prepare STAR format answers for behavioral questions',
        'Research company culture and values',
        'Prepare questions to ask the interviewer',
        'Practice salary negotiation strategies',
        'Review your resume thoroughly',
        'Prepare introduction (elevator pitch)',
      ],
    },
  ];
}

export function generatePlan(skills: ExtractedSkills): DayPlan[] {
  const hasAny = (category: keyof ExtractedSkills) => skills[category].length > 0;
  const skillList = Object.values(skills).flat().slice(0, 3);

  return [
    {
      day: 1,
      title: 'Basics + Core CS',
      tasks: [
        'Review CS fundamentals (OOP, DBMS basics)',
        hasAny('coreCS') ? 'Study core CS subjects detected in JD' : 'Learn basic CS concepts',
        'Practice 2 aptitude problems',
      ],
    },
    {
      day: 2,
      title: 'Basics + Core CS',
      tasks: [
        'Continue CS fundamentals revision',
        hasAny('coreCS') ? 'Focus on weak areas from mock tests' : 'Build CS foundation',
        'Complete 1 mock aptitude test',
      ],
    },
    {
      day: 3,
      title: 'DSA + Coding Practice',
      tasks: [
        'Solve 3 array/string problems',
        hasAny('coreCS') ? 'Practice DSA problems related to JD' : 'Learn basic data structures',
        'Review time/space complexity',
      ],
    },
    {
      day: 4,
      title: 'DSA + Coding Practice',
      tasks: [
        'Solve 3 tree/graph problems',
        'Practice dynamic programming basics',
        'Complete 1 timed coding test',
      ],
    },
    {
      day: 5,
      title: 'Project + Resume Alignment',
      tasks: [
        'Update resume with relevant keywords',
        hasAny('web') ? `Review ${skillList[0] || 'web'} project architecture` : 'Prepare project explanations',
        'Practice explaining projects in 2 minutes',
        hasAny('data') ? 'Prepare database schema explanations' : 'Review project data flow',
      ],
    },
    {
      day: 6,
      title: 'Mock Interview Questions',
      tasks: [
        'Practice 5 technical questions aloud',
        hasAny('web') ? 'Review frontend/backend interview questions' : 'Practice general tech questions',
        'Do 1 mock interview with friend/peer',
        'Record yourself answering questions',
      ],
    },
    {
      day: 7,
      title: 'Revision + Weak Areas',
      tasks: [
        'Review all notes and flashcards',
        'Focus on weak areas identified during practice',
        'Light coding practice (2 easy problems)',
        'Rest and prepare mentally for interview',
      ],
    },
  ];
}

export function generateQuestions(skills: ExtractedSkills): string[] {
  const questions: string[] = [];
  const hasSkill = (category: keyof ExtractedSkills, skill: string) => 
    skills[category].includes(skill);

  // Core CS questions
  if (hasSkill('coreCS', 'DSA')) {
    questions.push('How would you optimize search in sorted data? Explain binary search vs linear search.');
    questions.push('Explain the difference between array and linked list. When would you use each?');
  }
  if (hasSkill('coreCS', 'OOP')) {
    questions.push('Explain the four pillars of OOP with real-world examples.');
    questions.push('What is the difference between abstraction and encapsulation?');
  }
  if (hasSkill('coreCS', 'DBMS')) {
    questions.push('Explain normalization and its types. Why is it important?');
    questions.push('What are ACID properties in databases?');
  }
  if (hasSkill('coreCS', 'OS')) {
    questions.push('Explain the difference between process and thread.');
    questions.push('What is deadlock? How can it be prevented?');
  }
  if (hasSkill('coreCS', 'Networks')) {
    questions.push('Explain the difference between HTTP and HTTPS.');
    questions.push('What happens when you type a URL in the browser?');
  }

  // Language questions
  if (skills.languages.includes('Java')) {
    questions.push('Explain Java memory model and garbage collection.');
    questions.push('What is the difference between String, StringBuilder, and StringBuffer?');
  }
  if (skills.languages.includes('Python')) {
    questions.push('Explain Python decorators with an example.');
    questions.push('What are list comprehensions and generator expressions?');
  }
  if (skills.languages.includes('JavaScript') || skills.languages.includes('TypeScript')) {
    questions.push('Explain closures in JavaScript with a practical example.');
    questions.push('What is the event loop in JavaScript?');
  }

  // Web questions
  if (hasSkill('web', 'React')) {
    questions.push('Explain React state management options. When would you use each?');
    questions.push('What are React hooks? Explain useEffect and useMemo.');
  }
  if (hasSkill('web', 'Node.js')) {
    questions.push('How does Node.js handle asynchronous operations?');
    questions.push('Explain the middleware pattern in Express.js.');
  }
  if (hasSkill('web', 'REST') || hasSkill('web', 'GraphQL')) {
    questions.push('Compare REST vs GraphQL. What are the pros and cons of each?');
  }

  // Data questions
  if (hasSkill('data', 'SQL')) {
    questions.push('Explain indexing in databases. When does it help and when does it hurt?');
    questions.push('What is the difference between INNER JOIN and LEFT JOIN?');
  }
  if (hasSkill('data', 'MongoDB')) {
    questions.push('When would you choose MongoDB over SQL databases?');
    questions.push('Explain MongoDB aggregation pipeline.');
  }

  // Cloud/DevOps questions
  if (hasSkill('cloudDevOps', 'Docker')) {
    questions.push('What is the difference between Docker container and VM?');
    questions.push('Explain Docker layers and how they optimize builds.');
  }
  if (hasSkill('cloudDevOps', 'AWS') || hasSkill('cloudDevOps', 'Azure') || hasSkill('cloudDevOps', 'GCP')) {
    questions.push('Explain cloud computing deployment models (IaaS, PaaS, SaaS).');
    questions.push('What are the benefits of using cloud services?');
  }

  // Testing questions
  if (hasSkill('testing', 'Selenium') || hasSkill('testing', 'Cypress') || hasSkill('testing', 'Playwright')) {
    questions.push('What is the difference between unit testing and integration testing?');
    questions.push('Explain the Page Object Model in test automation.');
  }

  // Generic questions if few specific ones
  if (questions.length < 5) {
    questions.push('Tell me about yourself and your technical background.');
    questions.push('What is your approach to debugging a complex issue?');
    questions.push('How do you stay updated with the latest technologies?');
    questions.push('Describe a challenging project you worked on.');
    questions.push('How do you handle tight deadlines and pressure?');
  }

  return questions.slice(0, 10);
}

export function calculateReadinessScore(
  skills: ExtractedSkills,
  company: string,
  role: string,
  jdText: string
): number {
  let score = 35;

  // +5 per detected category present (max 30)
  const categoriesPresent = Object.values(skills).filter(arr => arr.length > 0).length;
  score += Math.min(categoriesPresent * 5, 30);

  // +10 if company name provided
  if (company.trim().length > 0) score += 10;

  // +10 if role provided
  if (role.trim().length > 0) score += 10;

  // +10 if JD length > 800 chars
  if (jdText.length > 800) score += 10;

  // Cap at 100
  return Math.min(score, 100);
}

export function calculateAdjustedScore(
  baseScore: number,
  skillConfidenceMap: Record<string, SkillConfidence>
): number {
  let adjustment = 0;
  
  Object.values(skillConfidenceMap).forEach(confidence => {
    if (confidence === 'know') {
      adjustment += 2;
    } else {
      adjustment -= 2;
    }
  });
  
  const adjustedScore = baseScore + adjustment;
  return Math.max(0, Math.min(100, adjustedScore));
}

export function createDefaultConfidenceMap(skills: ExtractedSkills): Record<string, SkillConfidence> {
  const allSkills = Object.values(skills).flat();
  const map: Record<string, SkillConfidence> = {};
  allSkills.forEach(skill => {
    map[skill] = 'practice';
  });
  return map;
}

// Known enterprise companies
const ENTERPRISE_COMPANIES = [
  'amazon', 'microsoft', 'google', 'apple', 'meta', 'facebook', 'netflix',
  'oracle', 'ibm', 'sap', 'salesforce', 'adobe', 'intel', 'cisco', 'dell',
  'hp', 'hewlett packard', 'accenture', 'tcs', 'tata consultancy', 'infosys',
  'wipro', 'cognizant', 'hcl', 'tech mahindra', 'capgemini', 'deloitte',
  'ey', 'ernst & young', 'kpmg', 'pwc', 'pricewaterhousecoopers',
  'jpmorgan', 'jp morgan', 'goldman sachs', 'morgan stanley', 'bank of america',
  'wells fargo', 'citigroup', 'citi'
];

// Known mid-size companies
const MIDSIZE_COMPANIES = [
  'uber', 'airbnb', 'twitter', 'snap', 'spotify', 'stripe', 'square',
  'shopify', 'slack', 'zoom', 'dropbox', 'twilio', 'atlassian', 'hubspot',
  'servicenow', 'workday', 'splunk', 'datadog', 'snowflake', 'databricks'
];

export function generateCompanyIntel(companyName: string): CompanyIntel | null {
  if (!companyName.trim()) return null;
  
  const nameLower = companyName.toLowerCase();
  
  // Determine company size
  let size: CompanySize = 'Startup';
  if (ENTERPRISE_COMPANIES.some(c => nameLower.includes(c))) {
    size = 'Enterprise';
  } else if (MIDSIZE_COMPANIES.some(c => nameLower.includes(c))) {
    size = 'Mid-size';
  }
  
  // Infer industry based on keywords
  let industry = 'Technology Services';
  if (nameLower.includes('bank') || nameLower.includes('jpmorgan') || nameLower.includes('goldman')) {
    industry = 'Financial Services';
  } else if (nameLower.includes('consulting') || nameLower.includes('accenture') || nameLower.includes('deloitte')) {
    industry = 'Consulting';
  } else if (nameLower.includes('retail') || nameLower.includes('amazon') || nameLower.includes('walmart')) {
    industry = 'Retail & E-commerce';
  } else if (nameLower.includes('health') || nameLower.includes('pharma')) {
    industry = 'Healthcare';
  }
  
  // Typical hiring focus based on size
  const typicalHiringFocus = size === 'Enterprise' 
    ? 'Structured DSA + Core Fundamentals. Heavy emphasis on algorithms, system design, and standardized interview processes.'
    : size === 'Mid-size'
    ? 'Balanced approach with DSA fundamentals plus practical implementation skills and product thinking.'
    : 'Practical problem solving + Stack depth. Focus on immediate contribution, hands-on coding, and versatility.';
  
  return {
    name: companyName,
    industry,
    size,
    typicalHiringFocus
  };
}

export function generateRoundMapping(
  skills: ExtractedSkills,
  companyIntel: CompanyIntel | null
): RoundMapping[] {
  const hasDSA = skills.coreCS.includes('DSA');
  const hasWeb = skills.web.length > 0;
  const companySize = companyIntel?.size || 'Startup';
  
  // Enterprise with DSA
  if (companySize === 'Enterprise' && hasDSA) {
    return [
      {
        round: 1,
        title: 'Online Assessment',
        description: 'DSA + Aptitude test on HackerRank/Codility platform',
        whyItMatters: 'Filters 70% of candidates. Tests speed, accuracy, and foundational problem-solving under time pressure.'
      },
      {
        round: 2,
        title: 'Technical Interview I',
        description: 'Deep DSA + Core CS fundamentals (OOP, DBMS, OS)',
        whyItMatters: 'Validates depth of knowledge. Enterprise needs engineers who can handle complex, scalable systems.'
      },
      {
        round: 3,
        title: 'Technical Interview II',
        description: 'System design + Projects discussion',
        whyItMatters: 'Assesses architecture skills. Critical for building and maintaining large-scale enterprise products.'
      },
      {
        round: 4,
        title: 'Hiring Manager',
        description: 'Behavioral + Culture fit + Career alignment',
        whyItMatters: 'Ensures long-term retention. Enterprise invests heavily in onboarding and training.'
      },
      {
        round: 5,
        title: 'HR Discussion',
        description: 'Compensation, benefits, and offer negotiation',
        whyItMatters: 'Final alignment on expectations. Standardized packages with room for negotiation based on performance.'
      }
    ];
  }
  
  // Enterprise without DSA focus
  if (companySize === 'Enterprise' && !hasDSA) {
    return [
      {
        round: 1,
        title: 'Online Assessment',
        description: 'Aptitude + Basic programming concepts',
        whyItMatters: 'Baseline assessment of logical thinking and coding fundamentals.'
      },
      {
        round: 2,
        title: 'Technical Interview',
        description: 'Role-specific skills + Core concepts',
        whyItMatters: 'Validates practical knowledge required for the specific position.'
      },
      {
        round: 3,
        title: 'Hiring Manager',
        description: 'Projects + Behavioral discussion',
        whyItMatters: 'Assesses cultural fit and past experience relevance.'
      },
      {
        round: 4,
        title: 'HR Discussion',
        description: 'Offer and compensation',
        whyItMatters: 'Finalizes employment terms and onboarding details.'
      }
    ];
  }
  
  // Startup with Web focus
  if (companySize === 'Startup' && hasWeb) {
    return [
      {
        round: 1,
        title: 'Practical Coding',
        description: 'Live coding session building a small feature',
        whyItMatters: 'Startups need immediate contributors. Tests real-world coding ability and speed.'
      },
      {
        round: 2,
        title: 'System Discussion',
        description: 'Architecture discussion + Previous projects deep dive',
        whyItMatters: 'Assesses end-to-end thinking. Startups value engineers who can own features independently.'
      },
      {
        round: 3,
        title: 'Culture & Fit',
        description: 'Founder/CTO interview + Team collaboration scenarios',
        whyItMatters: 'Critical for small teams. Cultural alignment drives startup success and retention.'
      },
      {
        round: 4,
        title: 'Final Discussion',
        description: 'Role expectations + Equity discussion',
        whyItMatters: 'Aligns on growth trajectory. Startup compensation often includes equity components.'
      }
    ];
  }
  
  // Startup without Web focus (general)
  if (companySize === 'Startup' && !hasWeb) {
    return [
      {
        round: 1,
        title: 'Technical Screening',
        description: 'Problem solving + Core skills assessment',
        whyItMatters: 'Quick validation of technical competency for fast-moving startups.'
      },
      {
        round: 2,
        title: 'Deep Dive',
        description: 'Project discussion + Domain expertise',
        whyItMatters: 'Assesses depth in relevant areas for immediate impact.'
      },
      {
        round: 3,
        title: 'Team Fit',
        description: 'Collaboration scenarios + Culture alignment',
        whyItMatters: 'Small teams require strong interpersonal dynamics and shared values.'
      }
    ];
  }
  
  // Mid-size (balanced approach)
  return [
    {
      round: 1,
      title: 'Online Test',
      description: 'DSA + Aptitude screening',
      whyItMatters: 'Initial filter to manage high application volume efficiently.'
    },
    {
      round: 2,
      title: 'Technical Interview',
      description: 'DSA/Problem solving + Practical coding',
      whyItMatters: 'Balances theoretical knowledge with hands-on implementation skills.'
    },
    {
      round: 3,
      title: 'System Design',
      description: 'Architecture discussion + Scalability concepts',
      whyItMatters: 'Mid-size companies are scaling. Need engineers who can grow with the system.'
    },
    {
      round: 4,
      title: 'Hiring Manager',
      description: 'Behavioral + Career goals alignment',
      whyItMatters: 'Ensures mutual growth trajectory. Mid-size companies invest in long-term potential.'
    }
  ];
}
