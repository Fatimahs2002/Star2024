import Banner from "../components/Banner";
import ProductsPage from "../components/ProductsPage";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="py-5">
      <Banner />
      </div>
      <div className="py-5">
      <ProductsPage />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
