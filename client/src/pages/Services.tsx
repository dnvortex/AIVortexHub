import { motion } from "framer-motion";
import { Link } from "wouter";

const services = [
  {
    id: 1,
    title: "AI Agent & Bot Development",
    description: "Custom AI agents and bots designed to automate tasks, improve customer service, and enhance business operations.",
    longDescription: "Our team of AI specialists builds custom agents and bots that leverage the latest machine learning models and natural language processing techniques. From simple task automation to complex conversational interfaces, we create intelligent solutions that understand context, learn from interactions, and improve over time.",
    features: [
      "Natural language understanding and generation",
      "Multi-platform deployment (web, mobile, messaging apps)",
      "Integration with existing business systems",
      "Customized training on your domain data",
      "Analytics dashboard for performance tracking"
    ],
    caseStudy: {
      company: "TechCorp Solutions",
      challenge: "Customer support team overwhelmed with repetitive inquiries",
      solution: "AI-powered chatbot handling 80% of common customer questions",
      result: "65% reduction in support ticket volume, 93% customer satisfaction"
    },
    price: "Starting at $2,000",
    icon: "robot",
    iconBg: "from-primary to-primary-light"
  },
  {
    id: 2,
    title: "AI-Powered Apps & Websites",
    description: "Full-stack development integrating cutting-edge AI technologies with beautiful, scalable web and mobile applications.",
    longDescription: "We build end-to-end digital experiences with AI at their core. Our development team creates responsive, intuitive interfaces while seamlessly integrating machine learning capabilities to deliver smart applications that adapt to user behavior, automate complex processes, and provide actionable insights.",
    features: [
      "Full-stack development (React, Node.js, Python)",
      "Cloud-based AI service integration",
      "Custom AI model development and deployment",
      "Responsive design for all devices",
      "Scalable architecture for growth"
    ],
    caseStudy: {
      company: "HealthTrack",
      challenge: "Creating a personalized health monitoring platform",
      solution: "AI-powered web/mobile app with health prediction algorithms",
      result: "250,000+ active users, 88% user retention rate"
    },
    price: "Starting at $5,000",
    icon: "mobile-alt",
    iconBg: "from-secondary to-secondary-light"
  },
  {
    id: 3,
    title: "AI Learning Hub",
    description: "Comprehensive courses on AI, machine learning, and automation for individuals and teams looking to upskill.",
    longDescription: "Our educational platform offers structured learning paths through the complex world of AI and machine learning. From beginner concepts to advanced techniques, our courses combine theoretical knowledge with practical projects to ensure you can apply AI in real-world scenarios.",
    features: [
      "Self-paced video tutorials with transcripts",
      "Hands-on coding exercises and projects",
      "Personal feedback from AI experts",
      "Certificate of completion",
      "Community forum for peer learning"
    ],
    caseStudy: {
      company: "Global Tech Academy",
      challenge: "Upskilling 200 developers in AI technologies",
      solution: "Custom learning tracks with progress monitoring",
      result: "95% course completion rate, 32 new AI projects launched"
    },
    price: "From $20/month",
    icon: "graduation-cap",
    iconBg: "from-accent to-accent-light"
  },
  {
    id: 4,
    title: "Pre-Built AI Templates",
    description: "Ready-to-use AI integrations and templates to jump-start your projects and reduce development time.",
    longDescription: "Our collection of pre-built AI templates helps you accelerate development by providing ready-to-deploy solutions for common use cases. Each template is fully customizable, well-documented, and integrates seamlessly with popular platforms and frameworks.",
    features: [
      "Code repositories with clean, commented code",
      "Deployment instructions for various platforms",
      "Technical documentation and API references",
      "Regular updates with new features",
      "Implementation support"
    ],
    caseStudy: {
      company: "StartupLaunch",
      challenge: "Limited budget and timeline for MVP development",
      solution: "AI recommendation template customized for their platform",
      result: "MVP launched in 3 weeks, $50,000 saved in development costs"
    },
    price: "From $99",
    icon: "copy",
    iconBg: "from-primary-light to-accent"
  },
  {
    id: 5,
    title: "Custom AI Consulting",
    description: "Strategic guidance for businesses looking to implement AI solutions and automate workflows.",
    longDescription: "Our consulting services help businesses identify opportunities for AI implementation, evaluate technology options, and develop strategic roadmaps. We work with your team to assess needs, define success metrics, and create actionable plans that align with your business objectives.",
    features: [
      "AI readiness assessment",
      "Technology evaluation and selection",
      "ROI analysis for AI initiatives",
      "Implementation roadmap development",
      "Staff training and knowledge transfer"
    ],
    caseStudy: {
      company: "Financial Services Inc.",
      challenge: "Identifying AI opportunities across departments",
      solution: "Comprehensive audit and strategic implementation plan",
      result: "6 AI initiatives launched, $1.2M annual cost savings"
    },
    price: "$150/hour",
    icon: "comments",
    iconBg: "from-secondary to-primary"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Services = () => {
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
              <span className="text-gradient">AI Solutions for Every Need</span>
            </h1>
            <p className="text-xl text-gray-300">
              Explore our comprehensive suite of AI services designed to transform your business, automate workflows, and prepare you for the future of technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Detailed Section */}
      <div className="bg-darkBg-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="space-y-32"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {services.map((service, index) => (
              <ServiceDetailCard 
                key={service.id} 
                service={service} 
                isReversed={index % 2 === 1}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-darkBg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-inter font-bold mb-6">
              <span className="text-gradient">Ready to Get Started?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us today to discuss your project or book a free consultation with our AI specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <a className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark transition-all duration-300 text-white font-semibold text-lg shadow-lg hover:shadow-primary/40 animate-glow flex items-center gap-2">
                  <span>Contact Us</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </Link>
              <Link href="/register">
                <a className="px-8 py-4 rounded-xl border border-secondary text-secondary hover:bg-secondary/10 transition-all duration-300 font-semibold text-lg flex items-center gap-2">
                  <span>Sign Up</span>
                  <i className="fas fa-user-plus"></i>
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ServiceDetailCard = ({ service, isReversed }: { service: any, isReversed: boolean }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      variants={item}
    >
      <div className={`${isReversed ? 'lg:order-2' : ''}`}>
        <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center mb-6`}>
          <i className={`fas fa-${service.icon} text-white text-3xl`}></i>
        </div>
        <h2 className="text-3xl font-semibold mb-4">{service.title}</h2>
        <p className="text-gray-300 mb-6">{service.longDescription}</p>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-secondary">Key Features</h3>
          <ul className="space-y-2">
            {service.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <i className="fas fa-check-circle text-secondary mt-1 mr-2"></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact">
            <a className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-white font-medium flex items-center justify-center gap-2">
              <span>Request Quote</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </Link>
          <span className="px-6 py-3 rounded-lg bg-darkBg text-white font-medium flex items-center justify-center">
            {service.price}
          </span>
        </div>
      </div>
      
      <div className={`${isReversed ? 'lg:order-1' : ''}`}>
        <div className="glass-card rounded-xl p-6 h-full">
          <h3 className="text-xl font-semibold mb-6 text-accent">Case Study</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white mb-1">Company</h4>
              <p className="text-gray-300">{service.caseStudy.company}</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Challenge</h4>
              <p className="text-gray-300">{service.caseStudy.challenge}</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Our Solution</h4>
              <p className="text-gray-300">{service.caseStudy.solution}</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Results</h4>
              <p className="text-gray-300">{service.caseStudy.result}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
