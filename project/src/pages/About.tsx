import React from 'react';
import { Heart, Award, Users, Leaf, Truck, Shield } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Passion for Fashion',
    description: 'Every piece in our collection is chosen with love and attention to detail, reflecting our deep passion for timeless style.'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We partner with the finest artisans and use only the highest quality materials to ensure every garment meets our exacting standards.'
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We provide personalized service and support to help you find pieces you\'ll treasure forever.'
  },
  {
    icon: Leaf,
    title: 'Sustainable Fashion',
    description: 'We\'re committed to ethical practices and sustainable fashion, working with suppliers who share our values for responsible production.'
  }
];

const team = [
  {
    name: 'Isabella Chen',
    role: 'Founder & Creative Director',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'With over 15 years in fashion, Isabella founded LUXE to bring accessible luxury to modern wardrobes.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head of Design',
    image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Marcus brings his expertise from Milan\'s fashion houses to create our signature contemporary aesthetic.'
  },
  {
    name: 'Sophie Laurent',
    role: 'Sustainability Director',
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Sophie leads our commitment to ethical fashion and sustainable practices across all operations.'
  }
];

const milestones = [
  { year: '2018', event: 'LUXE founded with a vision to democratize luxury fashion' },
  { year: '2019', event: 'Launched our first sustainable collection' },
  { year: '2020', event: 'Expanded internationally, serving customers in 25 countries' },
  { year: '2021', event: 'Achieved carbon-neutral shipping across all operations' },
  { year: '2022', event: 'Opened our first flagship store in New York' },
  { year: '2023', event: 'Launched our circular fashion program' },
  { year: '2024', event: 'Celebrating 6 years of timeless fashion' }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-neutral-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7679448/pexels-photo-7679448.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="About Hero"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-4 animate-fade-in">
            About LUXE
          </h1>
          <p className="text-xl text-neutral-200 max-w-2xl mx-auto animate-slide-up">
            Crafting timeless fashion with passion, quality, and sustainability at our core.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story */}
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Founded in 2018, LUXE began as a dream to make luxury fashion accessible to everyone. 
                  We believe that exceptional style shouldn't be reserved for the few, but should be 
                  available to anyone who appreciates quality, craftsmanship, and timeless design.
                </p>
                <p>
                  Our journey started in a small studio in New York, where our founder Isabella Chen 
                  began curating pieces that embodied both contemporary trends and classic elegance. 
                  Today, we've grown into a global brand, but our commitment to quality and personal 
                  service remains unchanged.
                </p>
                <p>
                  Every piece in our collection tells a story of careful selection, ethical sourcing, 
                  and attention to detail. We work directly with artisans and suppliers who share our 
                  values, ensuring that every garment meets our high standards for quality and sustainability.
                </p>
              </div>
            </div>
            <div className="animate-slide-up">
              <img
                src="https://images.pexels.com/photos/7679336/pexels-photo-7679336.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Story"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-neutral-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do, from design to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The passionate individuals behind LUXE, dedicated to bringing you exceptional fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gold-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-neutral-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Key milestones in our mission to redefine accessible luxury fashion.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold-200"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className="relative flex items-center animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute left-6 w-4 h-4 bg-gold-600 rounded-full border-4 border-white shadow-sm"></div>
                    <div className="ml-20 bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-2xl font-bold text-gold-600">
                          {milestone.year}
                        </span>
                      </div>
                      <p className="text-neutral-700">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4">
              Our Commitments
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The promises we make to our customers and the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-neutral-200 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <Truck className="h-12 w-12 text-gold-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Fast & Free Shipping
              </h3>
              <p className="text-neutral-600">
                Free shipping on orders over $200, with carbon-neutral delivery options available.
              </p>
            </div>
            <div className="text-center p-8 border border-neutral-200 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <Shield className="h-12 w-12 text-gold-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Quality Guarantee
              </h3>
              <p className="text-neutral-600">
                Every piece comes with our quality guarantee and hassle-free 30-day returns.
              </p>
            </div>
            <div className="text-center p-8 border border-neutral-200 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <Leaf className="h-12 w-12 text-gold-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Sustainable Practices
              </h3>
              <p className="text-neutral-600">
                Committed to ethical sourcing and sustainable fashion practices in everything we do.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}