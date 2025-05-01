
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../../apiClient/ApiClient';
import { toast } from 'react-toastify';
import { User } from '../../App';


const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const Login = (data: FieldValues) => {
        apiClient.get<User[]>(`/users?email=${data.email}`).then((res) => {
            if (res.data.length > 0) {
                const user = res.data[0];
                if(res.data[0].password === data.password){
                    toast.success("User logged in successfully")
                    localStorage.setItem("token", user.id)
                    navigate("/admin")
                }else{
                    toast.error("Wrong password")
                }
            } else{
                toast.error("User with this email does not exist")
            }
        })
    };

    return (
        <div className="login d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#e9ecef' }}>
            <div className="login-form bg-white p-5 rounded shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <h1 className="text-center mb-4" style={{ color: '#4a69bd', fontWeight: 'bold' }}>Login</h1>
                <form onSubmit={handleSubmit(Login)}>
                    <div className="mb-3 position-relative">
                        <label htmlFor="email" className="form-label" style={{ fontWeight: '500' }}>Email</label>
                        <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: '#4a69bd', color: 'white' }}>
                <FaEnvelope />
              </span>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                {...register('email', { required: true })}
                                style={{ borderLeft: 'none', boxShadow: 'none' }}
                            />
                        </div>
                    </div>

                    <div className="mb-4 position-relative">
                        <label htmlFor="password" className="form-label" style={{ fontWeight: '500' }}>Password</label>
                        <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: '#4a69bd', color: 'white' }}>
                <FaLock />
              </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                {...register('password', { required: true })}
                                style={{ borderLeft: 'none', boxShadow: 'none' }}
                            />
                        </div>
                    </div>

                    <div className="mb-4 position-relative">
                        <label htmlFor="confirm-password" className="form-label" style={{ fontWeight: '500' }}>Confirm Password</label>
                        <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: '#4a69bd', color: 'white' }}>
                <FaLock />
              </span>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm-password"
                                placeholder="Confirm your password"
                                {...register('confirmPassword', { required: true })}
                                style={{ borderLeft: 'none', boxShadow: 'none' }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 py-2 d-flex align-items-center justify-content-center"
                        style={{
                            backgroundColor: '#4a69bd',
                            color: 'white',
                            fontWeight: '500',
                            borderRadius: '5px',
                            transition: 'all 0.3s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3b5998')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4a69bd')}
                    >
                        Login <FaArrowRight className="ms-2" />
                    </button>

                    <p className="text-center mt-4" style={{ fontSize: '0.9rem' }}>
                        Don't have an account?{' '}
                        <NavLink to="/sign-up" style={{ color: '#4a69bd', fontWeight: '500' }}>
                            Sign Up
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
