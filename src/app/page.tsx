"use client";

import { AuroraHero } from "@/components/home/AuroraHero";
import { CalculatorWidget } from "@/components/home/CalculatorWidget";
import { LottieIcon } from "@/components/ui/LottieIcon";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ShinyButton } from "@/components/ui/ShinyButton";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <AuroraHero />

      <section className="py-24 bg-pure-white border-y border-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-divider">
          {[
            { label: "Government Authorized", sub: "Fully Certified RVSF Facility" },
            { label: "Ecological Guarantee", sub: "Zero-impact material recycling" },
            { label: "Instant Valuation", sub: "Same day seamless bank transfer" },
            { label: "Pan-India Logistics", sub: "Hassle-free doorstep pickup" }
          ].map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={i} 
              className="pt-8 md:pt-0 md:px-6 first:pt-0 first:px-0 text-center md:text-left flex flex-col justify-center"
            >
              <h2 className="text-xl font-bold text-heading tracking-tight mb-2">{item.label}</h2>
              <p className="text-sm font-medium text-body">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-layer-light border-b border-divider overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="max-w-5xl px-6 lg:px-12 mx-auto text-center space-y-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-heading">
            India’s premium vehicle<br />scrapping authority.
          </h2>
          <p className="text-xl leading-relaxed text-body mx-auto max-w-3xl font-medium">
            Hindustan Scrap Corporation transcends traditional scrap yard operations. By combining cutting-edge dismantling technology with strict ecological compliance, we ensure that every end-of-life vehicle is processed securely, sustainably, and profitably for you.
          </p>
          <div className="mt-12 flex justify-center">
            <Link href="/about">
              <ShinyButton 
                variant="outline" 
                className="border-corporate-blue border-2 text-corporate-blue font-black px-14 py-5 hover:bg-corporate-blue hover:text-white transition-all duration-300 shadow-lg"
              >
                Explore Our Story
              </ShinyButton>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-32 max-w-7xl mx-auto px-6 lg:px-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-20 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-heading mb-6">Comprehensive Service Suite</h2>
            <p className="text-lg text-body leading-relaxed">From immediate doorstep pickup to navigating official RC deregistration, our experts map out the entire lifecycle with absolute precision, shielding you from any bureaucratic friction.</p>
          </div>
          <Link href="/services" className="hidden md:inline-flex pr-0 md:pl-8 text-lg hover:translate-x-2 transition-transform text-corporate-blue font-bold tracking-wide">
            View All Services →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Vehicle Scrapping", desc: "Eco-friendly dismantling ensuring over 90% material recovery via state-of-the-art machinery." },
            { title: "RC Deregistration", desc: "We act as your liaison, coordinating directly with regional RTOs to officially cancel your registration." },
            { title: "Certificate of Destruction", desc: "Receive immediate, government-backed proof of legal compliance and total vehicle destruction." },
          ].map((srv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring", bounce: 0.3 }}
              className="h-full"
            >
              <SpotlightCard className="h-full">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-divider flex items-center justify-center mb-8 text-corporate-blue overflow-hidden transition-transform">
                  <LottieIcon 
                    url="" // Pending custom active lottie json URL
                    fallbackSvg={
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    } 
                  />
                </div>
                <h3 className="text-2xl font-bold text-heading mb-4 tracking-tight transition-colors">{srv.title}</h3>
                <p className="text-body leading-relaxed">{srv.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      <CalculatorWidget />

      <section className="py-32 bg-pure-white border-t border-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full border border-corporate-blue/20 bg-blue-50 text-corporate-blue text-sm font-black tracking-widest uppercase mb-6 shadow-sm"
            >
              Common Questions
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-heading">
              Everything you need <br className="hidden md:block" /> to know.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                q: "What documents are required for scrapping?", 
                a: "You primarily need the original Registration Certificate (RC), a photocopy of the owner's ID (Aadhar/PAN), and a signed authorization form. We assist with all paperwork." 
              },
              { 
                q: "Is Hindustan Scrap Corporation government authorized?", 
                a: "Absolutely. We are a fully licensed Registered Vehicle Scrapping Facility (RVSF) operating under the official Indian Vehicle Scrappage Policy." 
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
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full"
              >
                <SpotlightCard className="h-full p-10">
                  <h3 className="text-xl md:text-2xl font-bold text-heading mb-4 tracking-tight group-hover:text-corporate-blue transition-colors">
                    {item.q}
                  </h3>
                  <p className="text-body font-medium leading-relaxed">
                    {item.a}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/faq" className="text-corporate-blue font-bold text-lg hover:underline underline-offset-4 decoration-2">
              View all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-heading text-white text-center relative overflow-hidden border-t-8 border-corporate-blue/20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="max-w-4xl mx-auto px-6 relative z-10 space-y-10"
        >
          <div className="inline-block px-5 py-2 border border-white/20 rounded-full text-sm font-bold tracking-widest text-[#00D6FF] uppercase mb-4">
            The Smart Choice
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Ready to scrap with absolute confidence?
          </h2>
          <p className="text-xl md:text-2xl text-layer-dark/80 font-medium">Join thousands of individuals and enterprise fleets contributing to a cleaner, safer future.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center justify-center pt-8">
             <Link href="/pricing" className="w-full sm:w-auto">
               <ShinyButton variant="primary" className="w-full text-lg px-12 py-5 shadow-[0_0_40px_rgba(0,180,255,0.4)]">Evaluate My Vehicle</ShinyButton>
             </Link>
             <Link href="/contact" className="w-full sm:w-auto">
               <button className="bg-transparent border border-white/30 hover:bg-white/10 hover:text-white hover:scale-105 transition-all duration-300 w-full text-lg px-12 py-5 rounded-full font-semibold">Contact Our Team</button>
             </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
