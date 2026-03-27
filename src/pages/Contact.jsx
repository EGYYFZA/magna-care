import Navbar from '../components/Navbar';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar />
      <div className="py-16 px-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Contact Us</h1>
        <form className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} className="w-full border border-gray-300 rounded-md p-2"></textarea>
          </div>
          <button className="bg-[#e86e1c] text-white px-6 py-2 rounded font-medium hover:bg-[#d56115] transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
