export type SiteNavItem = { label: string; href: string };

export type EducationItem = {
  school: string;
  degree: string;
  focus?: string;
  location?: string;
  period: string;
  highlights: string[];
};

export type ProjectItem = {
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  tools: string[];
  impact: string;
  impactZh?: string;
  href?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceItem = {
  title: string;
  titleZh?: string;
  org: string;
  orgZh?: string;
  location?: string;
  locationZh?: string;
  period: string;
  periodZh?: string;
  bullets: string[];
  bulletsZh?: string[];
};

export const site = {
  name: "Jiyuan Zhao",
  tagline: "Applied analytics + business thinking for measurable decisions.",
  intro:
    "I’m a graduate student in Applied Analytics at Columbia University with a foundation in applied mathematics from UCLA. I work at the intersection of data, operations, and strategy—turning messy problems into clear narratives, forecasts, and decisions.",
  nav: [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ] satisfies SiteNavItem[],
  hero: {
    headline: "Graduate Student • Applied Analytics",
    subheadline:
      "Focused on data analytics, supply chain analytics, and business analytics—bridging forecasting, storytelling, and cross-functional execution.",
    primaryCta: { label: "View Projects", href: "#projects" },
    secondaryCta: { label: "Download Resume", href: "/resume.pdf" },
    note: "Open to full-time roles and management trainee programs.",
  },
  about: {
    title: "About me",
    body: [
      "I combine analytical rigor with business context to drive practical outcomes—whether that’s improving forecast accuracy, identifying process bottlenecks, or explaining performance drivers to stakeholders.",
      "My work is grounded in experimentation, clean metrics, and clear communication. I’m especially interested in roles that sit close to decision-making across operations, supply chain, and growth.",
    ],
    highlights: [
      "Forecasting & demand planning mindset",
      "Business problem framing and KPI design",
      "Data storytelling for leadership audiences",
      "Cross-functional execution with operations teams",
    ],
  },
  education: [
    {
      school: "Columbia University 哥伦比亚大学",
      degree: "M.S. in Applied Analytics",
      location: "New York, NY",
      period: "2024 — 2026 (Expected)",
      highlights: [
        "Statistical modeling, machine learning, and applied analytics",
        "Business-facing analytics: experimentation, dashboards, and storytelling",
      ],
    },
    {
      school: "University of California, Los Angeles (UCLA)\n加州大学洛杉矶分校",
      degree: "B.S. in Applied Mathematics",
      location: "Los Angeles, CA",
      period: "2020 — 2024",
      highlights: [
        "Strong foundation in probability, optimization, and numerical methods",
        "Applied problem solving across data-driven domains",
      ],
    },
  ] satisfies EducationItem[],
  projects: [
    {
      title: "Supply Chain Demand Forecasting",
      titleZh: "供应链需求预测",
      description:
        "Built a forecasting pipeline to improve short-term demand planning and reduce stockout risk using time-series features and model comparison.",
      descriptionZh:
        "构建需求预测流程，通过时间序列特征与模型对比提升短期需求计划能力并降低缺货风险。",
      tools: ["Python", "pandas", "statsmodels", "scikit-learn", "SQL"],
      impact:
        "Improved forecast accuracy and enabled scenario-based planning for inventory decisions.",
      impactZh: "提升预测准确率，并支持库存决策中的情景化规划。",
      href: "https://github.com/pIanck/Projects",
    },
    {
      title: "NYC Restaurant Inspection Analytics",
      titleZh: "纽约餐饮检查数据分析",
      description:
        "Analyzed inspection outcomes to identify drivers of violations and design a monitoring view for risk signals across neighborhoods and cuisine types.",
      descriptionZh:
        "分析检查结果，识别违规驱动因素，并设计覆盖不同社区与菜系的风险监控视图。",
      tools: ["Python", "SQL", "Tableau/Power BI", "EDA", "A/B framing"],
      impact:
        "Produced actionable insights and clear visuals to support prioritization and operational interventions.",
      impactZh: "形成可执行洞察与清晰可视化，支持优先级决策与运营干预。",
      href: "https://github.com/pIanck/Projects",
    },
    {
      title: "Walmart Shipping Policy Research Design",
      titleZh: "沃尔玛包邮政策研究设计",
      description:
        "Concluded that unconditional free shipping significantly increased average spending and transaction frequency.",
      descriptionZh:
        "研究结论显示，无条件包邮显著提升了客单价与交易频次。",
      tools: ["R", "GeoPandas", "Plotly", "Public data", "Storytelling"],
      impact:
        "Delivered an executive-style narrative with interactive visuals for non-technical audiences.",
      impactZh: "以管理层叙事方式输出结果，并通过交互式可视化服务非技术受众。",
      href: "https://github.com/pIanck/Projects",
    },
    {
      title: "CTR prediction",
      titleZh: "Kaggle 建模竞赛：CTR 预测",
      description:
        "Delivered a comprehensive report interpreting key drivers of CTR and providing recommendations for ad campaign optimization.",
      descriptionZh:
        "提交完整分析报告，解释 CTR 关键驱动因素并提出广告投放优化建议。",
      tools: ["Python", "scikit-learn", "Isolation Forest", "Feature engineering"],
      impact:
        "Reduced time-to-detection and improved monitoring reliability with explainable alerts.",
      impactZh: "缩短异常识别时间，并通过可解释告警提升监控可靠性。",
      href: "https://github.com/pIanck/Projects",
    },
  ] satisfies ProjectItem[],
  skills: [
    {
      title: "Programming / Tools",
      items: ["Python", "SQL", "Git", "Excel", "Jupyter", "APIs"],
    },
    {
      title: "Data Science / Machine Learning",
      items: [
        "Forecasting",
        "Regression & classification",
        "Anomaly detection",
        "Model evaluation",
        "Feature engineering",
      ],
    },
    {
      title: "Analytics / BI",
      items: ["Tableau", "Power BI", "Dashboard design", "KPI definition", "EDA"],
    },
    {
      title: "Business / Supply Chain",
      items: [
        "Demand planning",
        "Inventory & service level thinking",
        "Process improvement",
        "Stakeholder management",
        "Executive communication",
      ],
    },
  ] satisfies SkillGroup[],
  experience: [
    {
      title: "Analytics / Supply Chain Intern",
      titleZh: "分析 / 供应链实习",
      org: "WSI",
      orgZh: "WSI",
      location: "NewYork",
      locationZh: "纽约",
      period: "Summer 2025",
      periodZh: "2025年夏季",
      bullets: [
        "Owned a metrics deep-dive and recommended operational changes based on root-cause analysis.",
        "Built a forecasting or reporting workflow that improved visibility for cross-functional partners.",
        "Presented findings to stakeholders with clear trade-offs, assumptions, and next steps.",
      ],
      bulletsZh: [
        "主导关键指标深度分析，基于根因研究提出可执行的运营优化建议。",
        "搭建预测/报告流程，提升跨部门协作中的数据可见性与决策效率。",
        "向业务方清晰呈现取舍、假设与下一步行动，推动结果落地。",
      ],
    },
    {
      title: "Project / Leadership Experience (Placeholder)",
      titleZh: "项目 / 领导力经历（示例）",
      org: "Tektronix",
      orgZh: "泰克（Tektronix）",
      location: "Beijing",
      locationZh: "北京",
      period: "2024 — Present",
      periodZh: "2024 — 至今",
      bullets: [
        "Led an analytics project from problem definition to deliverable, partnering with non-technical stakeholders.",
        "Created a lightweight dashboard or reporting cadence to support decision-making.",
      ],
      bulletsZh: [
        "从问题定义到成果交付全程主导分析项目，并与非技术业务方高效协作。",
        "建立轻量化看板与定期汇报机制，持续支持业务决策。",
      ],
    },
  ] satisfies ExperienceItem[],
  contact: {
    email: "your.email@example.com",
    linkedin: "https://www.linkedin.com/in/your-handle/",
    github: "https://github.com/your-handle",
  },
  seo: {
    title: "Portfolio | Applied Analytics",
    description:
      "A premium, minimal portfolio focused on applied analytics, forecasting, and business storytelling.",
  },
} as const;

