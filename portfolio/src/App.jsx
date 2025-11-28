import React, { useState, useEffect } from 'react';
import { Shield, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Code, Lock, Network, Database, Cloud, Terminal, Award, Briefcase, GraduationCap, ChevronDown, Menu, X, Eye, Cpu, Server } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const experiences = [
    {
      title: "Cybersecurity Analyst, Intern",
      company: "TimedotCom",
      period: "2024 - 2025",
      description: [
        "Autonomously managed the SIEM offense queue, performing end-to-end investigation and resolution of security alerts",
        "Conducted proactive threat hunting by correlating SIEM data with threat intelligence and IoCs",
        "Investigated email threats via the quarantine system",
        "Managed DDoS attacks from detection to customer notification",
        "Monitored system health (Event Collectors), performing diagnostics and drafting initial client incident summaries",
        "Trained on advanced platforms: Stellar Cyber Open XDR and PRE Security AI SOC",
        "Collaborated in team reviews of complex security incidents within the live Security Operations Center (CySOC)"
      ]
    },
    {
      title: "Website Developer, Freelance",
      company: "Mr Digital",
      period: "Dec 2023 - Aug 2025",
      description: [
        "Designed and developed custom, responsive websites from concept to deployment",
        "Engineered full-stack features, building robust front-end interfaces and efficient back-end functionality",
        "Partnered directly with clients throughout the project lifecycle"
      ]
    }
  ];

  const projects = [
    {
      title: "AI-Powered Honeypot Threat Intelligence Platform",
      description: "Architected a virtualized lab with a Kali Linux honeypot. Engineered a Python data pipeline for log processing and developed a Scikit-learn model to classify attack types. Built an interactive Flask dashboard to visualize real-time attack statistics.",
      tags: ["Python", "Machine Learning", "Flask", "Honeypot"],
      icon: Shield
    },
    {
      title: "Forensic Investigation: Imanuel Leet-Hacker Case",
      description: "Led a digital forensic investigation into cybercrimes including website defacement and social media takeover. Acquired and analyzed digital evidence using industry-standard tools and compiled a detailed forensic report.",
      tags: ["Digital Forensics", "FTK", "Autopsy", "Investigation"],
      icon: Eye
    },
    {
      title: "Mathology In-house Management System",
      description: "Engineered a web-based system to automate class scheduling, attendance, and payment management. Developed the full-stack application using HTML, CSS, JavaScript, PHP & SQL with secure coding practices.",
      tags: ["PHP", "MySQL", "JavaScript", "Full-Stack"],
      icon: Database
    },
    {
      title: "IoT Obstacle Avoidance Car",
      description: "Developed an autonomous vehicle with real-time obstacle detection. Programmed microcontrollers (Arduino) and integrated a Raspberry Pi. Engineered the system using Python for sensor data and motion control.",
      tags: ["IoT", "Python", "Arduino", "Raspberry Pi"],
      icon: Cpu
    }
  ];

  const skills = {
    "Cybersecurity & Forensics": [
      "Incident Response", "Digital Forensics", "SIEM & Log Analysis", 
      "Malware Analysis", "DDoS Mitigation", "IDS/IPS", "Honeypot Deployment"
    ],
    "Networking & Cloud": [
      "Network Security", "OSPF / EIGRP / RIP", "Firewalls (ASA)", 
      "VPN", "AWS / EC2", "Cisco Routers"
    ],
    "Programming & Development": [
      "Python", "C++", "PHP", "JavaScript", "HTML5 / CSS", "MySQL", "Flask"
    ],
    "Tools & Platforms": [
      "NMap", "Metasploit", "FTK / Autopsy", "Splunk", 
      "Linux Admin", "Active Directory"
    ]
  };

  const certifications = [
    "Microsoft Security Essentials Professional Certificate",
    "SIEM: Event Management with Splunk Security",
    "Fortinet Certified Associate in Cybersecurity",
    "Fortinet FortiGate 7.4 Operator",
    "Cisco Network Security",
    "CCNA: Enterprise Networking, Security, and Automation",
    "CCNAv7: Switching, Routing, and Wireless Essentials",
    "CCNA: Introduction to Networks"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-950/80 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Shield className="text-purple-400" size={28} />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DEM
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative transition-colors ${
                    activeSection === item.toLowerCase() 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-purple-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-purple-500/10 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm text-gray-300">Available for Opportunities</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Darrshan Erettai Muniandy
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-purple-300 mb-4 font-semibold">
            Cybersecurity Analyst
          </p>

          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Defending Digital Frontiers | SIEM Operations | Incident Response
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              Get In Touch
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl font-semibold hover:bg-white/10 transition-all hover:scale-105"
            >
              View Projects
            </button>
          </div>

          <div className="flex gap-6 justify-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 transition-all hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 transition-all hover:scale-110">
              <Linkedin size={24} />
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-purple-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Cybersecurity Analyst with proven experience in DDoS monitoring and mitigation, SIEM operations, and incident ticketing workflows. Skilled in detecting and analyzing security events, managing incident response tickets, and supporting remediation efforts.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Strong analytical thinker with a continuous learning mindset, ready to drive organizational resilience and sharpen technical expertise across the cybersecurity spectrum.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                <div className="flex items-start gap-4">
                  <MapPin className="text-purple-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Location</p>
                    <p className="text-white font-semibold">Bandar Putera, Klang, Selangor</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                <div className="flex items-start gap-4">
                  <Mail className="text-purple-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <a href="mailto:darrshan2003@gmail.com" className="text-white font-semibold hover:text-purple-400 transition-colors">
                      darrshan2003@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                <div className="flex items-start gap-4">
                  <Phone className="text-purple-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <a href="tel:+60137123184" className="text-white font-semibold hover:text-purple-400 transition-colors">
                      +60 13-712 3184
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Work Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:shadow-lg hover:shadow-purple-500/20 transition-all group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl group-hover:scale-110 transition-transform">
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-purple-400 font-semibold mb-1">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.period}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-purple-400 mt-1.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:shadow-lg hover:shadow-purple-500/20 transition-all group hover:-translate-y-2"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white flex-1">{project.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items], index) => {
              const icons = [Lock, Network, Code, Terminal];
              const Icon = icons[index];
              return (
                <div
                  key={category}
                  className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="text-purple-400" size={24} />
                    <h3 className="text-lg font-bold text-white">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-purple-500/20 rounded-lg text-sm text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certifications */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-8 text-white flex items-center justify-center gap-3">
              <Award className="text-purple-400" size={32} />
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:scale-105 text-center"
                >
                  <p className="text-sm text-gray-300">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg">
              Let's discuss how I can contribute to your cybersecurity initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="mailto:darrshan2003@gmail.com"
              className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-2 text-center group"
            >
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Mail size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email</h3>
              <p className="text-purple-400">darrshan2003@gmail.com</p>
            </a>

            <a
              href="tel:+60137123184"
              className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-2 text-center group"
            >
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Phone size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
              <p className="text-purple-400">+60 13-712 3184</p>
            </a>

            <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-2 text-center group">
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Location</h3>
              <p className="text-purple-400">Bandar Putera, Klang</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-2">
            © 2025 Darrshan Erettai Muniandy. All rights reserved.
          </p>
          <p className="text-purple-400 italic">
            Securing the digital world, one threat at a time.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;