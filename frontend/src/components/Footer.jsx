import React from 'react';
import { motion } from 'framer-motion';

const CompactFooter = () => {
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "About Us", href: "#" },
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "FAQ", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "Community", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" }
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "Twitter", href: "#" },
        { name: "Facebook", href: "#" },
        { name: "Instagram", href: "#" }
      ]
    }
  ];

  const socialIcons = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      )
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      )
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      )
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      )
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <footer className="relative text-gray-800 overflow-hidden">
      {/* Gradient background - blue to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-white z-0"></div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJibHVlIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bS02IDEyaC0ydi00aDJ2NHptLTYgMGgtMnYtNGgydjR6bS02IDBoLTJ2LTRoMnY0em0tNiAwaC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMjQgMTJoLTJ2NGgydi00em0tNiAwaC0ydjRoMnYtNHptLTYgMGgtMnY0aDJ2LTR6bS02IDBoLTJ2NGgydi00em0tNiAwaC0ydjRoMnYtNHoiLz48L2c+PC9zdmc+')]"></div>
      
      {/* Animated subtle gradient overlay */}
      <div className="absolute inset-0 opacity-10 z-0">
        <motion.div 
          className="w-full h-full bg-gradient-to-br from-blue-300 to-transparent"
          animate={{ 
            rotate: [0, 2, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Main footer content with reduced padding */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {footerLinks.map((section) => (
            <motion.div key={section.title} variants={itemVariants} className="text-sm">
              <h3 className="text-sm font-bold tracking-wider uppercase text-blue-700">
                {section.title}
              </h3>
              <div className="h-0.5 w-8 bg-blue-500 mb-2 rounded"></div>
              <ul className="mt-2 space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-600 hover:text-blue-600 transition duration-300 text-xs">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Compact newsletter subscription */}
       

        {/* Social links and copyright in compact form */}
        <motion.div 
          className="mt-4 border-t border-blue-100 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex space-x-2 mb-3 sm:mb-0 sm:order-2">
            {socialIcons.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">{item.name}</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {item.icon}
                </svg>
              </motion.a>
            ))}
          </div>
          <div className="sm:order-1 flex items-center">
            <img src="/api/placeholder/80/20" alt="Logo" className="h-4 w-auto mr-2" />
            <p className="text-xs text-gray-500">
              &copy; 2025 EduStream. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle wave effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 z-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path fill="#4299e1" fillOpacity="1" d="M0,192L48,170.7C96,149,192,107,288,112C384,117,480,171,576,181.3C672,192,768,160,864,133.3C960,107,1056,85,1152,96C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </footer>
  );
};

export default CompactFooter;