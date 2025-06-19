import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ContactSection from "@/components/home/ContactSection";

const ContactPage = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-darkBg relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-inter font-bold mb-6">
              <span className="text-gradient">Let's Connect</span>
            </h1>
            <p className="text-xl text-gray-300">
              Have questions, ideas, or ready to start your next project? We're here to help.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <ContactSection />

      {/* Map Section */}
      <div className="py-20 bg-darkBg-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="text-gradient">Visit Our Office</span>
            </h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="aspect-video w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3461.4551730638774!2d30.367835015114194!3d-29.823155081947695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6a25083bfc2e1%3A0x8a8a86518df03e72!2s253%20Albany%20Rd%2C%20Pelham%2C%20Pietermaritzburg%2C%203201%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1650538251407!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DN VORTEX Office Location"
                ></iframe>
              </div>
              <div className="p-6 bg-darkBg/80">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">DN VORTEX AI Solutions</h3>
                    <p className="text-gray-300">253 Albany Rd, Pelham, Pietermaritzburg, 3201</p>
                    <p className="text-gray-300 mt-1">Contact: 0638225148</p>
                  </div>
                  <div className="flex gap-4">
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary-light transition-all duration-300 flex items-center gap-2">
                      <i className="fas fa-directions"></i>
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
