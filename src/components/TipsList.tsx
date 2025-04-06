import useContextPro from "../hooks/useContextPro"
import {FaPhone, FaMapMarkerAlt, FaTrash, FaTrashAlt, FaUser} from 'react-icons/fa';

function TipsList() {
    const { state: { tips }, dispatch } = useContextPro()

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-success fw-bold mb-0">My Contacts</h2>
                <span className="badge bg-success bg-opacity-10 text-success py-2 px-3 rounded-pill">
            {tips.length} contacts
        </span>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {tips.map((tip) => (
                    <div key={tip.id} className="col">
                        <div className="card h-100 border border-2 border-success border-opacity-10 hover-shadow-lg">
                            <div className="card-body p-4">

                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3 d-flex align-items-center justify-content-center">
                                        <FaUser className="text-success fs-5" />
                                    </div>
                                    <div>
                                        <h5 className="card-title fw-bold mb-0 text-success">{tip.name}</h5>
                                        <p className="text-muted mb-0">{tip.lastName}</p>
                                    </div>
                                </div>


                                <hr className="border-success border-opacity-25 my-3" />


                                <div className="contact-details">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-success bg-opacity-10 p-2 rounded me-3">
                                            <FaPhone className="text-success" />
                                        </div>
                                        <span className="text-dark">{tip.phone}</span>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="bg-success bg-opacity-10 p-2 rounded me-3">
                                            <FaMapMarkerAlt className="text-success" />
                                        </div>
                                        <span className="text-dark">{tip.address}</span>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end mt-4">
                                    <button
                                        className="btn btn-outline-danger btn-sm rounded-pill d-flex align-items-center px-3"
                                        onClick={() => dispatch({ type: "DELETE", payload: tip.id })}
                                    >
                                        <FaTrash className="me-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {tips.length > 0 && (
                <div className="d-flex justify-content-end mt-5">
                    <button
                        onClick={() => dispatch({type: "DELETE_ALL"})}
                        className="btn btn-danger rounded-pill px-4 py-2 d-flex align-items-center shadow-sm"
                    >
                        <FaTrashAlt className="me-2" />
                        Delete All
                    </button>
                </div>
            )}
        </div>
    )
}

export default TipsList