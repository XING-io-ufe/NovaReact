import ProductList from '../components/ProductList';

const Home = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h1>
            <ProductList />
        </div>
    );
};

export default Home;