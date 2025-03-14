import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        country: "Uzbekistan",
    });

    const [submittedData, setSubmittedData] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenderChange = (gender) => {
        setFormData({ ...formData, gender });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData([...submittedData, formData]);
        setFormData({ firstname: "", lastname: "", age: "", gender: "", country: "Uzbekistan" });
    };

    return (
        <div className="container mt-4 p-4 border rounded shadow-lg">
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control" name="firstname" placeholder="Firstname" value={formData.firstname} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name="lastname" placeholder="Lastname" value={formData.lastname} onChange={handleChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="number" className="form-control" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <select name="country" className="form-select" value={formData.country} onChange={handleChange}>
                            <option>Uzbekistan</option>
                            <option>Russia</option>
                            <option>USA</option>
                            <option>Germany</option>
                            <option>France</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" checked={formData.gender === "erkak"} onChange={() => handleGenderChange("erkak")} />
                        <label className="form-check-label">Erkak <i className="bi bi-person-standing"></i></label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" checked={formData.gender === "ayol"} onChange={() => handleGenderChange("ayol")} />
                        <label className="form-check-label">Ayol <i className="bi bi-person-standing-dress"></i></label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {submittedData.length > 0 && (
                <div className="mt-4">
                    <h3>Jadvalcha</h3>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Country</th>
                        </tr>
                        </thead>
                        <tbody>
                        {submittedData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.firstname}</td>
                                <td>{data.lastname}</td>
                                <td>{data.age}</td>
                                <td>{data.gender}</td>
                                <td>{data.country}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
export default App;