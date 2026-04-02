"use client";

import { motion } from "framer-motion";
import { ShinyButton } from "@/components/ui/ShinyButton";

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Our Facility",
      details: "Hindustan Scrap Corporation,\nKhatoni No 42-43, Bhupnia,\nBahadurgarh, Haryana - 124507",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      ),
      link: "https://www.google.com/maps/place/HINDUSTAN+SCRAP+CORPORATION/data=!4m2!3m1!1s0x0:0x25e66681cd7e4be0?sa=X&ved=1t:2428&ictx=111",
      linkText: "View on Google Maps"
    },
    {
      title: "Communication",
      details: "Phone: +91 90898 89090\nEmail: hindustanscrapcorporation@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
      ),
      link: "tel:+919089889090",
      linkText: "Call Now"
    }
  ];

  return (
    <div className="min-h-screen bg-pure-white pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column: Title & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-heading tracking-tighter leading-[0.9] mb-8">
              Connect <br/>with us.
            </h1>
            <p className="text-xl text-body font-medium max-w-md mb-12 leading-relaxed">
              Have questions about the legal scrapping process? Our experts are standing by to guide you through every step.
            </p>

            <div className="space-y-12">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-corporate-blue shrink-0">
                    {info.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-heading tracking-tight">{info.title}</h3>
                    <p className="text-lg text-body whitespace-pre-line leading-relaxed font-medium">
                      {info.details}
                    </p>
                    <a 
                      href={info.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-corporate-blue font-bold hover:gap-3 transition-all gap-2 underline underline-offset-8"
                    >
                      {info.linkText} <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Mini Form / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="bg-layer-light p-8 md:p-12 rounded-[3rem] border border-divider shadow-2xl relative"
          >
            {/* Visual Decoration */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-corporate-blue/5 blur-[100px] rounded-full pointer-events-none" />
            
            <h2 className="text-3xl font-bold text-heading mb-8 tracking-tight">Need Immediate Assistance?</h2>
            
            <div className="space-y-6">
              <a 
                href="https://wa.me/919089889090" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-6 bg-white border border-divider rounded-3xl group hover:border-[#25D366]/30 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/></svg>
                </div>
                <div>
                  <p className="text-heading font-black text-xl">WhatsApp Chat</p>
                  <p className="text-body font-medium">Instant reply during work hours</p>
                </div>
              </a>

              <div className="p-8 border border-divider border-dashed rounded-3xl bg-white/50">
                <p className="text-heading font-bold mb-4">Official Hours</p>
                <div className="flex justify-between items-center text-body font-medium">
                  <span>Mon — Sat</span>
                  <span className="text-corporate-blue font-bold">10:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-body font-medium mt-2">
                  <span>Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>

              <div className="pt-6">
                <ShinyButton variant="primary" className="w-full py-5 text-lg shadow-[0_0_40px_rgba(0,80,255,0.2)]">
                  Message Team Now
                </ShinyButton>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
