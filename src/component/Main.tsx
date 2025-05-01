import { FaPlayCircle } from "react-icons/fa";
import RightImg from "../assets/Group.svg"

function Main() {
    return (
        <main className="main" id="home">
            <div className="container">
                <div className="left-side" data-aos="fade-right">
                    <h1>Grow your <br />
                        Business Google Ads & <br />
                        Instagram Ads
                    </h1>
                    <p>It is a long established fact that a reader <br /> will be distracted by the readable.</p>
                    <div className="btn-main">
                        <button className="btn-contact">Contact Us</button>
                        <button className="btn-video">
                            <FaPlayCircle/>
                            Intro Video
                        </button>
                    </div>
                </div>
                <div className="right-side" data-aos="fade-left">
                    <img src={RightImg} alt="#" />
                </div>
            </div>
        </main>
    )
}

export default Main