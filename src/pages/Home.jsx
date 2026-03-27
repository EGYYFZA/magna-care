import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Magna Care</h1>
      <p>Premium Skincare for Men</p>

      <Link to="/products">
        <button>Shop Now</button>
      </Link>

      <Link to="/contact">
        <button>Book Consultation</button>
      </Link>
    </div>
  );
}

export default Home;