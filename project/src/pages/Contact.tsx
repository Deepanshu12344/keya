import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon, Users } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get in touch via email',
    contact: 'hello@luxefashion.com',
    availability: 'Response within 24 hours'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our team',
    contact: '+1 (555) 123-4567',
    availability: 'Mon-Fri, 9AM-6PM EST'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with support',
    contact: 'Available on website',
    availability: 'Mon-Fri, 9AM-9PM EST'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Our flagship store',
    contact: '123 Fashion Ave, New York, NY 10001',
    availability: 'Mon-Sat, 10AM-8PM'
  }
];

const departments = [
  {
    icon: HeadphonesIcon,
    title: 'Customer Service',
    description: 'General inquiries, order status, returns',
    email: 'support@luxefashion.com'
  },
  {
    icon: Users,
    title: 'Personal Styling',
    description: 'Style consultations, wardrobe advice',
    email: 'styling@luxefashion.com'
  },
  {
    icon: Mail,
    title: 'Press & Media',
    description: 'Media inquiries, partnerships',
    email: 'press@luxefashion.com'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      department: 'general'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-neutral-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7679741/pexels-photo-7679741.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Contact Hero"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-4 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-xl text-neutral-200 max-w-2xl mx-auto animate-slide-up">
            We're here to help with any questions about our products, styling advice, or just to chat about fashion.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
              How Can We Help?
            </h2>
            <p className="text-lg text-neutral-600">
              Choose the best way to reach us based on your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="bg-neutral-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-gold-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-neutral-600 mb-3">
                    {method.description}
                  </p>
                  <p className="font-medium text-neutral-900 mb-2">
                    {method.contact}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {method.availability}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">
              Send Us a Message
            </h2>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  Thank you for your message! We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-neutral-700 mb-2">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="styling">Personal Styling</option>
                  <option value="press">Press & Media</option>
                  <option value="wholesale">Wholesale</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-gold-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-8 animate-fade-in">
            {/* Departments */}
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                Specialized Departments
              </h3>
              <div className="space-y-4">
                {departments.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <div
                      key={dept.title}
                      className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-gold-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">
                          {dept.title}
                        </h4>
                        <p className="text-sm text-neutral-600 mb-2">
                          {dept.description}
                        </p>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                        >
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Store Hours */}
            <div className="bg-neutral-50 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-gold-600" />
                <h3 className="text-xl font-semibold text-neutral-900">
                  Store Hours
                </h3>
              </div>
              <div className="space-y-2 text-neutral-700">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>12:00 PM - 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gold-50 p-6 rounded-xl border border-gold-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Frequently Asked Questions
              </h3>
              <p className="text-neutral-700 mb-4">
                Find quick answers to common questions about sizing, shipping, returns, and more.
              </p>
              <button className="text-gold-600 hover:text-gold-700 font-medium">
                View FAQ →
              </button>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-neutral-100 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Visit Our Flagship Store
              </h3>
              <div className="bg-neutral-200 h-48 rounded-lg flex items-center justify-center mb-4">
                <p className="text-neutral-500">Interactive Map Coming Soon</p>
              </div>
              <div className="text-neutral-700">
                <p className="font-medium">LUXE Fashion Store</p>
                <p>123 Fashion Avenue</p>
                <p>New York, NY 10001</p>
                <p className="mt-2 text-sm">
                  Located in the heart of Manhattan's fashion district
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}