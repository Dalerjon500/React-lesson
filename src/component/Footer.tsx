
import Logo from "../assets/Agency (1).svg"
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer" id="contact">
            <div className="footer__container" >
                <div className="footer__column">
                    <img src={Logo} alt="#" />
                    <p>
                        Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text.
                        It Has Roots In A Piece Of Classical Latin Literature.
                    </p>
                </div>
                <div className="footer__column">
                    <h4>About</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Features</li>
                        <li>News</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div className="footer__column">
                    <h4>Company</h4>
                    <ul>
                        <li>Our Team</li>
                        <li>Partner With Us</li>
                        <li>FAQ</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className="footer__column">
                    <h4>Support</h4>
                    <ul>
                        <li>Account</li>
                        <li>Support Center</li>
                        <li>Feedback</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="footer__column">
                    <h4>Get In Touch</h4>
                    <p>Have a question or feedback? We'd love to hear from you.</p>
                    <div className="footer__social-icons">
                        <span className="icon"> <FaPinterestP /></span>
                        <span className="icon"> <FaInstagram /></span>
                        <span className="icon"> <FaFacebookF /></span>
                        <span className="icon"> <FaYoutube /></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
