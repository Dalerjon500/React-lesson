import { FaUser, FaUserTie, FaPhoneAlt, FaMapMarkerAlt} from "react-icons/fa";

function TipsForm() {
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-3 text-success">
                    Tips
                </h2>

            </div>

            <form className="p-4 p-md-5 rounded-4 bg-success bg-opacity-10 border border-success border-opacity-25 shadow-sm">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control border-success border-opacity-50"
                                id="name"
                                placeholder="John"
                                required
                            />
                            <label htmlFor="name" className="text-success">
                                <FaUser className="me-2" /> Name
                            </label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control border-success border-opacity-50"
                                id="lastName"
                                placeholder="Doe"
                                required
                            />
                            <label htmlFor="lastName" className="text-success">
                                <FaUserTie className="me-2" /> Last Name
                            </label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="tel"
                                className="form-control border-success border-opacity-50"
                                id="phone"
                                placeholder="+123456789"
                            />
                            <label htmlFor="phone" className="text-success">
                                <FaPhoneAlt className="me-2" /> Phone
                            </label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control border-success border-opacity-50"
                                id="address"
                                placeholder="123 Main St"
                            />
                            <label htmlFor="address" className="text-success">
                                <FaMapMarkerAlt className="me-2" /> Address
                            </label>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <button
                        type="submit"
                        className="btn btn-success btn-lg px-5 py-3 rounded-pill fw-bold"
                    >
                         Submit Form
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TipsForm






