import { motion } from "framer-motion";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const basicPlan = {
  name: "Basic Access",
  price: {
    monthly: "$20",
    annually: "$200"
  },
  per: {
    monthly: "/month",
    annually: "/year"
  },
  saving: "Save $40",
  features: [
    { text: "Access to beginner AI courses", included: true },
    { text: "Basic AI project templates", included: true },
    { text: "Community forum access", included: true },
    { text: "Monthly Q&A sessions", included: true },
    { text: "Advanced AI courses", included: false },
    { text: "Premium AI templates", included: false },
    { text: "1-on-1 coaching", included: false },
    { text: "Project code reviews", included: false }
  ],
  popular: false,
  ctaText: "Get Started",
  ctaLink: "/register"
};

const premiumPlan = {
  name: "Premium Access",
  price: {
    monthly: "$50",
    annually: "$500"
  },
  per: {
    monthly: "/month",
    annually: "/year"
  },
  saving: "Save $100",
  features: [
    { text: "All Basic features", included: true },
    { text: "Full AI course library", included: true },
    { text: "All AI templates", included: true },
    { text: "Weekly coaching calls", included: true },
    { text: "Priority support", included: true },
    { text: "Project feedback", included: true },
    { text: "Certificate of completion", included: true },
    { text: "Private Discord channel", included: true }
  ],
  popular: true,
  ctaText: "Get Started",
  ctaLink: "/register"
};

const enterprisePlan = {
  name: "Enterprise Package",
  price: {
    monthly: "Custom",
    annually: "Custom"
  },
  per: {
    monthly: "pricing",
    annually: "pricing"
  },
  saving: "Contact us",
  features: [
    { text: "All Premium features", included: true },
    { text: "Full app/AI bot development", included: true },
    { text: "Dedicated account manager", included: true },
    { text: "Custom AI model training", included: true },
    { text: "Enterprise-grade security", included: true },
    { text: "White-label solutions", included: true },
    { text: "Team training workshops", included: true },
    { text: "24/7 priority support", included: true }
  ],
  popular: false,
  ctaText: "Contact Us",
  ctaLink: "/contact"
};

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

const faqs = [
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can change your subscription plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee for all subscription plans. If you're not satisfied with our services, contact us within 14 days of payment for a full refund."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers."
  },
  {
    question: "Is there a contract or minimum commitment?",
    answer: "No, our monthly plans have no minimum commitment and you can cancel anytime. Annual plans provide a discount but are paid upfront for the year."
  },
  {
    question: "Can I try before I buy?",
    answer: "We offer free preview lessons from several courses to give you a sense of our teaching style and content quality. Register for a free account to access these preview materials."
  },
  {
    question: "What's included in the Enterprise package?",
    answer: "Enterprise packages are custom-tailored to your organization's needs and may include dedicated support, custom development work, private courses for your team, and organization-wide access to our platform. Contact us for a personalized quote."
  }
];

const Pricing = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-darkBg relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-inter font-bold mb-6">
              <span className="text-gradient">Simple, Transparent Pricing</span>
            </h1>
            <p className="text-xl text-gray-300">
              Choose the plan that's right for you, from individual learning to enterprise solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-darkBg-lighter relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="monthly" className="w-full max-w-3xl mx-auto mb-10">
            <TabsList className="grid w-[400px] max-w-full grid-cols-2 mx-auto bg-darkBg">
              <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
              <TabsTrigger value="annually">Annual Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="mt-10">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <PricingCard key="basic-monthly" plan={basicPlan} billingCycle="monthly" />
                <PricingCard key="premium-monthly" plan={premiumPlan} billingCycle="monthly" />
                <PricingCard key="enterprise-monthly" plan={enterprisePlan} billingCycle="monthly" />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="annually" className="mt-10">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <PricingCard key="basic-annually" plan={basicPlan} billingCycle="annually" showSavings={true} />
                <PricingCard key="premium-annually" plan={premiumPlan} billingCycle="annually" showSavings={true} />
                <PricingCard key="enterprise-annually" plan={enterprisePlan} billingCycle="annually" showSavings={false} />
              </motion.div>
            </TabsContent>
          </Tabs>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
      </div>

      {/* FAQ Section */}
      <div className="bg-darkBg py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-inter font-bold mb-10 text-center">
              <span className="text-gradient">Frequently Asked Questions</span>
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  className="glass-card rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">Have more questions?</p>
              <Link href="/contact">
                <a className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 inline-flex items-center gap-2">
                  <span>Contact Support</span>
                  <i className="fas fa-headset"></i>
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({ 
  plan, 
  billingCycle, 
  showSavings = false 
}: { 
  plan: any;
  billingCycle: "monthly" | "annually";
  showSavings?: boolean;
}) => {
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
      <div className="mb-2">
        <span className="text-3xl font-bold">{plan.price[billingCycle]}</span>
        <span className="text-gray-400">{plan.per[billingCycle]}</span>
      </div>
      
      {showSavings && (
        <div className="mb-6">
          <span className="inline-block bg-green-800/30 text-green-400 text-xs px-2 py-1 rounded">
            {plan.saving}
          </span>
        </div>
      )}
      
      {!showSavings && (
        <div className="mb-6 h-6"></div>
      )}
      
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

export default Pricing;
