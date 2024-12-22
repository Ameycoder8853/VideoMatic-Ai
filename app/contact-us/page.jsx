import React from 'react'
import Header from '../dashboard/_components/Header'

const ContactPage = () => {
  return (
    <div>
      <Header/>
      <div class="max-w-4xl mx-auto p-5 font-sans">
    <h2 class="text-3xl font-semibold text-center mb-6">Contact Us</h2>
    
    <p class="text-lg text-gray-700 mb-6 text-center">
      If you have any questions, feel free to reach out to us using the form below. We&apos;ll get back to you as soon as possible.
    </p>
  
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h3 class="text-2xl font-semibold mb-4">Send Us a Message</h3>
        <form action="vidematic.ai1@gmail.com" method="POST">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-medium">Full Name</label>
            <input type="text" id="name" name="name" required class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your full name" />
          </div>
  
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium">Email Address</label>
            <input type="email" id="email" name="email" required class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email address" />
          </div>
  
          <div class="mb-4">
            <label for="message" class="block text-gray-700 font-medium">Message</label>
            <textarea id="message" name="message" required class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your message" rows="4"></textarea>
          </div>
  
          <div class="mb-4 flex justify-center">
            <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Send Message
            </button>
          </div>
        </form>
      </div>
  
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h3 class="text-2xl font-semibold mb-4">Our Contact Information</h3>
        <div class="mb-4">
          <p class="text-lg font-medium text-gray-700">Email: <a href="mailto:videomatic.ai1@gmail.com" class="text-blue-600">videomatic.ai1@gmail.com</a></p>
        </div>
        <div class="mb-4">
          <p class="text-lg font-medium text-gray-700">Phone: +91 7588888555</p>
        </div>
        <div class="mb-4">
          <p class="text-lg font-medium text-gray-700">Address: Parwati niwas front of gk pawar tower islampur road,sangliwadi Sangli MAHARASHTRA 416416</p>
        </div>
      </div>
    </div>
  
  </div>
  </div>
  )
}

export default ContactPage