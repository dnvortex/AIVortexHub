import { motion } from "framer-motion";
import { Link } from "wouter";
import ParticlesBackground from "../animations/ParticlesBackground";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <motion.div 
          className="max-w-4xl text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-inter font-extrabold tracking-tight">
            <span className="text-gradient">Building the Future with AI</span>
            <span className="block mt-2 text-white">DN VORTEX</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Your partner for AI-powered solutions, custom development, and next-generation technology education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/register">
              <motion.a 
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark transition-all duration-300 text-white font-semibold text-lg shadow-lg hover:shadow-primary/40 animate-glow flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <i className="fas fa-rocket"></i>
              </motion.a>
            </Link>
            
            <Link href="/services">
              <motion.a 
                className="px-8 py-4 rounded-xl border border-secondary text-secondary hover:bg-secondary/10 transition-all duration-300 font-semibold text-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Services</span>
                <i className="fas fa-arrow-right"></i>
              </motion.a>
            </Link>
          </div>
        </motion.div>
        
        {/* 3D Animated Graphic */}
        <motion.div 
          className="mt-16 md:mt-24 relative w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="aspect-video rounded-2xl overflow-hidden glass-card animate-float relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-0"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-slow">
                  <i className="fas fa-brain text-4xl text-white"></i>
                </div>
                <h3 className="mt-6 text-xl font-semibold">AI-Powered Solutions</h3>
                <p className="mt-2 text-sm text-gray-300 max-w-md mx-auto">Experience the future with our advanced AI technologies built for your unique needs</p>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div 
            className="absolute -top-10 -right-8 w-20 h-20 rounded-lg glass-card opacity-80 hidden md:block"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <i className="fas fa-robot text-secondary text-2xl"></i>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-8 -left-10 w-24 h-24 rounded-lg glass-card opacity-80 hidden md:block"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <i className="fas fa-code text-accent text-2xl"></i>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <a href="#services" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
            <span className="text-sm mb-2">Scroll Down</span>
            <i className="fas fa-chevron-down"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
