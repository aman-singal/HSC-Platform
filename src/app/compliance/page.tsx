"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export default function CompliancePage() {
  const sections = [
    {
      title: "Government Approved RVSF",
      content: "Hindustan Scrap Corporation is an authorized RVSF, licensed to carry out end-of-life vehicle (ELV) scrapping as per government norms. Our facility complies with all regulatory standards required for vehicle dismantling, recycling, legal documentation, and issuance of government-approved certificates.",
      highlight: "Choosing an authorized RVSF ensures your vehicle is scrapped legally and responsibly.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
      )
    },
    {
      title: "Scrappage Policy in India",
      content: "We strictly adhere to the Vehicle Scrappage Policy in India, ensuring a transparent and compliant process through proper deregistration, issuance of Certificate of Vehicle Scrapping (CVS), Certificate of Destruction (CoD), and digital record maintenance as per government systems.",
      highlight: "Our process guarantees complete legal closure of your vehicle.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
      )
    },
    {
      title: "Certificate of Scrapping (CVS)",
      content: "As part of our compliant scrapping process, we provide a Certificate of Vehicle Scrapping (CVS), which confirms your vehicle has been scrapped at an authorized facility and is digitally verifiable. The CVS helps you avail benefits and incentives when purchasing a new vehicle.",
      highlight: "The CVS is an essential document under the vehicle scrappage policy in India.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
      )
    },
    {
      title: "Certificate of Destruction (CoD)",
      content: "We also issue a Certificate of Destruction (CoD) after complete dismantling. This acts as legal proof of permanent vehicle scrapping, ensures the vehicle cannot be reused or resold, and protects you from future liabilities or misuse.",
      highlight: "Guaranteed legal protection and permanent vehicle disposal proof.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      )
    },
    {
      title: "Environmental Responsibility",
      content: "As a compliant vehicle scrapping company, we follow eco-friendly and sustainable practices, including safe disposal of hazardous materials like oil, fuel, and batteries, and recycling of metal and reusable components.",
      highlight: "Supporting a cleaner and greener environment through responsible scrapping.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      )
    },
    {
      title: "Secure Data & Records",
      content: "We maintain complete transparency and security throughout the process, including proper handling of RC and vehicle records, and secure storage of customer data with digitally verified certificates.",
      highlight: "Your data and vehicle records are handled with maximum confidentiality.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-pure-white pt-32 pb-32 overflow-hidden">
      
      {/* Header with improved styling */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-32 relative">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-block px-5 py-2 rounded-full border border-eco-green/30 bg-green-50 text-eco-green text-xs font-black tracking-[0.2em] uppercase mb-12 shadow-sm"
        >
          Government Certified RVSF
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-6xl md:text-8xl font-black text-heading mb-12 tracking-tighter leading-[0.9] mix-blend-darken"
        >
          Compliance. <br/> 
          <span className="text-eco-green">Zero Liability.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl md:text-2xl text-body max-w-4xl mx-auto font-medium leading-relaxed"
        >
          Hindustan Scrap Corporation operates under strict **Vehicle Scrappage Policy** mandates, providing a legal and ecologically safe endpoint for every automobile in India.
        </motion.p>
      </div>

      {/* Main Sections Grid with STYLISH CARDS */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
          >
            <SpotlightCard 
              glowColor="rgba(34, 197, 94, 0.4)" 
              className="h-full flex flex-col group relative bg-white border-divider overflow-hidden rounded-[2.5rem] p-10 hover:shadow-[0_40px_80px_rgba(34,197,94,0.1)] transition-all duration-500"
            >
              {/* Stylish Icon */}
              <div className="w-16 h-16 rounded-[1.5rem] bg-green-50 border border-green-100 flex items-center justify-center text-eco-green mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                {section.icon}
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-heading mb-6 tracking-tight leading-tight group-hover:text-eco-green transition-colors">{section.title}</h2>
              <p className="text-lg text-body mb-8 leading-relaxed font-medium flex-grow">
                {section.content}
              </p>
              
              {section.highlight && (
                <div className="pt-8 border-t border-divider mt-auto relative">
                   {/* Stylish corner decoration */}
                   <div className="absolute top-0 right-0 w-2 h-2 bg-eco-green/20 rounded-full" />
                   
                   <p className="text-eco-green font-black tracking-tight text-sm uppercase leading-tight italic opacity-80">
                      {section.highlight}
                   </p>
                </div>
              )}

              {/* Decorative corner glow */}
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-eco-green/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Bottom Focus Sections - Revised Styling */}
      <div className="max-w-7xl mx-auto px-6 space-y-16 mb-32">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="bg-layer-light/40 p-12 md:p-20 rounded-[4rem] border border-divider shadow-2xl relative overflow-hidden group"
         >
           <div className="absolute top-0 right-0 w-80 h-80 bg-eco-green/5 rounded-full -mr-32 -mt-32 blur-[100px]" />
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-heading mb-10 tracking-tight leading-[1.1]">Safety & Operational Standards.</h2>
                <p className="text-xl text-body font-medium leading-relaxed mb-10 border-l-8 border-eco-green pl-8 bg-white/50 py-6 rounded-r-3xl pr-6">
                  Our facility follows strict industrial safety and operational guidelines, employing the highest tier of trained staff and certified equipment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {["Industrial Safety", "Advanced Machinery", "Certified Staff", "24/7 Monitoring"].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-divider shadow-sm group-hover:border-eco-green/30 hover:scale-105 transition-all">
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-eco-green text-sm shadow-inner shrink-0">✓</div>
                      <span className="text-heading font-black tracking-tight">{item}</span>
                   </div>
                 ))}
              </div>
           </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-heading p-16 md:p-24 rounded-[4rem] text-white shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden border-t-8 border-eco-green"
         >
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-eco-green/10 to-transparent pointer-events-none" />
           
           <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tight leading-tight max-w-2xl">Why Choose an Authorized Facility?</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {[
               "100% legal vehicle scrapping process",
               "Protection from future legal risks",
               "Proper documentation (CVS & CoD)",
               "Environmentally safe disposal",
               "Eligibility for government benefits"
             ].map((benefit, i) => (
               <div key={i} className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-full bg-eco-green text-white flex items-center justify-center text-sm shrink-0 shadow-[0_0_20px_rgba(22,163,74,0.5)] group-hover:scale-125 transition-transform">✓</div>
                  <span className="text-xl md:text-2xl font-bold text-white/90 leading-tight group-hover:text-white transition-colors">{benefit}</span>
               </div>
             ))}
           </div>
         </motion.div>
      </div>

      {/* Footer CTA: Enhanced Stylishness */}
      <div className="max-w-7xl mx-auto px-6 py-24 bg-green-50/30 rounded-[5rem] border border-eco-green/10 text-center relative shadow-inner overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(22,163,74,0.05),_transparent_70%)]" />
         
         <div className="relative z-10 space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-heading tracking-tighter mix-blend-darken">Trusted Services.</h2>
            <p className="text-xl md:text-2xl text-body font-medium max-w-4xl mx-auto leading-relaxed">
               Hindustan Scrap Corporation ensures a hassle-free, compliant, and transparent process from start to finish.
            </p>
            <div className="pt-8 flex flex-col items-center">
               <div className="px-10 py-6 bg-white border-2 border-eco-green rounded-[2.5rem] shadow-[0_20px_40px_rgba(22,163,74,0.1)] hover:shadow-[0_30px_60px_rgba(22,163,74,0.25)] hover:-translate-y-2 cursor-pointer transition-all duration-500">
                  <span className="text-3xl font-black text-eco-green tracking-tight">Contact us today!</span>
               </div>
               <p className="text-heading font-black uppercase tracking-[0.3em] text-xs mt-10 opacity-40">Scrap Responsibly • Scrap Legally</p>
            </div>
         </div>
      </div>

    </div>
  );
}
