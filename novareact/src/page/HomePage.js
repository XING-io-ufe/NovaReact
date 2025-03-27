
import '../App.css';
import Hwallpaper from "../img/pngwing.com.png"

function HomePage() {
    return (
        <div>
            <div className="h_content">
                <div className="h_side">
                    <h1>Best coffee</h1>
                    <h2>Make your day great wirh our special coffee!</h2>
                    <p>Welcome to our coffe paradise where every bean tells a story and every cup sparkd joy.</p>
                    <button>Order Now</button>
                    <button>Contact Us</button>
                </div>
                <img className="h_img" src={Hwallpaper} width={350} alt="" />
            </div>
        </div>
    );
}
export default HomePage;