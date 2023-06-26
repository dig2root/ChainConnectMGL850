import './scss/Home.scss'
import truck_picture from './../images/photo.jpg'
import pageTitle from '../functions/PageTitle';
import Pricing from './Pricing';

function Home() {

    pageTitle("Home");

    return(
        <div className="container">
            <div className="home">
                <div className="home-main">
                    <div className="home-main--back">
                        <img src={truck_picture} className="home-main--back_picture"/>
                        <div className="home-main--back_color"></div>
                    </div>
                    <div className="home-main--content">
                        <h1 className="home-main--content_title">Optimized automatic loading wizard</h1>
                        <button className="home-main--content_button">Discover our offers</button>
                    </div>
                </div>
                <div className="home-offers">
                    <Pricing />
                </div>
            </div>
        </div>
    );
};

export default Home;