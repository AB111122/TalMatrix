/**
 * TALMATRIX DATA STORE
 * Editing data here automatically updates the UI across all pages.
 */

const TALMATRIX_DATA = {
  // 7 Services rendered on Home page
  services: [
    {
      index: "01",
      title: "Recruitment & Talent Acquisition",
      description: "Find the people who move your business forward.",
      link: "services.html#recruitment",
      icon: "diagonal-arrow"
    },
    {
      index: "02",
      title: "HR Consulting",
      description: "Practical people systems for growing organizations.",
      link: "services.html#hr-consulting",
      icon: "ring-circle"
    },
    {
      index: "03",
      title: "Learning & Development",
      description: "Build the capability your next chapter needs.",
      link: "services.html#learning",
      icon: "sparkle"
    },
    {
      index: "04",
      title: "Open Enrollment Programs",
      description: "Practical learning for ambitious professionals.",
      link: "programs.html",
      icon: "concentric-circles"
    },
    {
      index: "05",
      title: "Courses & Certifications",
      description: "Learn. Develop. Get recognised.",
      link: "courses.html",
      icon: "diamond"
    },
    {
      index: "06",
      title: "Workshops & Corporate Training",
      description: "Learning designed around your business.",
      link: "services.html#corporate-training",
      icon: "parallelogram"
    },
    {
      index: "07",
      title: "Third-Party Payroll Services",
      description: "Reliable payroll. Simplified HR.",
      link: "services.html#payroll",
      icon: "square-in-square"
    }
  ],

  // 3 Program Cards (Shared between Home, Programs, Courses)
  programs: [
    {
      slug: "strategic-hr-foundations",
      index: "01",
      type: "Open enrollment",
      title: "Strategic HR Foundations",
      date: "18 Apr 2026",
      duration: "2 days",
      mode: "Online",
      seats: "18 seats"
    },
    {
      slug: "managerial-effectiveness-lab",
      index: "02",
      type: "Professional course",
      title: "Managerial Effectiveness Lab",
      date: "09 May 2026",
      duration: "1 day",
      mode: "Online",
      seats: "12 seats"
    },
    {
      slug: "practical-performance-management",
      index: "03",
      type: "Corporate workshop",
      title: "Practical Performance Management",
      date: "23 May 2026",
      duration: "Half day",
      mode: "In-house",
      seats: "By request"
    }
  ],

  // Home Page: Why Talmatrix 4 rows
  whyHome: [
    { index: "01", text: "Business-focused solutions" },
    { index: "02", text: "Practical, workplace-ready approach" },
    { index: "03", text: "Customized to your context" },
    { index: "04", text: "End-to-end people support" }
  ],

  // About Page: Why Talmatrix 6 detailed rows
  whyAbout: [
    {
      index: "01",
      title: "Practical & Relevant",
      description: "Our solutions are built around real workplace and professional needs."
    },
    {
      index: "02",
      title: "Business-Aligned",
      description: "We connect people solutions with organizational objectives and business realities."
    },
    {
      index: "03",
      title: "People-Centric",
      description: "We believe sustainable growth starts with developing people."
    },
    {
      index: "04",
      title: "Integrated",
      description: "From recruitment and HR support to payroll and learning, we bring complementary people solutions together under one platform."
    },
    {
      index: "05",
      title: "Flexible",
      description: "Our solutions can be adapted according to different organizational requirements and development needs."
    },
    {
      index: "06",
      title: "Partnership-Focused",
      description: "We aim to build lasting relationships and create value beyond a single engagement."
    }
  ],

  // Courses Page: 4 "Designed For" audience cards
  coursesAudiences: [
    {
      index: "01",
      title: "Working Professionals",
      description: "Enhance leadership, people management, and strategic workforce capabilities.",
      icon: "sparkle"
    },
    {
      index: "02",
      title: "Fresh Graduates",
      description: "Build career-ready skills and workplace fluency to accelerate entry into corporate HR.",
      icon: "ring-circle"
    },
    {
      index: "03",
      title: "Career Builders",
      description: "Transition into high-impact management, talent acquisition, and development roles.",
      icon: "diagonal-arrow"
    },
    {
      index: "04",
      title: "HR & Business Professionals",
      description: "Master specialized HR frameworks, performance systems, and modern labor practices.",
      icon: "diamond"
    }
  ],

  // Contact Form select options
  serviceSelectOptions: [
    "Recruitment & Talent Acquisition",
    "HR Consulting",
    "Learning & Development",
    "Open Enrollment Programs",
    "Courses & Certifications",
    "Workshops & Corporate Training",
    "Third-Party Payroll Services",
    "Other"
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.TALMATRIX_DATA = TALMATRIX_DATA;
}
