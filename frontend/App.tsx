import React, { useState } from 'react';

import { 
  Shield, 
  Monitor, 
  Globe, 
  Mail, 
  Phone, 
  ArrowRight,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { SERVICES, CONTACT } from './constants';
import ServiceCard from './components/ServiceCard';
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  service: "",
  message: ""
});

const [loading, setLoading] = useState(false);
const [status, setStatus] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // 🔑 prevents page reload

  setLoading(true);
  setStatus("");

  try {
    const res = await fetch('https://techshield-backend.onrender.com/api/inquiry', {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to send inquiry");
    }

    setStatus("success");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      service: "",
      message: "",
    });
  } catch (err: any) {
    setStatus(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10"></div>

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
             <div className="absolute inset-0 bg-cyan-400 blur-md opacity-20"></div>
             <div className="bg-gradient-to-tr from-cyan-600 to-emerald-600 p-2 rounded-lg">
               <Shield className="w-8 h-8 text-white" />
             </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">TECHSHIELD</h1>
            <p className="text-[10px] tracking-[0.2em] font-bold text-emerald-400 uppercase -mt-1">Solutions</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-cyan-900/20">
            Get Support
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 pt-16 pb-24 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Reliable IT Partner</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight max-w-4xl mx-auto">
          Reliable IT Services <br />
          <span className="gradient-text">for Your Business</span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          From cybersecurity to custom software, TechShield Solutions provides world-class technology management to keep your business running smoothly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-cyan-50 transition-colors flex items-center justify-center gap-2 group">
            Book a Free Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass-card font-bold rounded-xl flex items-center justify-center gap-2">
            View Case Studies
          </button>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
          <div className="glass-card rounded-3xl p-4 md:p-8 overflow-hidden">
             <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
                <div className="text-left space-y-6">
                   <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-cyan-400" />
                   </div>
                   <h3 className="text-2xl font-bold">Comprehensive Security Monitoring</h3>
                   <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-2 bg-white/10 rounded-full w-full relative overflow-hidden">
                          <div className={`absolute inset-0 bg-cyan-500 rounded-full animate-progress-${i}`} style={{ width: `${60 + i*10}%` }}></div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-32 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          {/* Fixed CheckCircle2 usage by adding it to imports */}
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Node active</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <section id="services" className="container mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black mb-4">Our Expertise</h2>
            <p className="text-slate-400">Tailored IT solutions designed to empower your infrastructure, protect your data, and scale your operations efficiently.</p>
          </div>
          <div className="flex gap-2">
             <button className="p-3 glass-card rounded-full hover:bg-white/10 transition-colors">
               <ChevronRight className="w-6 h-6 rotate-180" />
             </button>
             <button className="p-3 glass-card rounded-full hover:bg-white/10 transition-colors">
               <ChevronRight className="w-6 h-6" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-24">
        <div className="glass-card rounded-[2.5rem] overflow-hidden p-8 md:p-16 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] -z-10 rounded-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Ready to <span className="text-cyan-400">Fortify</span> Your Business?
              </h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-emerald-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us Today</p>
                    {CONTACT.phones.map((phone, i) => (
                      <p key={i} className="text-xl font-bold">{phone}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-cyan-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-xl font-bold">{CONTACT.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-blue-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Official Website</p>
                    <a href={`https://${CONTACT.website}`} target="_blank" rel="noreferrer" className="text-xl font-bold hover:text-cyan-400 transition-colors flex items-center gap-2">
                      {CONTACT.website}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
           <form
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-3xl border-emerald-500/20 shadow-xl space-y-4"
            >

              <h3 className="text-2xl font-bold mb-6">Inquiry Form</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">First Name</label>
                  <input                                                              
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3"
                    placeholder="John"
                  />

                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Last Name</label>
                  <input
                    type="text"                   
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3"
                    placeholder="Doe"
                  />

                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3"
                  placeholder="john@example.com"
                />

              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Requested Service</label>
               <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((s, i) => (
                    <option key={i} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>

              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3"
                  placeholder="Tell us about your project..."
              ></textarea>

              </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Inquiry"}
              <ArrowRight className="w-5 h-5" />
            </button>
            {status && (
            <p className="text-sm text-center text-emerald-400">
                  {status === "success" ? "Message sent successfully!" : status}
                </p>
              )}


            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-60">
            <Shield className="w-8 h-8 text-white" />
            <h1 className="text-xl font-black tracking-tighter text-white uppercase">TechShield Solutions</h1>
          </div>
          <div className="text-slate-500 text-sm">
            © 2024 TechShield Solutions. All rights reserved. Professional IT services for modern business.
          </div>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default App;