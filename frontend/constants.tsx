
import React from 'react';
import { 
  Code, 
  Settings, 
  Network, 
  ShieldCheck, 
  Cloud, 
  Monitor, 
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { ServiceItem, ContactInfo } from './types';

export const SERVICES: ServiceItem[] = [
  {
    title: "Software & Applications",
    description: "Custom digital solutions built to scale with your business needs.",
    icon: <Code className="w-8 h-8 text-cyan-400" />,
    items: [
      "Custom software development",
      "Web & mobile app development",
      "Software installation & maintenance"
    ]
  },
  {
    title: "IT Support",
    description: "Expert troubleshooting and helpdesk services for your hardware and software.",
    icon: <Settings className="w-8 h-8 text-emerald-400" />,
    items: [
      "Computer repair & troubleshooting",
      "Helpdesk & on-site support",
      "Preventive maintenance"
    ]
  },
  {
    title: "Networking",
    description: "Robust infrastructure setup for reliable connectivity and server management.",
    icon: <Network className="w-8 h-8 text-blue-400" />,
    items: [
      "LAN/WAN & Wi-Fi setup",
      "Server installation & management",
      "Network security & monitoring"
    ]
  },
  {
    title: "Cybersecurity",
    description: "Advanced protection layers to safeguard your data and digital assets.",
    icon: <ShieldCheck className="w-8 h-8 text-cyan-500" />,
    items: [
      "Antivirus & firewall protection",
      "Data backup & recovery",
      "Security audits & training"
    ]
  },
  {
    title: "Cloud & Data Services",
    description: "Seamless cloud integration and data continuity planning.",
    icon: <Cloud className="w-8 h-8 text-emerald-500" />,
    items: [
      "Cloud email & storage solutions",
      "Backup & disaster recovery",
      "Business continuity planning"
    ]
  },
  {
    title: "IT Consulting",
    description: "Strategic advice and training to optimize your technological footprint.",
    icon: <Monitor className="w-8 h-8 text-blue-500" />,
    items: [
      "ICT strategy & advisory services",
      "Staff & student ICT training",
      "School & SME ICT solutions"
    ]
  },
  {
    title: "Business Solutions",
    description: "Specialized tools to streamline operations and enhance security.",
    icon: <Briefcase className="w-8 h-8 text-cyan-300" />,
    items: [
      "Domain registration & hosting",
      "POS systems & business software",
      "CCTV installation & security"
    ]
  }
];

export const CONTACT: ContactInfo = {
  website: "www.techshieldsolutions.com",
  email: "info@techshieldsolutions.com",
  phones: ["+254 706 747884", "+254 714 672078"]
};
