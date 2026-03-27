import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[500px] bg-[#1e3a5f] text-white overflow-hidden">
        <img 
          src="https://picsum.photos/seed/menskincare/1920/1080" 
          alt="Man washing face" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-center h-full px-12 max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2 leading-tight">
            Elevate Your<br />Skin Care Routine
          </h1>
          <p className="text-lg text-gray-300 mb-1 mt-4">Premium Skincare for Men</p>
          <p className="text-md text-gray-400 mb-8">Look Your Best Every Day</p>
          <button className="bg-[#e86e1c] text-white px-8 py-3 rounded font-medium w-fit hover:bg-[#d56115] transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-2">Our Best Sellers</h2>
          <p className="text-gray-500">Top Products for Men's Skincare</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-16 px-8 max-w-5xl mx-auto border-t border-gray-200">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-2">Book a Skincare Consultation</h2>
          <p className="text-gray-500">Schedule a Session with Our Skincare Expert</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Calendar */}
          <div className="flex-1 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={20} /></button>
              <h3 className="font-medium text-gray-800">April 2024</h3>
              <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={20} /></button>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
              <div className="text-gray-400">Sun</div>
              <div className="text-gray-400">Mon</div>
              <div className="text-gray-400">Tue</div>
              <div className="text-gray-400">Wed</div>
              <div className="text-gray-400">Thu</div>
              <div className="text-gray-400">Fri</div>
              <div className="text-gray-400">Sat</div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {/* Previous month days */}
              <div className="py-2 text-gray-300">28</div>
              <div className="py-2 text-gray-300">29</div>
              <div className="py-2 text-gray-300">30</div>
              <div className="py-2 text-gray-300">31</div>
              
              {/* Current month days */}
              {[...Array(30)].map((_, i) => {
                const day = i + 1;
                const isSelected = day === 9;
                return (
                  <div 
                    key={day} 
                    className={`py-2 cursor-pointer rounded-full w-8 h-8 mx-auto flex items-center justify-center
                      ${isSelected ? 'bg-[#2c3e50] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    {day}
                  </div>
                );
              })}
              
              {/* Next month days */}
              <div className="py-2 text-gray-300">1</div>
              <div className="py-2 text-gray-300">2</div>
              <div className="py-2 text-gray-300">3</div>
              <div className="py-2 text-gray-300">4</div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="w-full md:w-72 bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
            <h3 className="font-medium text-gray-800 mb-6">Select Time:</h3>
            <div className="space-y-3 flex-1">
              <button className="w-full py-2.5 bg-[#2c3e50] text-white rounded text-sm font-medium hover:bg-[#1a252f] transition-colors">10:00 AM</button>
              <button className="w-full py-2.5 bg-[#2c3e50] text-white rounded text-sm font-medium hover:bg-[#1a252f] transition-colors">11:00 AM</button>
              <button className="w-full py-2.5 bg-[#2c3e50] text-white rounded text-sm font-medium hover:bg-[#1a252f] transition-colors">2:00 PM</button>
              <button className="w-full py-2.5 bg-[#2c3e50] text-white rounded text-sm font-medium hover:bg-[#1a252f] transition-colors">3:00 PM</button>
            </div>
            <button className="w-full py-3 mt-6 bg-[#e86e1c] text-white font-medium rounded hover:bg-[#d56115] transition-colors">
              Confirm Booking
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
