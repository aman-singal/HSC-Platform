"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://codefreeform.com/api/contact-api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "02D490", 
          ...formData,
          subject: `Contact Message from ${formData.name}`,
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

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="bg-layer-light p-8 md:p-12 rounded-[3rem] border border-divider shadow-2xl relative"
          >
            {/* Visual Decoration */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-corporate-blue/5 blur-[100px] rounded-full pointer-events-none" />
            
            <h2 className="text-3xl font-bold text-heading mb-8 tracking-tight">Send a Message</h2>
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-heading mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-4 focus:ring-corporate-blue/10 focus:border-corporate-blue transition-all text-body font-medium" 
                        placeholder="Enter your full name" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-heading mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-4 focus:ring-corporate-blue/10 focus:border-corporate-blue transition-all text-body font-medium" 
                        placeholder="xyz@example.com" 
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-heading mb-2">Your Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-divider bg-white focus:outline-none focus:ring-4 focus:ring-corporate-blue/10 focus:border-corporate-blue transition-all text-body font-medium resize-none" 
                        placeholder="How can we assist you today?"
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-corporate-blue px-8 py-5 font-bold text-white transition-all hover:bg-heading disabled:opacity-70"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? "Sending..." : "Submit Request"}
                          {!isSubmitting && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>}
                        </span>
                      </button>
                    </div>
                  </form>

                  <div className="flex items-center gap-4 before:h-px before:flex-1 before:bg-divider after:h-px after:flex-1 after:bg-divider">
                    <span className="text-sm font-bold text-gray-400">OR</span>
                  </div>

                  <a 
                    href="https://wa.me/919089889090" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-[#25D366]/20 bg-[#25D366]/5 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all font-bold group"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/></svg>
                    Chat on WhatsApp
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-heading mb-4">Message Sent!</h3>
                  <p className="text-body font-medium mb-8">
                    Thank you for reaching out. Our team has received your message and will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-corporate-blue font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
