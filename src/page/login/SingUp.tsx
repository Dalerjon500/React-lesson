import { FaArrowRight, FaEnvelope, FaLock, FaUser } from "react-icons/fa"
import { FieldValues, useForm } from "react-hook-form"
import apiClient from "../../apiClient/ApiClient"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function SingUp() {

    const {register, handleSubmit, formState: { errors }, reset} = useForm()
    const navigate = useNavigate()

    const checkUser = async (data: FieldValues) => {
        apiClient.get(`/users?email=${data.email}`).then((res) => {
            if (res.data.length > 0) {
                toast.error("User already exists")
            } else {
                regiterUser(data)
            }
        })
    }

    const regiterUser = async (data: FieldValues) => {
        apiClient.post("/users", {...data, role: "USER"}).then((res) => {
            console.log(res)
            navigate("/login")
            toast.success("User registered successfully")
            reset()
        }).catch((err) => {
            toast.error("Error registering user")
            console.log(err)
        })
    }

    return (
        <div className="login d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#f0f2f5' }}>
            <div className="login-form bg-white p-4 p-md-5 rounded-3 shadow-sm" style={{ width: '100%', maxWidth: '500px', border: '1px solid rgba(0,0,0,0.1)' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: '#6366f1' }}>Create Your Account</h2>
                    <p className="text-muted">Join our community today</p>
                </div>

                <form onSubmit={handleSubmit(checkUser)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                        <div className="input-group">
                        <span className="input-group-text bg-transparent" style={{ borderRight: 'none' }}>
                            <FaUser style={{ color: '#6366f1' }} />
                        </span>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                className="form-control border-start-0"
                                id="name"
                                placeholder="John Doe"
                            />
                        </div>
                        {errors.name && <p className="text-danger mt-1">Name is required</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                        <div className="input-group">
                        <span className="input-group-text bg-transparent" style={{ borderRight: 'none' }}>
                            <FaEnvelope style={{ color: '#6366f1' }} />
                        </span>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                className="form-control border-start-0"
                                id="email"
                                placeholder="john@example.com"
                            />
                        </div>
                        {errors.email && <p className="text-danger mt-1">Email is required</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <div className="input-group">
                        <span className="input-group-text bg-transparent" style={{ borderRight: 'none' }}>
                            <FaLock style={{ color: '#6366f1' }} />
                        </span>
                            <input
                                {...register("password" , { required: true , minLength: 8})}
                                type="password"
                                className="form-control border-start-0"
                                id="password"
                                placeholder="At least 8 characters"
                            />
                        </div>
                        {errors.password && <p className="text-danger mt-1">Password is required</p>}
                        <div className="form-text">Must be at least 8 characters</div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="form-label fw-semibold">Confirm Password</label>
                        <div className="input-group">
                        <span className="input-group-text bg-transparent" style={{ borderRight: 'none' }}>
                            <FaLock style={{ color: '#6366f1' }} />
                        </span>
                            <input
                                {...register("confirmPassword", {
                                    required: true
                                })}
                                type="password"
                                className="form-control border-start-0"
                                id="confirm-password"
                                placeholder="Re-enter your password"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                        style={{
                            backgroundColor: '#6366f1',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px rgba(99, 102, 241, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#4f46e5';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 8px rgba(99, 102, 241, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#6366f1';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(99, 102, 241, 0.3)';
                        }}
                    >
                        Sign Up <FaArrowRight />
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-muted small mb-0">
                            Already have an account?
                            <Link to="/login" style={{ color: '#6366f1', cursor: 'pointer' , marginLeft: '5px' }}>Log in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingUp