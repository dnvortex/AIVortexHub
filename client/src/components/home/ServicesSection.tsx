import { motion } from "framer-motion";
import { Link } from "wouter";

const services = [
  {
    id: 1,
    title: "AI Agent & Bot Development",
    description: "Custom AI agents and bots designed to automate tasks, improve customer service, and enhance business operations.",
    price: "Starting at $2,000",
    icon: "robot",
    iconBg: "from-primary to-primary-light"
  },
  {
    id: 2,
    title: "AI-Powered Apps & Websites",
    description: "Full-stack development integrating cutting-edge AI technologies with beautiful, scalable web and mobile applications.",
    price: "Starting at $5,000",
    icon: "mobile-alt",
    iconBg: "from-secondary to-secondary-light"
  },
  {
    id: 3,
    title: "AI Learning Hub",
    description: "Comprehensive courses on AI, machine learning, and automation for individuals and teams looking to upskill.",
    price: "From $20/month",
    icon: "graduation-cap",
    iconBg: "from-accent to-accent-light"
  },
  {
    id: 4,
    title: "Pre-Built AI Templates",
    description: "Ready-to-use AI integrations and templates to jump-start your projects and reduce development time.",
    price: "From $99",
    icon: "copy",
    iconBg: "from-primary-light to-accent"
  },
  {
    id: 5,
    title: "Custom AI Consulting",
    description: "Strategic guidance for businesses looking to implement AI solutions and automate workflows.",
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

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-darkBg-lighter relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold mb-4">
            <span className="text-gradient">What We Offer</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive AI solutions to transform your business and prepare you for the future
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: any }) => {
  return (
    <motion.div 
      className="card-tilt glass-card rounded-xl p-6 h-full flex flex-col relative overflow-hidden group"
      variants={item}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full"></div>
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center mb-6`}>
        <i className={`fas fa-${service.icon} text-white text-2xl`}></i>
      </div>
      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-300 mb-6 flex-grow">{service.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-secondary">{service.price}</span>
        <Link href="/services">
          <a className="text-primary hover:text-primary-light transition flex items-center gap-1 group-hover:translate-x-1 duration-300">
            <span>Learn more</span>
            <i className="fas fa-chevron-right text-xs"></i>
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
