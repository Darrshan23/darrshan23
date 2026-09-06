export type EducationItem = {
  icon: string;
  school: string;
  degree: string;
  period: string;
  scores: string[];
};

export const education: EducationItem[] = [
  {
    icon: "🎓",
    school: "Swinburne University of Technology",
    degree: "Bachelor of Computer Science — Major in Cybersecurity",
    period: "Feb 2023 – Dec 2025  |  Subang / Australia",
    scores: ["CGPA 3.5 MY", "2.75 AUS"],
  },
  {
    icon: "📚",
    school: "INTI International College, Subang",
    degree: "Foundation in IT",
    period: "Jan 2022 – Dec 2022  |  Subang",
    scores: ["CGPA 3.3"],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  logo: string;
};

export const certifications: Certification[] = [
  { name: "Certified Cybersecurity Technician", issuer: "EC-Council", date: "Jan 2026", logo: "/images/ec-council.png" },
  { name: "Certified in Cybersecurity", issuer: "ISC2", date: "Dec 2025", logo: "/images/isc2.jpg" },
  { name: "SOC Analyst Associate", issuer: "Stellar Cyber", date: "Nov 2025", logo: "/images/stellar-cyber.png" },
  { name: "Security Essentials Professional Certificate", issuer: "Microsoft", date: "Oct 2025", logo: "/images/microsoft.png" },
  { name: "Certified Associate in Cybersecurity (FCA)", issuer: "Fortinet", date: "Apr 2025", logo: "/images/fortinet.png" },
  { name: "FortiGate 7.4 Operator", issuer: "Fortinet", date: "Apr 2025", logo: "/images/fortinet.png" },
  { name: "CCNA: Enterprise Networking, Security & Automation", issuer: "Cisco", date: "Aug 2024", logo: "/images/cisco.jpg" },
  { name: "CCNAv7: Switching, Routing & Wireless Essentials", issuer: "Cisco", date: "Aug 2024", logo: "/images/cisco.jpg" },
  { name: "Network Security", issuer: "Cisco", date: "Jan 2025", logo: "/images/cisco.jpg" },
  { name: "AWS x INTI Ideathon", issuer: "AWS", date: "May 2025", logo: "/images/aws.png" },
  { name: "SIEM: Event Management with Splunk Security", issuer: "LinkedIn", date: "Oct 2025", logo: "/images/linkedin.png" },
  { name: "ISC2 Candidate", issuer: "ISC2", date: "Dec 2024", logo: "/images/isc2.jpg" },
  { name: "Linux Unhatched", issuer: "Cisco", date: "Dec 2024", logo: "/images/cisco.jpg" },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco", date: "Jan 2024", logo: "/images/cisco.jpg" },
  { name: "Cybersecurity Awareness: Terminology", issuer: "LinkedIn", date: "Nov 2025", logo: "/images/linkedin.png" },
  { name: "Security Essentials: Concepts, Solutions & AI Protection", issuer: "Microsoft / LinkedIn", date: "Oct 2025", logo: "/images/microsoft.png" },
];
