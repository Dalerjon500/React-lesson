import img1 from '../assets/Group 192.png'
import img2 from '../assets/Group 191.png'
import tirnoqcha from '../assets/tirnoqcha.png'
function SectionHappyClients() {
    return (
        <div className="section-happy-clients" id="feedback">
            <div className='container'>
                <div className="left-side" data-aos="fade-up"
                     data-aos-anchor-placement="bottom-bottom" >
                    <h1>What Our Happy <br />
                        Clients Say
                    </h1>
                    <p>randomised words which don't look even <br />
                        slightly believable.
                    </p>
                </div>
                <div className="right-side" data-aos="fade-up"
                     data-aos-anchor-placement="bottom-bottom">
                    <div className='d-flex align-items-center justify-content-between'>
                        <img src={tirnoqcha} alt="" />
                        <img src={img1} alt="" />
                    </div>
                    <img src={img2} alt="" />
                </div>
            </div>
        </div>
    )
}

export default SectionHappyClients