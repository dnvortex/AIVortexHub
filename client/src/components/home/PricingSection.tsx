import { motion } from "framer-motion";
import { Link } from "wouter";

const plans = [
  {
    name: "Basic Access",
    price: "$20",
    per: "/month",
    features: [
      { text: "Access to beginner AI courses", included: true },
      { text: "Basic AI project templates", included: true },
      { text: "Community forum access", included: true },
      { text: "Monthly Q&A sessions", included: true },
      { text: "Advanced AI courses", included: false },
      { text: "Premium AI templates", included: false },
    ],
    popular: false,
    ctaText: "Get Started",
    ctaLink: "/register"
  },
  {
    name: "Premium Access",
    price: "$50",
    per: "/month",
    features: [
      { text: "All Basic features", included: true },
      { text: "Full AI course library", included: true },
      { text: "All AI templates", included: true },
      { text: "Weekly coaching calls", included: true },
      { text: "Priority support", included: true },
      { text: "Project feedback", included: true },
    ],
    popular: true,
    ctaText: "Get Started",
    ctaLink: "/register"
  },
  {
    name: "Enterprise Package",
    price: "Custom",
    per: "pricing",
    features: [
      { text: "All Premium features", included: true },
      { text: "Full app/AI bot development", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom AI model training", included: true },
      { text: "Enterprise-grade security", included: true },
      { text: "White-label solutions", included: true },
    ],
    popular: false,
    ctaText: "Contact Us",
    ctaLink: "/contact"
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

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-darkBg relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold mb-4">
            <span className="text-gradient">Pricing & Subscription Plans</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Flexible options tailored to your needs, from individual learning to enterprise-level development
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-4">Not sure which plan is right for you?</p>
          <Link href="/contact">
            <a className="text-secondary hover:text-secondary-light transition inline-flex items-center gap-1">
              <span>Schedule a consultation</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const PricingCard = ({ plan }: { plan: any }) => {
  return (
    <motion.div 
      variants={item}
      className={`glass-card rounded-xl p-6 relative overflow-hidden card-tilt flex flex-col
      ${plan.popular 
        ? 'border-2 border-primary transform scale-105 z-10' 
        : 'border border-gray-700 hover:border-primary/50 transition-colors duration-300'}`}
    >
      {plan.popular && (
        <div className="absolute -top-5 -right-5 bg-primary text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
          POPULAR
        </div>
      )}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full"></div>
      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">{plan.price}</span>
        <span className="text-gray-400">{plan.per}</span>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature: any, index: number) => (
          <li key={index} className="flex items-start">
            {feature.included ? (
              <>
                <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                <span>{feature.text}</span>
              </>
            ) : (
              <>
                <i className="fas fa-times text-gray-500 mt-1 mr-2"></i>
                <span className="text-gray-500">{feature.text}</span>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4">
        <Link href={plan.ctaLink} className={`w-full py-3 rounded-lg block text-center font-semibold
            ${plan.popular 
              ? 'bg-primary hover:bg-primary-dark text-white transition-all duration-300 shadow-lg shadow-primary/25' 
              : 'bg-darkBg-card hover:bg-primary/90 border border-primary text-white transition-all duration-300'}`}>
          {plan.ctaText}
        </Link>
      </div>
    </motion.div>
  );
};

export default PricingSection;
