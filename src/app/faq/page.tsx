"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export default function FAQPage() {
  const faqs = [
    { 
      q: "What documents are required for scrapping?", 
      a: "You primarily need the original Registration Certificate (RC), a photocopy of the owner's ID (Aadhar/PAN), and a signed authorization form. We assist with all paperwork." 
    },
    { 
      q: "Is Hindustan Scrap Corporation government authorized?", 
      a: "Absolutely. We are a fully licensed Registered Vehicle Scrapping Facility (RVSF) operating under the official Indian Vehicle Scrappage Policy." 
    },
    { 
      q: "How long does the entire process take?", 
      a: "The physical inspection and pickup take less than 24 hours. The official deregistration through the RTO typically takes 3-4 weeks, during which we provide you with all necessary legal proof." 
    },
    { 
      q: "How do I get the 'Certificate of Deposit' (CD)?", 
      a: "Once your vehicle is scrapped at our RVSF, we issue a digital Certificate of Deposit. You can use this to get up to 25% road tax concession and registration fee waivers on your new vehicle." 
    },
    { 
      q: "Can I scrap a vehicle with an active loan?", 
      a: "To scrap a vehicle under hypothecation, you must first obtain a No Objection Certificate (NOC) from the bank/financier confirming the loan is cleared." 
    },
    { 
      q: "When will I receive the final payment?", 
      a: "We offer instant bank transfers. Once our experts inspect the vehicle at your doorstep and confirm the details, the amount is credited to your account immediately." 
    },
    { 
      q: "What happens to the hazardous materials?", 
      a: "We follow deep-green industrial standards. All oils, fuels, batteries, and gases are safely extracted and neutralized in our depollution unit before the metal is crushed." 
    },
    { 
      q: "Do I need to come to the facility?", 
      a: "No, we provide free doorstep pickup services. Our team will visit your location to inspect, pay, and tow the vehicle to our authorized RVSF." 
    }
  ];

  return (
    <div className="min-h-screen bg-pure-white pt-32 pb-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-block px-4 py-1.5 rounded-full border border-corporate-blue/20 bg-blue-50 text-corporate-blue text-sm font-black tracking-widest uppercase mb-10 shadow-sm"
        >
          Support & Guidance
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black text-heading mb-10 tracking-tight leading-tight">
          Answers to <br/> Common Questions.
        </h1>
        <p className="text-xl text-body max-w-2xl mx-auto font-medium leading-relaxed">
          Everything you need to know about scrapping your vehicle legally, safely, and profitably in India.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 gap-6">
        {faqs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <SpotlightCard className="p-8 md:p-12">
              <h3 className="text-xl md:text-2xl font-black text-heading mb-4 tracking-tight group-hover:text-corporate-blue transition-colors">
                {item.q}
              </h3>
              <p className="text-lg text-body font-medium leading-relaxed">
                {item.a}
              </p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-body font-medium mb-8">Still have questions?</p>
        <div className="flex justify-center gap-4">
          <a href="mailto:hindustanscrapcorporation@gmail.com" className="px-8 py-4 bg-corporate-blue text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            Email Support
          </a>
          <a href="tel:+919315573237" className="px-8 py-4 border border-divider text-heading rounded-full font-bold hover:bg-layer-light transition-all">
            Call Our Team
          </a>
        </div>
      </div>
    </div>
  );
}
