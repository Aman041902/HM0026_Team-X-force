import React from 'react'

export const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Former education technology researcher with a passion for making learning accessible to everyone.',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      bio: 'Expert in video streaming technologies with over 15 years of experience in EdTech.',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Content',
      bio: 'Former university professor dedicated to curating high-quality educational videos.',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'James Wilson',
      role: 'Lead UX Designer',
      bio: 'Specializes in creating intuitive learning experiences for students of all ages.',
      image: '/api/placeholder/120/120'
    }
  ];

  return (
    <div className="bg-white py-8 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">About EduVideos</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We're on a mission to transform education through carefully curated video content and innovative learning analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-4">
            EduVideos was founded on the belief that quality educational content should be accessible, engaging, and trackable. We envision a world where every learner can find expert-vetted videos that match their learning style and educational needs.
          </p>
          <p className="text-gray-600">
            Unlike general video platforms, we focus exclusively on educational content that meets rigorous standards for accuracy and educational value. Every video on our platform is manually reviewed by subject matter experts before being approved.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">What Makes Us Different</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Curated, expert-reviewed educational videos only</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Personalized learning journeys based on your viewing history</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Visual progress tracking and learning analytics</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Ad-free learning environment focused on education</span>
            </li>
          </ul>
        </div>
      </div>

      

      <div>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 text-center">
              <img 
                src={member.image} 
                alt={member.name} 
                className="mx-auto h-24 w-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-medium text-indigo-700">{member.name}</h3>
              <p className="text-indigo-500 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

