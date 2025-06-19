import { motion } from "framer-motion";
import { Link } from "wouter";

const courses = [
  {
    id: 1,
    title: "AI Fundamentals",
    description: "Learn the basics of artificial intelligence, machine learning algorithms, and how to implement them in real-world scenarios.",
    level: "Beginner",
    duration: "12 weeks",
    enrolledCount: 2456,
    rating: 4.8,
    tags: ["Python", "TensorFlow", "ML Basics"],
    imageUrl: "https://images.unsplash.com/photo-1677442135056-8bef01b5203a?auto=format&fit=crop&w=600&h=300",
    gradientClass: "from-primary/30 to-secondary/30"
  },
  {
    id: 2,
    title: "Building AI Chatbots",
    description: "Design and develop conversational AI agents that can understand natural language and provide intelligent responses.",
    level: "Intermediate",
    duration: "8 weeks",
    enrolledCount: 1845,
    rating: 4.9,
    tags: ["NLP", "JavaScript", "API Integration"],
    imageUrl: "https://images.unsplash.com/photo-1657426138271-7078ac050236?auto=format&fit=crop&w=600&h=300",
    gradientClass: "from-accent/30 to-primary/30"
  },
  {
    id: 3,
    title: "Full-Stack AI Development",
    description: "Master the integration of AI services with modern web applications using React, Node.js, and cloud-based AI services.",
    level: "Advanced",
    duration: "16 weeks",
    enrolledCount: 1256,
    rating: 4.7,
    tags: ["React", "Node.js", "Firebase", "OpenAI"],
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&h=300",
    gradientClass: "from-secondary/30 to-accent/30"
  }
];

const getLevelBadgeColor = (level: string) => {
  switch (level) {
    case "Beginner": return "bg-primary/80";
    case "Intermediate": return "bg-secondary/80";
    case "Advanced": return "bg-accent/80";
    default: return "bg-primary/80";
  }
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

const CoursesSection = () => {
  return (
    <section id="courses" className="py-20 bg-darkBg-lighter relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold mb-4">
            <span className="text-gradient">AI Learning Hub</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive courses to master AI development, automation, and implementation
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/courses">
            <a className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 inline-flex items-center gap-2">
              <span>View All Courses</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const CourseCard = ({ course }: { course: any }) => {
  return (
    <motion.div 
      variants={item}
      className="card-tilt glass-card rounded-xl overflow-hidden h-full flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={`h-48 bg-gradient-to-r ${course.gradientClass} relative`}>
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-darkBg-card to-transparent">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 ${getLevelBadgeColor(course.level)} text-white text-xs rounded`}>{course.level}</span>
            <span className="text-xs text-gray-300">{course.duration}</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
        <p className="text-gray-300 mb-4">{course.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.map((tag: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-darkBg-card text-gray-300 text-xs rounded">{tag}</span>
          ))}
        </div>
      </div>
      <div className="p-6 pt-0 mt-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <img src={`https://i.pravatar.cc/40?img=${course.id * 3 - 2}`} alt="Student" className="w-8 h-8 rounded-full border-2 border-darkBg-card" />
              <img src={`https://i.pravatar.cc/40?img=${course.id * 3 - 1}`} alt="Student" className="w-8 h-8 rounded-full border-2 border-darkBg-card" />
              <img src={`https://i.pravatar.cc/40?img=${course.id * 3}`} alt="Student" className="w-8 h-8 rounded-full border-2 border-darkBg-card" />
            </div>
            <span className="ml-2 text-xs text-gray-400">+{course.enrolledCount.toLocaleString()} enrolled</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-star text-yellow-500 mr-1 text-xs"></i>
            <span className="text-sm">{course.rating}</span>
          </div>
        </div>
        <Link href="/courses">
          <a className="w-full py-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary-light transition-all duration-300 flex items-center justify-center gap-2">
            <span>Explore Course</span>
            <i className="fas fa-arrow-right text-xs"></i>
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export default CoursesSection;
