import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact({ cartItemCount }) {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar cartItemCount={cartItemCount} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Contact Us</h1>
        <form className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" required className="w-full rounded-md border border-gray-300 p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required className="w-full rounded-md border border-gray-300 p-2" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} required className="w-full rounded-md border border-gray-300 p-2"></textarea>
          </div>
          <button type="submit" className="rounded bg-[#e86e1c] px-6 py-2 font-medium text-white transition-colors hover:bg-[#d56115]">
            Send Message
          </button>
          {isSent && (
            <p className="mt-4 text-sm font-medium text-emerald-600">Message sent successfully. We will contact you soon.</p>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
