"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ShinyButton } from "@/components/ui/ShinyButton";
import Link from "next/link";

export default function ServicesPage() {
  const mainServices = [
    {
      title: "ELV Scrapping Services",
      desc: "Complete end-of-life vehicle scrapping for all categories including SUVs, hatchbacks, commercial fleets, and two-wheelers. We handle accident-damaged and unfit vehicles with precision.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      )
    },
    {
      title: "Legal Car Scrapping",
      desc: "Our process is 100% legal and fully compliant with the latest government mandates. We ensure an authorized RVSF operation with comprehensive RTO deregistration support.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
      )
    },
    {
      title: "Free Doorstep Pickup",
      desc: "We provide convenient doorstep vehicle pickup for non-running and accidental vehicles across India, ensuring safe transport to our authorized RVSF facility.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      )
    }
  ];

  const certificates = [
    {
      title: "Certificate of Scrapping (CVS)",
      desc: "Proof of legal scrapping at an authorized government RVSF. Essential for availing scrappage benefits and discounts on your next vehicle purchase.",
      color: "bg-blue-50 text-corporate-blue"
    },
    {
      title: "Certificate of Destruction (CoD)",
      desc: "Legal proof of permanent vehicle destruction. Prevents any future misuse of the vehicle's identity and completes your official records.",
      color: "bg-blue-50 text-corporate-blue"
    }
  ];

  const steps = [
    "Vehicle details submission",
    "Instant valuation quote",
    "Doorstep pickup & Transport",
    "Scrapping at authorized RVSF",
    "Issuance of CoD and CVS"
  ];

  return (
    <div className="min-h-screen bg-pure-white pt-32 pb-32 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-24 relative">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-block px-5 py-2 rounded-full border border-corporate-blue/20 bg-blue-50 text-corporate-blue text-xs font-black tracking-[0.2em] uppercase mb-10 shadow-sm"
        >
          Government Approved RVSF
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-5xl md:text-8xl font-black text-heading mb-10 tracking-tighter leading-[1.1]"
        >
          Professional <br/>
          <span className="text-corporate-blue">Vehicle Scrapping.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl md:text-2xl text-body max-w-4xl mx-auto leading-relaxed font-semibold opacity-80"
        >
          Specializing in legal car scrapping, ELV disposal, and eco-friendly vehicle recycling, ensuring a safe, compliant, and hassle-free experience for every vehicle owner in India.
        </motion.p>
      </div>

      {/* 2. CORE SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {mainServices.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
          >
            <SpotlightCard className="h-full group hover:shadow-2xl transition-all duration-500 rounded-[3rem] p-12 border-divider bg-white">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center text-corporate-blue mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                {service.icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-heading mb-6 tracking-tight leading-tight group-hover:text-corporate-blue transition-colors">
                {service.title}
              </h2>
              <p className="text-lg text-body leading-relaxed font-medium">
                {service.desc}
              </p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* 3. CERTIFICATES SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-corporate-blue p-12 md:p-20 rounded-[4rem] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-16 items-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-[100px]" />
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Legally Secure <br/> Scrapping.</h2>
            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-lg">
              We provide all government-mandated documents, ensuring you are fully protected from future liabilities and ready to avail new vehicle benefits.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 gap-6 w-full">
            {certificates.map((cert, i) => (
              <div key={i} className="bg-white/10 p-10 rounded-[2.5rem] border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all">
                <h3 className="text-2xl font-black mb-4 tracking-tight">{cert.title}</h3>
                <p className="text-white/80 font-medium text-lg leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ECO-FRIENDLY & PRICING SPLIT */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
         <motion.div 
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="bg-layer-light/50 p-12 md:p-16 rounded-[4rem] border border-divider shadow-sm group hover:shadow-xl transition-all duration-500"
         >
           <h3 className="text-3xl font-black text-heading mb-8 tracking-tighter uppercase">Sustainable Recycling</h3>
           <p className="text-xl text-body font-medium leading-relaxed mb-10 border-l-8 border-corporate-blue pl-8">
             Safe disposal of oils, hazardous fluids, and batteries with absolute industrial precision. Every component is segregating to minimize environmental footprint.
           </p>
           <ul className="space-y-4">
             {["Fluid Extraction", "Metal Recycling", "Component Salvage"].map((item, i) => (
               <li key={i} className="flex items-center gap-4 text-heading font-bold text-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-corporate-blue text-sm">✓</div>
                  {item}
               </li>
             ))}
           </ul>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="bg-white p-12 md:p-16 rounded-[4rem] border-divider border-2 shadow-2xl relative overflow-hidden"
         >
           <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 blur-[80px] rounded-full" />
           <h3 className="text-3xl font-black text-heading mb-8 tracking-tighter uppercase">Best Scrap Value</h3>
           <p className="text-xl text-body font-medium leading-relaxed mb-10">
             Get the highest market valuation for your car. Our transparent appraisal ensures you get secure, instant payments and the best scrap car price in India.
           </p>
           <Link href="/pricing">
             <ShinyButton variant="primary" className="px-10 py-5 text-lg w-full sm:w-auto shadow-[0_20px_40px_rgba(0,80,255,0.2)]">Get Assessment</ShinyButton>
           </Link>
         </motion.div>
      </div>

      {/* 5. PROCESS TIMELINE */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-black text-heading tracking-tight mb-6">How to Scrap Your Car.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[40px] left-[50px] right-[50px] h-[2px] bg-divider z-0" />
          
          {steps.map((step, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="relative z-10 flex flex-col items-center text-center space-y-6 group"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-white border-2 border-corporate-blue text-corporate-blue font-black text-2xl flex items-center justify-center shadow-lg group-hover:bg-corporate-blue group-hover:text-white transition-all duration-300">
                {i + 1}
              </div>
              <p className="text-heading font-black tracking-tight text-lg max-w-[150px]">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. WHY CHOOSE & FOOTER CTA */}
      <div className="max-w-5xl mx-auto px-6 text-center space-y-16">
         <div className="p-12 md:p-20 bg-warm-white border border-divider rounded-[4rem] shadow-sm">
            <h2 className="text-3xl md:text-5xl font-black text-heading mb-12 tracking-tight">Why Choose Hindustan Scrap?</h2>
            <div className="flex flex-wrap justify-center gap-6">
               {["Authorized RVSF", "Expert Scrappers", "Doorstep Pickup", "Full Compliance", "Fast Certificates"].map((item, i) => (
                 <div key={i} className="px-8 py-4 bg-white border border-divider rounded-full font-bold text-heading text-lg shadow-sm hover:border-corporate-blue hover:text-corporate-blue transition-all cursor-default">
                   {item}
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-heading tracking-tighter leading-tight">Scrap Legally Near You.</h2>
            <p className="text-xl text-body font-medium max-w-3xl mx-auto">
               Hindustan Scrap Corporation offers a quick, legal, and reliable solution for scrapping your old vehicle across India.
            </p>
            <div className="pt-8">
               <Link href="/contact">
                  <div className="inline-block px-12 py-7 bg-corporate-blue text-white rounded-[3rem] font-black text-2xl shadow-[0_30px_60px_rgba(0,80,255,0.2)] hover:shadow-[0_40px_80px_rgba(0,80,255,0.4)] hover:-translate-y-2 transition-all cursor-pointer">
                    Contact Us Today
                  </div>
               </Link>
            </div>
            <p className="text-heading font-black uppercase tracking-[0.4em] text-xs opacity-30 mt-12">Authorized RVSF • Zero Resale Liability • Instant Payout</p>
         </div>
      </div>

    </div>
  );
}
