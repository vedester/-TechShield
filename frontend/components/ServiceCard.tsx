
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col h-full group">
      <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl group-hover:bg-cyan-500/10 transition-colors">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-100">{service.title}</h3>
      <p className="text-slate-400 text-sm mb-6 flex-grow">{service.description}</p>
      <div className="space-y-3">
        {service.items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
