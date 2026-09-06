export type ExperienceItem = {
  company: string;
  role: string;
  location?: string;
  date: string;
  current?: boolean;
  logo?: string;
  logoInitials: string;
  bullets: { label: string; text: string }[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Accenture",
    role: "Cybersecurity Analyst",
    location: "Exchange 106, TRX, Kuala Lumpur",
    date: "Apr 2026 – Present",
    current: true,
    logo: "/images/accenture.png",
    logoInitials: "AC",
    bullets: [
      {
        label: "Multi-Client SOC Operations",
        text: "Concurrently monitor and triage security alerts across three enterprise clients using Splunk ES, Google SecOps SOAR, Trend Micro Vision One, and Trend Micro Deep Security to validate activity and escalate confirmed incidents to IR teams.",
      },
      {
        label: "Threat Containment & Tuning",
        text: "Block confirmed malicious items and manage exception requests within Detection Model Management to reduce false positives and keep detection rules accurate.",
      },
      {
        label: "Client & Team Coordination",
        text: "Participate in bi-weekly client cadence calls and contribute to MSS monthly reports; join weekly team standups to maintain continuity across shifts.",
      },
      {
        label: "Endpoint & Infrastructure Defense",
        text: "Run malware scans, isolate or collect files from compromised endpoints, and monitor critical servers, firewalls, and Windows devices.",
      },
      {
        label: "Automation",
        text: "Built a Python tool using the VirusTotal API to automate bulk domain-reputation checks, exporting results to Excel to speed up triage.",
      },
    ],
    tags: [
      "Splunk ES",
      "Google SecOps SOAR",
      "Trend Micro Vision One",
      "Trend Micro Deep Security",
      "Multi-Client SOC",
      "Python",
      "VirusTotal API",
    ],
  },
  {
    company: "TimedotCom",
    role: "Cybersecurity Analyst, Intern",
    date: "Aug 2025 – Nov 2025",
    logo: "/images/timedotcom.jpg",
    logoInitials: "TDC",
    bullets: [
      {
        label: "SIEM Monitoring & Incident Triage",
        text: "Monitored SIEM alerts to detect potential threats, creating tickets for all offenses and escalating validated incidents to L2 analysts or customers for verification.",
      },
      {
        label: "DDoS Response & Communication",
        text: "Managed DDoS incident protocols by issuing timely notifications to customers via email/phone based on attack duration (≥10 mins) and SLAs.",
      },
      {
        label: "Operational Support",
        text: "Assisted in monthly security reports and maintained accurate operational data using Excel.",
      },
      {
        label: "Platform Proficiency",
        text: "Hands-on training in Stellar Cyber Open XDR and PRE Security AI SOC for offense management and analysis.",
      },
    ],
    tags: ["IBM QRadar", "Stellar Cyber XDR", "SIEM", "DDoS", "Incident Response"],
  },
  {
    company: "Mr Digital",
    role: "Website Developer, Freelance",
    date: "Dec 2023 – Aug 2025",
    logoInitials: "MD",
    bullets: [
      {
        label: "Full-Stack Development",
        text: "Developed custom, responsive websites from concept to deployment — front-end interfaces and back-end functionality.",
      },
      {
        label: "Client Management",
        text: "Collaborated directly with clients to translate requirements into functional digital solutions.",
      },
      {
        label: "Process Standardisation",
        text: "Created a structured Client Discovery Questionnaire (CDQ) and managed the Master Service Agreement (MSA) and Statement of Work (SOW).",
      },
    ],
    tags: ["HTML/CSS/JS", "PHP", "WordPress", "MySQL"],
  },
];
