import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const navigate = useNavigate();

  const handleChange =  (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        error: true,
        message: "Please fill out all required fields.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        error: true,
        message: "Please enter a valid email address.",
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);

    try 
    {
      const response = await fetch('http://localhost:3000/contact',{
        method : 'POST',
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(formData)
      });

      console.log(response);
    }
    catch(error)
    {
      console.log(error.message);
    }

    setFormStatus({
      submitted: true,
      error: false,
      message:
        "Thank you for your message! Our team will get back to you shortly.",
    });

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

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
        {/* Header Section */}
        <div className="text-center mb-16 scroll-animate opacity-0">
          <h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
            bg-clip-text text-transparent mb-6 transform hover:scale-105 transition-transform duration-300"
          >
            Contact Us
          </h1>
          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed
            hover:text-gray-800 transition-colors duration-300"
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info Card */}
          <div className="scroll-animate opacity-0">
            <div
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl 
              transform hover:-translate-y-2 transition-all duration-300"
            >
              <h2
                className="text-2xl font-semibold text-indigo-700 mb-6
                hover:text-indigo-500 transition-colors duration-300"
              >
                Get in Touch
              </h2>

              {/* Contact Items */}
              <div className="space-y-6">
                {[
                  {
                    icon: "phone",
                    content: "(+91) 987643210",
                    path: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  },
                  {
                    icon: "email",
                    content: "support@edustream.com",
                    path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  },
                  {
                    icon: "location",
                    content: "PCCOE, Pune, 411044",
                    path: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 rounded-lg hover:bg-indigo-50 
                    transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-indigo-600 group-hover:scale-110 
                        transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={item.path}
                        />
                      </svg>
                    </div>
                    <div
                      className="ml-4 text-gray-700 group-hover:text-indigo-600 
                      transition-colors duration-300"
                    >
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="scroll-animate opacity-0">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl 
              transition-all duration-300 space-y-6"
            >
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300
                      focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                      transition-all duration-300 hover:border-indigo-300"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300
                      focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                      transition-all duration-300 hover:border-indigo-300 resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Form Status Message */}
              {formStatus.submitted && (
                <div
                  className={`p-4 rounded-lg ${
                    formStatus.error
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-green-50 text-green-700 border border-green-200"
                  } animate-fade-in`}
                >
                  {formStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-medium
                  transform hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-lg
                  transition-all duration-300 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </form>
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

export default Contact;
