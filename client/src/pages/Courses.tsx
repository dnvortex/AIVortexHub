import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";

const allCourses = [
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
    gradientClass: "from-primary/30 to-secondary/30",
    category: "machine-learning"
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
    gradientClass: "from-accent/30 to-primary/30",
    category: "nlp"
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
    gradientClass: "from-secondary/30 to-accent/30",
    category: "web-development"
  },
  {
    id: 4,
    title: "Computer Vision Applications",
    description: "Build and deploy computer vision applications for object detection, facial recognition, and image classification.",
    level: "Intermediate",
    duration: "10 weeks",
    enrolledCount: 1124,
    rating: 4.6,
    tags: ["Python", "OpenCV", "TensorFlow", "Image Processing"],
    imageUrl: "https://images.unsplash.com/photo-1583207884889-d73594eb2199?auto=format&fit=crop&w=600&h=300",
    gradientClass: "from-primary/30 to-accent/30",
    category: "computer-vision"
  },
  {
    id: 5,
    title: "Natural Language Processing",
    description: "Deep dive into NLP techniques including sentiment analysis, named entity recognition, and text classification.",
    level: "Advanced",
    duration: "14 weeks",
    enrolledCount: 986,
    rating: 4.9,
    tags: ["Python", "NLTK", "SpaCy", "Transformers"],
    imageUrl: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&w=600&h=300",
    gradientClass: "from-accent/30 to-secondary/30",
    category: "nlp"
  },
  {
    id: 6,
    title: "AI for Business Intelligence",
    description: "Learn how to leverage AI for business analytics, predictive modeling, and data-driven decision making.",
    level: "Intermediate",
    duration: "8 weeks",
    enrolledCount: 1567,
    rating: 4.5,
    tags: ["Python", "Pandas", "Power BI", "Business Analytics"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=300",
    gradientClass: "from-secondary/30 to-primary/30",
    category: "business"
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

const categories = [
  { id: "all", name: "All Courses" },
  { id: "machine-learning", name: "Machine Learning" },
  { id: "nlp", name: "Natural Language Processing" },
  { id: "computer-vision", name: "Computer Vision" },
  { id: "web-development", name: "Web Development" },
  { id: "business", name: "Business Applications" }
];

const levels = [
  { id: "all", name: "All Levels" },
  { id: "Beginner", name: "Beginner" },
  { id: "Intermediate", name: "Intermediate" },
  { id: "Advanced", name: "Advanced" }
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

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    const matchesLevel = activeLevel === "all" || course.level === activeLevel;
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

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
              <span className="text-gradient">AI Learning Hub</span>
            </h1>
            <p className="text-xl text-gray-300">
              Master the skills needed to build the future with our comprehensive AI and development courses.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-darkBg-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Filters */}
          <motion.div 
            className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-3">Search Courses</h3>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-darkBg border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                  placeholder="Search by keywords, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeCategory === category.id 
                        ? 'bg-primary text-white' 
                        : 'bg-darkBg text-gray-300 hover:bg-gray-800'
                    } transition-colors`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-3">Experience Level</h3>
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <button
                    key={level.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeLevel === level.id 
                        ? 'bg-primary text-white' 
                        : 'bg-darkBg text-gray-300 hover:bg-gray-800'
                    } transition-colors`}
                    onClick={() => setActiveLevel(level.id)}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <i className="fas fa-search-minus text-4xl text-gray-500 mb-4"></i>
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </motion.div>
          )}
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
              <span className="text-gradient">Start Your AI Journey Today</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get unlimited access to all our courses with a subscription plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <a className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark transition-all duration-300 text-white font-semibold text-lg shadow-lg hover:shadow-primary/40 animate-glow flex items-center gap-2">
                  <span>View Pricing</span>
                  <i className="fas fa-tag"></i>
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
        <Link href="/pricing">
          <a className="w-full py-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary-light transition-all duration-300 flex items-center justify-center gap-2">
            <span>Enroll Now</span>
            <i className="fas fa-arrow-right text-xs"></i>
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export default Courses;
