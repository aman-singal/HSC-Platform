"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShinyButton } from "@/components/ui/ShinyButton";

export default function PricingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    state: "",
    city: "",
    model: "",
    year: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log for simulation
    console.log("Submitting to hindustanscrapcorporation@gmail.com:", formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-pure-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-10 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-heading mb-4 md:mb-6 tracking-tight">
            Evaluate Your Vehicle
          </h1>
          <p className="text-base sm:text-lg text-body font-medium max-w-2xl mx-auto px-4 md:px-0">
            Provide your details below to receive a premium valuation and legal scrapping roadmap for your automobile.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="bg-layer-light p-8 md:p-12 rounded-[2.5rem] border border-divider shadow-xl space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-heading uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-heading uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 XXXX XXXX XX"
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-heading uppercase tracking-widest ml-1">State</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Maharashtra"
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-heading uppercase tracking-widest ml-1">City</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter city"
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-heading uppercase tracking-widest ml-1">Vehicle Model</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Maruti Suzuki Swift"
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-heading uppercase tracking-widest ml-1">Manufacturing Year</label>
                  <input
                    required
                    type="number"
                    placeholder="YYYY"
                    min="1950"
                    max="2026"
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4">
                <ShinyButton variant="primary" className="w-full text-lg py-5 shadow-[0_0_30px_rgba(0,80,255,0.3)]">
                  Submit Evaluation Request
                </ShinyButton>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 p-12 rounded-[2.5rem] text-center shadow-lg"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
              </div>
              <h2 className="text-3xl font-black text-heading mb-4">Request Sent Successfully</h2>
              <p className="text-lg text-body font-medium max-w-md mx-auto">
                Thank you, <span className="text-corporate-blue font-bold">{formData.name}</span>. Your request has been sent to hindustanscrapcorporation@gmail.com. Our experts will contact you within 24 hours.
              </p>
              <div className="mt-10">
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-corporate-blue font-bold hover:underline"
                >
                  Send another request
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
