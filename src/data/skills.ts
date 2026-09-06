export type SkillGroup = {
  icon: string;
  title: string;
  items: string[];
  size?: "wide" | "tall" | "normal";
};

export const skillGroups: SkillGroup[] = [
  {
    icon: "🛡️",
    title: "Security Tools & Platforms",
    size: "wide",
    items: [
      "Splunk ES",
      "Google SecOps SOAR",
      "Trend Micro Vision One",
      "Trend Micro Deep Security",
      "IBM QRadar",
      "Stellar Cyber XDR",
      "PRE Security AI",
      "Arbor DDoS",
      "Cacti",
      "Nmap",
      "Kali Linux",
      "Parrot OS",
    ],
  },
  {
    icon: "🔍",
    title: "Security Operations",
    items: [
      "SIEM",
      "XDR",
      "Incident Response",
      "Log Analysis",
      "Digital Forensics",
      "MITRE ATT&CK",
      "Offense Mgmt",
      "Email Quarantine Analysis",
      "Threat Triage",
    ],
  },
  {
    icon: "🌐",
    title: "Networking & Infra",
    items: [
      "Routing & Switching",
      "Cisco",
      "IPSec VPN",
      "NAT/PAT",
      "AWS EC2",
      "Windows Server",
      "Active Directory",
      "Docker",
    ],
  },
  {
    icon: "💻",
    title: "Programming & Dev",
    items: ["Python", "C++", "C#", "Ruby", "JavaScript", "SQL", "PHP", "Flask", "HTML/CSS"],
  },
  {
    icon: "🗄️",
    title: "Databases & Platforms",
    size: "tall",
    items: ["PostgreSQL", "MySQL", "Supabase", "Thingsboard", "WordPress", "Wix"],
  },
  {
    icon: "📊",
    title: "Productivity & Soft Skills",
    size: "tall",
    items: ["Excel", "Data Visualisation", "Generative AI", "Report Writing", "Social Engineering"],
  },
];
