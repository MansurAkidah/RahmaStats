import { useState } from 'react'
//import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('all')

  const products = [
    { id: 1, name: 'Luxury Knife Set', price: '$199.99', category: 'knives', image: 'https://placehold.co/300x200?text=Luxury+Knife+Set' },
    { id: 2, name: 'Gold-Plated Cutlery', price: '$299.99', category: 'cutlery', image: 'https://placehold.co/300x200?text=Gold-Plated+Cutlery' },
    { id: 3, name: 'Modern Serving Spoons', price: '$49.99', category: 'utensils', image: 'https://placehold.co/300x200?text=Modern+Serving+Spoons' },
    { id: 4, name: 'Chef\'s Choice Pans', price: '$159.99', category: 'cookware', image: 'https://placehold.co/300x200?text=Chef\'s+Choice+Pans' },
  ]

  const filteredProducts = activeTab === 'all' ? products : products.filter(product => product.category === activeTab)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Elegant Cutlery</h1>
          <div className="space-x-4">
            <a href="#products" className="text-gray-600 hover:text-gray-800">Products</a>
            <a href="#about" className="text-gray-600 hover:text-gray-800">About</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
          <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Elevate Your Dining Experience
              </motion.h2>
              <motion.p 
                className="text-xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover our exquisite collection of premium cutlery and utensils.
              </motion.p>
              <motion.button 
                className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Shop Now
              </motion.button>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* <Image 
                  src="https://placehold.co/600x400?text=Elegant+Cutlery" 
                  alt="Elegant Cutlery Set" 
                  width={600} 
                  height={400}
                  className="rounded-lg shadow-2xl"
                /> */}
                <img src="https://placehold.co/600x400?text=Elegant+Cutlery" alt="Elegant Cutlery Set" style={{ width: '600', height: '400' }} />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="products" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Our Featured Products</h2>
            <div className="flex justify-center mb-8 space-x-4">
              {['all', 'knives', 'cutlery', 'utensils', 'cookware'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full ${
                    activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={300} 
                    height={200}
                    className="w-full h-48 object-cover"
                  /> */}
                  <img src={product.image} alt={product.name} style={{ width: '300', height: '200' }} />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                    <button className="mt-4 bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Premium Quality', description: 'Our products are crafted from the finest materials for lasting durability.' },
                { title: 'Elegant Designs', description: 'Each piece is designed to add sophistication to your dining experience.' },
                { title: 'Exceptional Service', description: 'Our team is dedicated to providing you with the best customer service.' }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Dining?</h2>
            <p className="text-xl mb-8">Join our mailing list and get 10% off your first order!</p>
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900"
                />
                <button 
                  type="submit" 
                  className="bg-white text-purple-600 font-bold py-2 px-6 rounded-r-full hover:bg-gray-100 transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Elegant Cutlery</h3>
              <p>Elevating your dining experience since 2023.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <ul>
                <li><a href="#" className="hover:text-gray-300">Home</a></li>
                <li><a href="#products" className="hover:text-gray-300">Products</a></li>
                <li><a href="#about" className="hover:text-gray-300">About Us</a></li>
                <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p>123 Cutlery Lane, Silvertown, ST 12345</p>
              <p>Email: info@elegantcutlery.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Elegant Cutlery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}