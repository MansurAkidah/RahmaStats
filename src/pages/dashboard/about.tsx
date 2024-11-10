import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">Elegant Cutlery</Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
            <Link href="/#products" className="text-gray-600 hover:text-gray-800">Products</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
            <Link href="/#contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">About Elegant Cutlery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src="https://placehold.co/600x400?text=Our+Story" 
              alt="Elegant Cutlery Story" 
              width={600} 
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2023, Elegant Cutlery was born from a passion for elevating everyday dining experiences. Our journey began when our founder, a culinary enthusiast, realized the profound impact that quality utensils can have on the enjoyment of a meal.
            </p>
            <p className="text-gray-600 mb-4">
              We started with a simple mission: to provide home cooks and professional chefs alike with cutlery and utensils that are not just tools, but works of art. Each piece in our collection is carefully crafted to blend functionality with aesthetic appeal.
            </p>
            <p className="text-gray-600">
              Today, we continue to innovate and expand our range, always with an eye for quality, durability, and timeless elegance. We're proud to be a part of countless dining tables around the world, adding a touch of sophistication to every meal.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quality Craftsmanship", description: "We use only the finest materials and time-honored techniques to create utensils that last a lifetime." },
              { title: "Innovative Design", description: "Our designs blend traditional elegance with modern functionality to suit every dining style." },
              { title: "Customer Satisfaction", description: "We're committed to ensuring our customers have the best possible experience with our products and service." }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Visit Our Showroom</h2>
          <p className="text-gray-600 mb-4">
            Experience the elegance of our cutlery in person. Visit our showroom to see and feel the quality for yourself.
          </p>
          <p className="text-gray-600">
            123 Cutlery Lane, Silvertown, ST 12345<br />
            Open Monday to Saturday, 9am - 6pm
          </p>
          <Link href="/#contact" className="inline-block mt-4 bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300">
            Contact Us
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Elegant Cutlery</h3>
              <p>Elevating your dining experience since 2023.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <ul>
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><Link href="/#products" className="hover:text-gray-300">Products</Link></li>
                <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
                <li><Link href="/#contact" className="hover:text-gray-300">Contact</Link></li>
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