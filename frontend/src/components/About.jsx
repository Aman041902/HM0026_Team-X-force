import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Ratul Kulkarni",
      role: "Full Stack Developer",
      bio: "Passionate about creating educational technology solutions",
      image: "👨‍💻", // You can replace with actual image
    },
    {
      name: "Onkar Jondhale",
      role: "Frontend Developer",
      bio: "Specialized in creating intuitive user experiences",
      image: "👨‍💻",
    },
    {
      name: "Aman Jain",
      role: "Backend Developer",
      bio: "Expert in scalable architecture and performance",
      image: "👨‍💻",
    },
    {
      name: "Brijmohan Gour",
      role: "UI/UX Designer",
      bio: "Focused on creating beautiful and functional interfaces",
      image: "👨‍💻",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      {/* Add Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-8 left-8 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full
          shadow-lg hover:shadow-xl transition-all duration-300
          flex items-center space-x-2 group
          hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
      >
        <svg
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 scroll-animate opacity-0">
          <h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
            bg-clip-text text-transparent mb-6 transform hover:scale-105 transition-transform duration-300"
          >
            About EduStream
          </h1>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed
            hover:text-gray-800 transition-colors duration-300"
          >
            We're on a mission to transform education through carefully curated
            video content and innovative learning analytics.
          </p>
        </div>

        {/* Vision and Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div
            className="scroll-animate opacity-0 transform hover:-translate-y-2 
            transition-all duration-300 bg-white rounded-xl shadow-lg p-8 hover:shadow-xl"
          >
            <h2
              className="text-2xl font-semibold text-indigo-700 mb-6
              hover:text-indigo-500 transition-colors duration-300"
            >
              Our Vision
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed hover:text-gray-800 transition-colors">
              EduStream was founded on the belief that quality educational
              content should be accessible, engaging, and trackable. We envision
              a world where every learner can find expert-vetted videos that
              match their learning style and educational needs.
            </p>
            <p className="text-gray-600 leading-relaxed hover:text-gray-800 transition-colors">
              Unlike general video platforms, we focus exclusively on
              educational content that meets rigorous standards for accuracy and
              educational value.
            </p>
          </div>

          <div
            className="scroll-animate opacity-0 transform hover:-translate-y-2 
            transition-all duration-300 bg-white rounded-xl shadow-lg p-8 hover:shadow-xl"
          >
            <h2
              className="text-2xl font-semibold text-indigo-700 mb-6
              hover:text-indigo-500 transition-colors duration-300"
            >
              What Makes Us Different
            </h2>
            <ul className="space-y-4">
              {[
                "Curated, expert-reviewed educational videos only",
                "Personalized learning journeys based on your viewing history",
                "Visual progress tracking and learning analytics",
                "Ad-free learning environment focused on education",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start p-3 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                >
                  <svg
                    className="h-6 w-6 text-indigo-500 mr-3 transform group-hover:scale-110 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600 hover:text-gray-800 transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="scroll-animate opacity-0">
          <h2
            className="text-3xl font-semibold text-center text-indigo-700 mb-12
            hover:text-indigo-500 transition-colors duration-300"
          >
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center
                transform hover:-translate-y-2 hover:shadow-xl
                transition-all duration-300 cursor-pointer group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.image}
                </div>
                <h3
                  className="text-xl font-medium text-indigo-700 mb-2
                  group-hover:text-indigo-500 transition-colors duration-300"
                >
                  {member.name}
                </h3>
                <p className="text-indigo-500 mb-3 font-medium">
                  {member.role}
                </p>
                <p
                  className="text-gray-600 text-sm group-hover:text-gray-800
                  transition-colors duration-300"
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add to your tailwind.config.js
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }
`;
