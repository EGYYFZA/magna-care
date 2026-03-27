import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/product';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bennerImage from '../assets/Benner.svg';

export default function Home({ cartItemCount, onAddToCart }) {
  const navigate = useNavigate();
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(9);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const timeSlots = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

  const calendar = useMemo(() => {
    const today = new Date();
    const activeDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = activeDate.getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const leadingDays = Array.from({ length: firstDay }, (_, index) => ({
      day: prevMonthDays - firstDay + index + 1,
      inCurrentMonth: false,
    }));

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, index) => ({
      day: index + 1,
      inCurrentMonth: true,
    }));

    const cellsUsed = leadingDays.length + currentMonthDays.length;
    const trailingCount = (7 - (cellsUsed % 7)) % 7;
    const trailingDays = Array.from({ length: trailingCount }, (_, index) => ({
      day: index + 1,
      inCurrentMonth: false,
    }));

    return {
      monthLabel: activeDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      days: [...leadingDays, ...currentMonthDays, ...trailingDays],
    };
  }, [monthOffset]);

  const handleConfirmBooking = () => {
    if (!selectedDay || !selectedTime) {
      return;
    }
    navigate('/contact');
  };

  const handleAddToCartAndGoCart = (product) => {
    onAddToCart(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar cartItemCount={cartItemCount} />
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#1e3a5f] text-white min-h-[320px] h-[48vh] sm:h-[58vh] lg:h-[68vh]">
        <img 
          src={bennerImage}
          alt="Man washing face" 
          className="absolute inset-0 h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <h1 className="mb-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Elevate Your<br />Skin Care Routine
          </h1>
          <p className="text-lg text-gray-300 mb-1 mt-4">Premium Skincare for Men</p>
          <p className="text-md text-gray-400 mb-8">Look Your Best Every Day</p>
          <button
            type="button"
            className="w-fit rounded bg-[#e86e1c] px-8 py-3 font-medium text-white transition-colors hover:bg-[#d56115]"
            onClick={() => navigate('/products')}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-2">Our Best Sellers</h2>
          <p className="text-gray-500">Top Products for Men's Skincare</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCartAndGoCart} />
          ))}
        </div>
      </section>

      {/* Consultation Section */}
      <section className="mx-auto max-w-5xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-2">Book a Skincare Consultation</h2>
          <p className="text-gray-500">Schedule a Session with Our Skincare Expert</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Calendar */}
          <div className="flex-1 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                className="rounded p-1 hover:bg-gray-100"
                onClick={() => setMonthOffset((prev) => prev - 1)}
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="font-medium text-gray-800">{calendar.monthLabel}</h3>
              <button
                type="button"
                className="rounded p-1 hover:bg-gray-100"
                onClick={() => setMonthOffset((prev) => prev + 1)}
              >
                <ChevronRight size={20} />
              </button>
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
              {calendar.days.map((entry, index) => {
                const isSelected = entry.inCurrentMonth && entry.day === selectedDay;
                return (
                  <button
                    key={`${entry.day}-${index}`}
                    type="button"
                    className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full py-2 ${
                      entry.inCurrentMonth
                        ? isSelected
                          ? 'bg-[#2c3e50] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                        : 'cursor-default text-gray-300'
                    }`}
                    onClick={() => entry.inCurrentMonth && setSelectedDay(entry.day)}
                    disabled={!entry.inCurrentMonth}
                  >
                    {entry.day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="w-full md:w-72 bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
            <h3 className="font-medium text-gray-800 mb-6">Select Time:</h3>
            <div className="space-y-3 flex-1">
              {timeSlots.map((slot) => {
                const selected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    className={`w-full rounded py-2.5 text-sm font-medium transition-colors ${
                      selected
                        ? 'bg-[#2c3e50] text-white hover:bg-[#1a252f]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded bg-[#e86e1c] py-3 font-medium text-white transition-colors hover:bg-[#d56115] disabled:cursor-not-allowed disabled:bg-gray-300"
              onClick={handleConfirmBooking}
              disabled={!selectedDay || !selectedTime}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
