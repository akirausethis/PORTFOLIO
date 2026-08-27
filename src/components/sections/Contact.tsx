"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Send, CheckCircle2, AlertCircle, Loader2, MessageCircle, Mail } from "lucide-react";
import { SiInstagram, SiGithub } from "@icons-pack/react-simple-icons";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-32 w-full border-t border-border bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Contact Form */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tight text-foreground mb-6">
              Let's build something great together.
            </h2>
            <p className="text-xl text-foreground/70 font-light mb-12 max-w-2xl">
              Have a project in mind or just want to say hi? Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-semibold tracking-[0.1em] text-foreground/50 uppercase mb-3">Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20 text-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-[0.1em] text-foreground/50 uppercase mb-3">Email <span className="text-red-500">*</span></label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20 text-lg" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-[0.1em] text-foreground/50 uppercase mb-3">Subject <span className="text-red-500">*</span></label>
                <input type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20 text-lg" />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-[0.1em] text-foreground/50 uppercase mb-3">Message <span className="text-red-500">*</span></label>
                <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5} className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20 text-lg resize-none" />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center space-x-2 text-red-500 text-sm p-4 bg-red-500/10 rounded-lg">
                    <AlertCircle className="w-4 h-4" /><span>{error}</span>
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center space-x-2 text-green-500 text-sm p-4 bg-green-500/10 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" /><span>Message sent successfully! I'll be in touch soon.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" disabled={isSubmitting || !formData.name || !formData.email || !formData.message} className="group flex items-center justify-center space-x-2 px-8 py-4 w-full md:w-auto bg-foreground text-background rounded-full font-medium tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Send Message</span><Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Side: Direct Links */}
        <div className="lg:col-span-5 lg:pl-16 lg:border-l lg:border-border mt-16 lg:mt-0 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-xs font-semibold tracking-[0.1em] text-foreground/50 uppercase mb-6">Direct Contact</h3>
              <div className="space-y-6">
                <a href="mailto:akirabusinessinq@gmail.com" className="group flex items-center justify-between p-4 border border-border rounded-2xl hover:bg-foreground/[0.02] transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-foreground/5 rounded-full text-foreground"><Mail className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-foreground/60">akirabusinessinq@gmail.com</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-foreground/40 group-hover:text-foreground transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>

                <a href="https://wa.me/6282336007731" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 border border-border rounded-2xl hover:bg-foreground/[0.02] transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-foreground/5 rounded-full text-foreground"><MessageCircle className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium text-foreground">WhatsApp</p>
                      <p className="text-sm text-foreground/60">+62 823-3600-7731</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-foreground/40 group-hover:text-foreground transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.1em] text-foreground/50 uppercase mb-6">Socials</h3>
              <div className="space-y-6">
                <a href="https://instagram.com/vinworkspace" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 border border-border rounded-2xl hover:bg-foreground/[0.02] transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-foreground/5 rounded-full text-foreground"><SiInstagram className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium text-foreground">Instagram</p>
                      <p className="text-sm text-foreground/60">@vinworkspace</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-foreground/40 group-hover:text-foreground transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>

                <a href="https://github.com/akirausethis" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 border border-border rounded-2xl hover:bg-foreground/[0.02] transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-foreground/5 rounded-full text-foreground"><SiGithub className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium text-foreground">GitHub</p>
                      <p className="text-sm text-foreground/60">@akirausethis</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-foreground/40 group-hover:text-foreground transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
