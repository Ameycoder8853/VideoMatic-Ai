"use client"

import { useState, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavigate = (e, path) => {
    e.preventDefault();
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className='p-3 px-5 flex items-center justify-between shadow-md'>
        <div className='flex gap-3 items-center'>
          <img src='/logo.svg' width="30" height="30" alt="Videomatic AI Logo"/> 
          <h2 className='font-bold text-xl'>Videomatic AI</h2>
        </div>
        <div className='flex gap-3 items-center'>
          <button 
            onClick={(e) => handleNavigate(e, '/dashboard')}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Dashboard
          </button>
          <UserButton/>
        </div>
      </div>
      
      {/* Rest of the landing page content */}
      <main className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
      } transition-all duration-1000`}>
        <div className="space-y-16">
          {/* Main Hero */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Create Stunning Videos with
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"> AI Magic</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your ideas into professional videos in minutes using cutting-edge AI technology.
              <br/>
              <br/>
              Your Own Video Generator AI
            </p>
            <div className="space-x-4">
              <button
                onClick={(e) => handleNavigate(e, '/dashboard')}
                className="transform hover:scale-105 transition-transform duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Start Creating Now
              </button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="transform hover:scale-105 transition-transform duration-200 text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-8 py-4 text-center m-5"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {[
              { number: '100+', label: 'Active Users' },
              { number: '1000+', label: 'Videos Created' },
              { number: '99%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center hover:transform hover:scale-105 transition-transform duration-200">
                <div className="text-3xl md:text-4xl font-bold text-blue-700">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div id="features" className="scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Videomatic AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* ... Features content remains the same ... */}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Upload Your Content', description: 'Add your images, videos, or text to get started' },
                { step: '02', title: 'Choose Your Style', description: 'Select from our wide range of different styles' },
                { step: '03', title: 'Generate & Download', description: 'Let AI work its magic and download your video' }
              ].map((item, index) => (
                <div key={index} className="relative p-6 hover:transform hover:scale-105 transition-transform duration-200">
                  <div className="text-6xl font-bold text-blue-100 absolute top-0 left-0">
                    {item.step}
                  </div>
                  <div className="relative z-10 pt-8">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-blue-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "Videomatic AI has transformed how we create content. It's incredibly fast and the results are amazing!",
                  author: "Amey Patil",
                  role: "Founder of VideoMatic AI"
                },
                {
                  quote: "The AI-powered features save me hours of work. This tool is a game-changer for video production.",
                  author: "person",
                  role: "Director"
                },
                {
                  quote: "I've never seen anything like it. The quality of videos I can create now is simply unprecedented.",
                  author: "person 2",
                  role: "YouTuber"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Video Creation?</h2>
            <p className="text-lg mb-8">Join VideoMatic AI</p>
            <button
              onClick={(e) => handleNavigate(e, '/dashboard')}
              className="transform hover:scale-105 transition-transform duration-200 bg-white text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-8 py-4 text-center"
            >
              Get Started Now - It's Free!
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Footer content remains the same */}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>© 2024 Videomatic AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
