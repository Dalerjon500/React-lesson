import { FaUser, FaEnvelope, FaUserShield, FaEdit, FaLock, FaCamera, FaStar, FaShieldAlt,FaInfoCircle} from 'react-icons/fa';
import useContextPro from '../../hooks/useContextPro';
import ProfileForm from './ProfileForm';
import { ChangeEvent, useState } from 'react';
import apiClient from '../../apiClient/ApiClient';
import { toast } from 'react-toastify';
import PasswordForm from './PasswordForm';

interface ProfileData {
    name: string;
    email: string;
}

function Profile() {
    const { state: { user }, dispatch } = useContextPro();
    const [open, setOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handlePasswordClose = () => setPasswordOpen(false);

    const handleEdit = async (data: ProfileData) => {
        try {
            const updateData = {
                name: data.name,
                email: data.email,
            };

            const response = await apiClient.patch(`/users/${user?.id}`, updateData);
            dispatch({ type: 'EDIT_USER', payload: response.data });
            toast.success('Profile updated successfully!');
            return true;
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update profile');
            throw error;
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            toast.info('Rasm tanlandi (serverga yuklanmadi)');
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: 880 }}>
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div
                    className="text-white text-center py-5 position-relative"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(13, 110, 253, 0.85), rgba(13, 110, 253, 0.85)), url(https://wp-s.ru/wallpapers/14/2/440061205112783/biznes-set-v-rukax-umnogo-marketologa.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay'
                    }}
                >
                    <div className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-white text-primary fw-semibold px-3 py-2">
              <FaStar className="me-1" />
              Premium Member
            </span>
                    </div>

                    <div className="d-flex justify-content-center mb-4 position-relative">
                        <label
                            htmlFor="image-upload"
                            className="rounded-circle bg-white text-primary shadow d-flex justify-content-center align-items-center position-relative hover-effect"
                            style={{
                                width: 140,
                                height: 140,
                                fontSize: 48,
                                border: '6px solid rgba(255, 255, 255, 0.3)',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile"
                                    className="w-100 h-100 object-cover"
                                />
                            ) : user?.name ? (
                                <span className="text-gradient-primary" style={{
                                    background: 'linear-gradient(45deg, #0d6efd, #00b4d8)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 'bold'
                                }}>
                  {user.name.charAt(0)}
                </span>
                            ) : (
                                <FaUser className="text-gradient-primary" />
                            )}
                            <div className="position-absolute rounded-circle bg-white p-2 shadow-sm" style={{
                                bottom: "5px",
                                right: "15px",
                                zIndex: "1000",
                                width: '36px',
                                height: '36px',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: 'all 0.3s ease'
                            }}>
                                <FaCamera className="text-primary" size={16}/>
                            </div>
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="d-none"
                        />
                    </div>
                    <h2 className="fw-bold mb-1 text-white">{user?.name || 'No name'}</h2>
                    <p className="opacity-85 mb-0 text-white">{user?.email || 'No email'}</p>
                    <div className="d-flex justify-content-center mt-3">
            <span className="badge bg-white text-primary fw-semibold px-3 py-2">
              <FaShieldAlt className="me-1" />
              Verified Account
            </span>
                    </div>
                </div>
                <div className="card-body px-4 py-5">
                    <div className="mb-5">
                        <h5 className="mb-3 text-primary fw-bold d-flex align-items-center">
                            <FaUser className="me-2 fs-4" />
                            <span className="border-bottom border-primary pb-1">Personal Information</span>
                        </h5>
                        <hr className="my-3" />
                        <div className="row gy-4">
                            <div className="col-md-6 d-flex">
                                <div className="bg-light rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                    <FaUser className="text-primary" />
                                </div>
                                <div>
                                    <div className="text-muted small mb-1">Full Name</div>
                                    <div className="fw-semibold fs-5">{user?.name || 'Not specified'}</div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex">
                                <div className="bg-light rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                    <FaEnvelope className="text-primary" />
                                </div>
                                <div>
                                    <div className="text-muted small mb-1">Email</div>
                                    <div className="fw-semibold fs-5">{user?.email || 'Not specified'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h5 className="mb-3 text-primary fw-bold d-flex align-items-center">
                            <FaUserShield className="me-2 fs-4" />
                            <span className="border-bottom border-primary pb-1">Account Roles</span>
                        </h5>
                        <hr className="my-3" />
                        <p className="mb-3 text-muted">Your account permissions and access levels:</p>
                        <div className="d-flex flex-wrap gap-3">
                            {user?.roles?.length ? (
                                user.roles.map(role => (
                                    <span
                                        key={role}
                                        className="badge rounded-pill bg-light text-primary border border-primary border-2 fw-semibold px-4 py-2 d-flex align-items-center"
                                        style={{
                                            textTransform: 'capitalize',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                    <FaUserShield className="me-2 flex-shrink-0" />
                                        {role.replace('_', ' ')}
                  </span>
                                ))
                            ) : (
                                <div className="alert alert-light d-flex align-items-center" role="alert">
                                    <FaInfoCircle className="me-2 text-secondary" />
                                    <span className="text-muted">No roles assigned to your account</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-light p-4 d-flex justify-content-center gap-3 flex-wrap">
                    <button
                        onClick={handleOpen}
                        className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm d-flex align-items-center"
                        style={{
                            background: 'linear-gradient(45deg, #0d6efd, #00b4d8)',
                            border: 'none',
                            minWidth: '180px'
                        }}
                    >
                        <FaEdit className="me-2" />
                        Edit Profile
                    </button>
                    <button
                        onClick={() => setPasswordOpen(true)}
                        className="btn btn-outline-primary btn-lg rounded-pill px-4 shadow-sm d-flex align-items-center"
                        style={{
                            borderWidth: '2px',
                            minWidth: '180px'
                        }}
                    >
                        <FaLock className="me-2" />
                        Change Password
                    </button>
                </div>
            </div>

            <ProfileForm open={open} onClose={handleClose} handleEdit={handleEdit} />
            <PasswordForm passwordOpen={passwordOpen} handlePasswordClose={handlePasswordClose}/>
        </div>
    );
}

export default Profile;