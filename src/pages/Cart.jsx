import Navbar from '../components/Navbar';

export default function Cart() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar />
      <div className="py-16 px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Your Cart</h1>
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center text-gray-500">
          Your cart is currently empty.
        </div>
      </div>
    </div>
  );
}