import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormData = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/messages", data);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 bg-darkBg relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              className="glass-card rounded-xl p-8 order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-inter font-bold mb-6">
                <span className="text-gradient">Get in Touch</span>
              </h2>
              <p className="text-gray-300 mb-4">
                Have questions about our services or want to discuss a custom solution? Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <p className="text-gray-400 mb-8 text-sm">
                <i className="fas fa-info-circle mr-2"></i>
                All messages are forwarded to dnvortexai@gmail.com and 0638225148.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      className={`w-full bg-darkBg border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="Your name"
                      {...register("name")}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full bg-darkBg border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="your.email@example.com"
                      {...register("email")}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <select 
                    id="subject" 
                    className={`w-full bg-darkBg border ${errors.subject ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    defaultValue=""
                    {...register("subject")}
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="ai-development">AI Development</option>
                    <option value="website-development">Website Development</option>
                    <option value="course-inquiry">Course Inquiry</option>
                    <option value="consulting">AI Consulting</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className={`w-full bg-darkBg border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Tell us about your project or question..."
                    {...register("message")}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-white font-medium flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span>Sending...</span>
                      <i className="fas fa-spinner fa-spin"></i>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-inter font-bold mb-6">
                <span className="text-gradient">Contact DN VORTEX</span>
              </h2>
              <p className="text-gray-300 mb-8">
                We're here to help you harness the power of AI for your business. Let's build something amazing together.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mr-4">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Our Location</h3>
                    <p className="text-gray-400">253 Albany Rd, Pelham, Pietermaritzburg, 3201</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mr-4">
                    <i className="fas fa-envelope text-secondary"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email Us</h3>
                    <p className="text-gray-400">dnvortexai@gmail.com</p>
                    <p className="text-gray-400">0638225148</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mr-4">
                    <i className="fas fa-phone-alt text-accent"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Call Us</h3>
                    <p className="text-gray-400">0638225148</p>
                    <p className="text-gray-400">Mon-Fri, 9am-6pm SAST</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div>
                <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <SocialIcon icon="twitter" />
                  <SocialIcon icon="linkedin-in" />
                  <SocialIcon icon="github" />
                  <SocialIcon icon="youtube" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({ icon }: { icon: string }) => {
  return (
    <motion.a 
      href="#" 
      className="w-10 h-10 rounded-full bg-darkBg-lighter border border-gray-700 flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-colors"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <i className={`fab fa-${icon} text-white`}></i>
    </motion.a>
  );
};

export default ContactSection;
