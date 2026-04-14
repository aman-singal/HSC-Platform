"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    
    try {
      // API endpoints usually require the access_key in the body for AJAX submissions
      const response = await fetch("https://codefreeform.com/api/contact-api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "02D490", // Provided key
          email: "hindustanscrapcorporation@gmail.com", // System recipient
          message: "New Vehicle Evaluation Request", // Required field
          ...formData, // Custom fields
          subject: `Evaluation Request: ${formData.model} (${formData.year})`, 
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(`Submission failed: ${error.message || "Please try again later."}`);
    } finally {
      setIsSubmitting(false);
    }
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
                  <label htmlFor="name" className="text-sm font-bold text-heading uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-heading uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    required
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXX XXXX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-bold text-heading uppercase tracking-widest ml-1">State</label>
                  <input
                    required
                    id="state"
                    name="state"
                    type="text"
                    placeholder="e.g. Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-bold text-heading uppercase tracking-widest ml-1">City</label>
                  <input
                    required
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="model" className="text-sm font-bold text-heading uppercase tracking-widest ml-1">Vehicle Model</label>
                  <input
                    required
                    id="model"
                    name="model"
                    type="text"
                    placeholder="e.g. Maruti Suzuki Swift"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-bold text-heading uppercase tracking-widest ml-1">Manufacturing Year</label>
                  <input
                    required
                    id="year"
                    name="year"
                    type="number"
                    placeholder="YYYY"
                    min="1950"
                    max="2026"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all text-heading font-medium"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-corporate-blue px-8 py-5 font-bold text-white transition-all hover:bg-heading shadow-[0_0_30px_rgba(0,80,255,0.3)] disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? "Processing..." : "Submit Evaluation Request"}
                    {!isSubmitting && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>}
                  </span>
                </button>
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
                Thank you, <span className="text-corporate-blue font-bold">{formData.name}</span>. Your vehicle details have been received. Our experts will contact you within 24 hours.
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
