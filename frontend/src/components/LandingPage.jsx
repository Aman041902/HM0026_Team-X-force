import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import mlimg from "../assets/ML.jpg";
import calculus from "../assets/Calculus.jpg";
import ancient from "../assets/Ancient.jpg";
import climate from "../assets/climate.jpg";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Trophy,
  Video,
  BookOpen,
  User,
  LogIn,
  UserPlus,
  Mail,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "./LandingPage.css";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

const LandingPage = () => {
  const [selectedRole, setSelectedRole] = useState("student");
  const [activeIndex, setActiveIndex] = useState(null);

  const roleContent = {
    student: {
      title: "Empower Your Learning Journey",
      description: "As a student, you'll get access to:",
      features: [
        {
          title: "Personalized Learning Path",
          description: "Custom curriculum tailored to your goals and pace",
          icon: "📚",
        },
        {
          title: "Interactive Assessments",
          description: "Real-time feedback and progress tracking",
          icon: "✍️",
        },
        {
          title: "Peer Learning",
          description: "Connect with fellow students and form study groups",
          icon: "👥",
        },
        {
          title: "Practice Resources",
          description: "Access to quizzes, assignments, and study materials",
          icon: "📝",
        },
      ],
    },
    teacher: {
      title: "Transform Your Teaching Impact",
      description: "As a teacher, you'll be able to:",
      features: [
        {
          title: "Course Creation Tools",
          description: "Easy-to-use platform to create engaging content",
          icon: "🎯",
        },
        {
          title: "Student Analytics",
          description: "Track student progress and engagement metrics",
          icon: "📊",
        },
        {
          title: "Live Sessions",
          description: "Host interactive classes and workshops",
          icon: "🎥",
        },
        {
          title: "Resource Library",
          description: "Share materials and collaborate with other educators",
          icon: "📚",
        },
      ],
    },
  };

  const advantages = [
    {
      id: 1,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals and experienced educators",
      icon: "👨‍🏫",
    },
    {
      id: 2,
      title: "Interactive Learning",
      description: "Engage with dynamic content and real-time assessments",
      icon: "🎯",
    },
    {
      id: 3,
      title: "Flexible Schedule",
      description: "Study at your own pace, anywhere, anytime",
      icon: "⏰",
    },
    {
      id: 4,
      title: "Certified Courses",
      description: "Earn recognized certificates upon completion",
      icon: "🎓",
    },
  ];

  const topStudents = [
    { id: 1, name: "Aman Jain", points: 2840, badges: 12 },
    { id: 2, name: "Onkar Jondhale", points: 2715, badges: 10 },
    { id: 3, name: "Brijmohan Gour", points: 2690, badges: 11 },
  ];
  const faqData = [
    {
      question: "How do I create an account?",
      answer:
        "Creating an account is simple! Click the 'Register' button at the top of the page, fill in your basic information, and verify your email address. Once verified, you'll have immediate access to our free resources. Premium content requires a subscription, which you can add to your account at any time.",
    },
    {
      question: "What types of courses do you offer?",
      answer:
        "We offer a wide range of courses across multiple disciplines including Mathematics, Science, Language Arts, Programming, Art, Music, and more. Our courses are designed for various age groups and skill levels, from elementary to advanced college-level material. Each course includes video lessons, interactive exercises, assessments, and downloadable resources.",
    },
    {
      question: "How much does a subscription cost?",
      answer:
        "We offer several subscription tiers to meet different needs. Our Basic plan starts at $9.99/month and includes access to core subjects. The Premium plan at $19.99/month provides access to all courses and resources. We also offer Family plans ($29.99/month for up to 5 users) and School/Institution plans with custom pricing based on the number of students.",
    },
    {
      question: "Can I download content for offline learning?",
      answer:
        "Yes! Premium subscribers can download video lessons, worksheets, and other learning materials for offline use. This feature is particularly useful for students who may not always have reliable internet access. Downloaded content will remain accessible through our app for as long as your subscription is active.",
    },
    {
      question: "Do you offer certificates of completion?",
      answer:
        "Yes, we provide certificates of completion for all our courses. These certificates can be downloaded, printed, or shared directly to your LinkedIn profile or other social media platforms. For certain specialized courses, we also offer accredited certificates that may qualify for continuing education credits, depending on your institution or organization.",
    },
    {
      question:
        "How can teachers integrate your platform into their classroom?",
      answer:
        "Teachers can create a classroom account that allows them to assign specific lessons or courses to students, track progress, review completed assignments, and generate performance reports. Our platform integrates with popular learning management systems (LMS) like Google Classroom, Canvas, and Schoology. We also provide lesson plans and teaching guides to help incorporate our content into existing curricula.",
    },
  ];
  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  useEffect(() => {
    // Add scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all animated sections
    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Update the header section */}
      <Navbar></Navbar>

      {/* Add padding to the top of your content to account for fixed header */}
      <div className="pt-20">
        {/* Hero Section with fixed title and enhanced content hover effects */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            {/* Main Title with proper visibility */}
            <h1
              className="text-5xl font-extrabold sm:text-6xl lg:text-7xl mb-6
              relative z-10 inline-block
              bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600
              bg-clip-text text-transparent
              hover:scale-105 transition-all duration-300
              p-3"
            >
              Learn Anything, Anytime
            </h1>

            {/* Subtitle with hover effect */}
            <p
              className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 
              hover:text-indigo-600 transition-colors duration-300
              transform hover:-translate-y-1 cursor-pointer
              animate-fade-in"
            >
              Access thousands of educational videos and resources to enhance
              your learning journey.
            </p>
          </div>

          {/* Role Selection with enhanced hover effects */}
          <div className="max-w-4xl mx-auto mb-12">
            <div
              className="flex p-1 bg-gray-200 rounded-lg shadow-md hover:shadow-xl 
              transition-all duration-300 mb-8"
            >
              <button
                className={`flex-1 py-4 rounded-md transition-all duration-300 cursor-pointer
                  ${
                    selectedRole === "student"
                      ? "bg-white shadow-lg transform scale-105"
                      : "hover:bg-gray-100 hover:scale-102"
                  }`}
                onClick={() => setSelectedRole("student")}
              >
                <User
                  className="h-6 w-6 mx-auto mb-2 
                  group-hover:text-indigo-600 transition-colors duration-300"
                />
                <div className="text-sm font-medium ">Student</div>
              </button>
              <button
                className={`flex-1 py-4 rounded-md transition-all duration-300 cursor-pointer
                  ${
                    selectedRole === "teacher"
                      ? "bg-white shadow-lg transform scale-105"
                      : "hover:bg-gray-100 hover:scale-102"
                  }`}
                onClick={() => setSelectedRole("teacher")}
              >
                <BookOpen
                  className="h-6 w-6 mx-auto mb-2 
                  group-hover:text-indigo-600 transition-colors duration-300"
                />
                <div className="text-sm font-medium ">Teacher</div>
              </button>
            </div>

            {/* Role-specific content with enhanced hover effects */}
            <div className="mt-12 animate-fade-in">
              <h2
                className="text-3xl font-bold text-center text-gray-900 mb-6
                hover:text-indigo-600 transition-colors duration-300
                cursor-pointer"
              >
                {roleContent[selectedRole].title}
              </h2>
              <p
                className="text-center text-gray-600 mb-12
                hover:text-indigo-600 transition-colors duration-300
                cursor-pointer"
              >
                {roleContent[selectedRole].description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {roleContent[selectedRole].features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-md
                      hover:shadow-2xl hover:scale-105
                      transform transition-all duration-300
                      border border-gray-100 hover:border-indigo-300
                      group cursor-pointer"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3
                      className="text-xl font-semibold text-gray-900 mb-3
                      group-hover:text-indigo-600 transition-colors duration-300"
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-gray-600 group-hover:text-gray-800
                      transition-colors duration-300"
                    >
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - New */}
        <section className="py-16">
          <h2
            className="text-3xl font-bold text-center mb-12 text-gray-900
            hover:text-indigo-600 transition-colors duration-300"
          >
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage) => (
              <div
                key={advantage.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl 
                transform hover:-translate-y-2 transition-all duration-300
                border border-gray-100 hover:border-indigo-200"
              >
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="px-6 py-8 sm:px-10 lg:w-3/5 xl:w-2/3 xl:px-12 xl:py-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
                    <motion.span
                      className="block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      Ready to start learning?
                    </motion.span>
                    <motion.span
                      className="block mt-1 text-blue-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      Create your free account today.
                    </motion.span>
                  </h2>
                  <motion.p
                    className="mt-3 text-base leading-6 text-blue-100 max-w-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    Join thousands of students and teachers on our platform to
                    access the best educational content, personalized learning
                    paths, and interactive lessons designed for modern learners.
                  </motion.p>
                  <motion.div
                    className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <motion.button
                      className="bg-white border border-transparent rounded-md shadow px-5 py-2 text-base font-medium text-blue-700 hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavLink
                        to="/signup"
                        className="flex items-center justify-center"
                      >
                        <span>Register Now</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </NavLink>
                    </motion.button>
                    <motion.button
                      className="bg-blue-900 border border-transparent rounded-md shadow px-5 py-2 text-base font-medium text-white hover:bg-blue-950 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavLink
                        to="/about-us"
                        className="flex items-center justify-center"
                      >
                        <span>Learn more</span>
                      </NavLink>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                className="hidden lg:block lg:w-2/5 xl:w-1/3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <div className="h-full flex items-center justify-center p-4">
                  <div className="relative w-full h-full max-w-sm">
                    <motion.div
                      className="absolute top-8 right-8 w-20 h-20 bg-blue-400 rounded-full opacity-50"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-8 left-8 w-24 h-24 bg-blue-300 rounded-full opacity-40"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-white rounded-xl shadow-lg p-4 flex items-center justify-center"
                      initial={{ rotate: -5 }}
                      animate={{
                        rotate: [5, -5, 5],
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            {/* <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about our platform, courses, and subscription options.
        </p> */}
          </motion.div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className={`border-b border-gray-200 ${
                  index === faqData.length - 1 ? "border-b-0" : ""
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-medium text-gray-900 text-lg sm:text-xl">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeIndex === index ? (
                      <ChevronUp className="text-blue-600 w-5 h-5" />
                    ) : (
                      <ChevronDown className="text-blue-600 w-5 h-5" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-gray-600">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600">Still have questions?</p>
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-900 text-white font-medium rounded-md shadow hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <NavLink to="/contact">
                  <span>Contact Support</span>
                </NavLink>
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
