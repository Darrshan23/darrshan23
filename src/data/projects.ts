export type Project = {
  title: string;
  date: string;
  description: string;
  bullets: string[];
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Evo TI Platform: Threat Intelligence Automation",
    date: "In Progress",
    featured: true,
    description:
      "Centralized threat intelligence platform that automates the aggregation, correlation, and analysis of diverse cyber threat data across enterprise environments.",
    bullets: [
      "Architecting automated pipelines to ingest and normalize high volumes of threat feeds, processing IoCs (malicious IPs, domains, file hashes) at scale.",
      "Developing STIX/TAXII API integrations to connect the platform with existing SIEM environments for real-time data synchronization.",
      "Mapping adversary TTPs against the MITRE ATT&CK framework and engineering threat-scoring algorithms to reduce analyst alert fatigue.",
      "Building an analyst dashboard to visualize threat landscapes and generate automated intelligence briefs for technical and executive stakeholders.",
    ],
    tags: ["Python", "STIX/TAXII", "MITRE ATT&CK", "SIEM Integration", "Threat Intelligence", "Dashboard"],
  },
  {
    title: "Go-HIDS: Real-Time Host Intrusion Detection",
    date: "Jan 2026",
    description:
      "A production-grade security agent built in Go, leveraging Goroutines for concurrent, non-blocking log analysis.",
    bullets: [
      "Regex-based detection engine identifying IOCs including SSH Brute Force (MITRE T1110) and privilege escalation patterns.",
      "Automated alerting pipeline that parses raw logs into structured JSON and triggers instant webhook notifications for analysts.",
    ],
    tags: ["Go", "Goroutines", "Regex", "MITRE ATT&CK", "Webhook"],
  },
  {
    title: "Web Exploitation & Pen Testing Lab",
    date: "Jan 2026 – Present",
    description:
      "Virtualized testing environment simulating real-world web application vulnerabilities using Kali Linux.",
    bullets: [
      "Attack simulations: MITM attacks, directory scanning, and credential harvesting with WebSploit.",
      "Defensive analysis of generated attack traffic to identify detection patterns and improve threat hunting.",
    ],
    tags: ["Kali Linux", "WebSploit", "MITM", "Pen Testing"],
  },
  {
    title: "Personal Mini SIEM Ecosystem",
    date: "Self-Directed Lab",
    description: "Localized SIEM system built to actively ingest, parse, and monitor operational telemetry end-to-end.",
    bullets: [
      "Continuous monitoring with fine-tuned alert thresholds for advanced detection engineering.",
      "Practice ground for real-world SOC workflows and log correlation techniques.",
    ],
    tags: ["Wazuh", "Log Correlation", "Detection Engineering"],
  },
  {
    title: "IoT Obstacle Avoidance Car",
    date: "April 2025",
    description: "Autonomous embedded system capable of detecting and avoiding obstacles in real time.",
    bullets: [
      "Programmed microcontrollers using Arduino, integrated with Raspberry Pi for processing.",
      "Python for sensor data handling and motion control with full IoT hardware-software integration.",
    ],
    tags: ["Python", "Arduino", "Raspberry Pi", "IoT"],
  },
];
