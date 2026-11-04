const resumeData = {
  name: 'Nishant Kumar Jha',
  linkedinId: 'https://www.linkedin.com/in/nkjnishant/',
  githubUrl: 'https://github.com/nkj-c4',
  stackOverflowUrl: 'https://stackoverflow.com/users/15107688/nishant-jha',
  resumeLink: 'https://drive.google.com/file/d/1yh7OdEXujzgrPcFXwRIoy4lMNT3G9Lwf/view?usp=sharing',
  intro: 'I turn complex workflows into simple, reliable products — from the interface people use to the infrastructure that keeps it running.',
  metrics: [
    { value: '2,000+', label: 'users supported by internal platforms' },
    { value: '20k', label: 'approximate API requests per day' },
    { value: '50–80%', label: 'less manual provisioning effort' }
  ],
  caseStudies: [
    {
      category: 'PLATFORM ENGINEERING',
      title: 'Self-service infrastructure, without the waiting.',
      description: 'Architected an internal automation platform that connects a Next.js interface, Node.js services, and Airflow orchestration. Secure self-service flows help teams request and manage resources while substantially reducing manual provisioning.',
      technologies: ['Next.js', 'Node.js', 'Airflow', 'AWS', 'Terraform']
    },
    {
      category: 'PRODUCT ENGINEERING',
      title: 'Interfaces designed around real workflows.',
      description: 'Built application experiences and APIs for analytics, reporting, and search, with careful attention to authentication, role-based access, observability, and everyday usability.',
      technologies: ['React', 'Vue.js', 'Express', 'Flask', 'ELK']
    },
    {
      category: 'APPLIED AI',
      title: 'Conversational AI, taken beyond the demo.',
      description: 'Exploring real-time voice experiences for provider outreach by bringing speech, contextual state, and conversational flows together in a working proof of concept.',
      technologies: ['Real-time AI', 'WebSockets', 'Voice UX']
    }
  ],
  experience: [
    {
      company: 'Optum',
      role: 'Data Engineering · Full Stack & Cloud',
      period: 'JUL 2023 — PRESENT',
      summary: 'Building and operating healthcare-focused internal products across frontend, backend, security, and AWS infrastructure. Work spans self-service automation, SSO and access control, CI/CD, search, and analytics tooling.'
    },
    {
      company: 'Micro Focus / OpenText',
      role: 'Systems Software Engineer I',
      period: 'OCT 2022 — JUN 2023',
      summary: 'Modernized enterprise product interfaces for Vertica, migrating legacy JSP views to reusable React components and API-driven flows while contributing to multi-cloud deployments and delivery pipelines.'
    },
    {
      company: 'Navia Life Care',
      role: 'Frontend Developer Intern',
      period: 'JAN 2022 — SEP 2022',
      summary: 'Shipped React features for NaviaSmart and Aarogya Pay, including analytics instrumentation, finance workflows, interactive dashboards, and reusable graphs, tables, dropdowns, and modals.'
    },
    {
      company: 'Troislogic',
      role: 'Frontend Developer Intern',
      period: 'SEP 2021 — JAN 2022',
      summary: 'Built a foundation in product engineering through React API integrations, React Native development, backend debugging, and close collaboration within a six-person team.'
    }
  ],
  capabilities: [
    { title: 'Product & frontend', skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript'] },
    { title: 'Services & data', skills: ['Node.js', 'Express', 'Python', 'Flask', 'PostgreSQL', 'MongoDB'] },
    { title: 'Cloud & delivery', skills: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Airflow'] },
    { title: 'Quality & security', skills: ['Snyk', 'JFrog', 'CI/CD', 'RBAC', 'Architecture docs'] }
  ],
  projects: [
    {
      name: 'Visageer',
      type: 'FULL STACK',
      description: 'A full-stack face detection application built with React, Node, Express, and PostgreSQL.',
      image: 'images/portfolio/visageer.jpg',
      repo: 'https://github.com/NKJ-C4/visageer',
      url: 'https://visageer.onrender.com/'
    },
    {
      name: 'Cardio-Fit',
      type: 'MACHINE LEARNING',
      description: 'A Flask-based web application that uses machine learning to assess heart-disease risk.',
      image: 'images/portfolio/cardio-fit.jpg',
      repo: 'https://github.com/NKJ-C4/Heart-Disease-Web-App',
      url: 'https://cardio-fit.onrender.com/'
    },
    {
      name: 'Travlee',
      type: 'FRONTEND',
      description: 'A crisp, responsive landing-page concept for a travel product.',
      image: 'images/portfolio/travel.jpg',
      repo: 'https://github.com/NKJ-C4/boilerplate4travel',
      url: 'https://boilerplate4travel.vercel.app/'
    }
  ]
};

export default resumeData;
