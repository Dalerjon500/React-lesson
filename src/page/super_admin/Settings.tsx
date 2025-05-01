import { FaUser, FaEnvelope,FaSave, FaUserPlus, FaUserTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { User } from '../../App';
import apiClient from '../../apiClient/ApiClient';
import Select, { MultiValue } from 'react-select';
import { getRoleBadge } from './GetBadgeFunction';
import { toast } from 'react-toastify';
import AddNewUser from './AddNewUser';

function Settings() {
    const [users, setUsers] = useState<User[]>([]);
    const [editedRoles, setEditedRoles] = useState<{ [key: string]: string[] }>({});
    const [isSaving, setIsSaving] = useState<{ [key: string]: boolean }>({});
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getUsers();
    }, []);

    const handleClose = () => setOpen(false);

    const roleOptions = [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'USER', label: 'User' }
    ];

    const getUsers = async () => {
        try {
            const response = await apiClient.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleRoleChange = (userId: string, newRoles: MultiValue<{ value: string; label: string }>) => {
        setEditedRoles(prev => ({ ...prev, [userId]: newRoles.map(role => role.value) }));
    };

    const saveRoleChange = async (userId: string) => {
        const newRoles = editedRoles[userId];
        if (!newRoles) return;
        setIsSaving(prev => ({ ...prev, [userId]: true }));
        try {
            await apiClient.patch(`/users/${userId}`, { roles: newRoles });
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === userId ? { ...user, roles: newRoles as ("ADMIN" | "USER" | "SUPER_ADMIN")[] } : user
                )
            );
            setEditedRoles(prev => {
                const updated = { ...prev };
                delete updated[userId];
                return updated;
            });
            setIsSaving(prev => ({ ...prev, [userId]: false }));
            toast.success('Roles updated successfully!');
        } catch (error) {
            console.error('Error updating roles:', error);
        }
    };

    const addNewUsers = async (newUser: User) => {
        try {
            await apiClient.post('/users', newUser);
            toast.success('User added successfully!');
            setUsers(prevUsers => [...prevUsers, newUser]);
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Failed to add user!');
        }
    };

    const deleteUsers = async (userId: string) => {
        try {
            await apiClient.delete(`/users/${userId}`);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            toast.success('User deleted successfully!');
        }
        catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user!');
        }
    };

    return (
        <div className="settings-container container py-5">
            <div className="row mb-4 align-items-center p-3">
                <div className="col-md-6">
                    <h1 className="fw-bold text-primary mb-3 ">
                        <FaUser className="me-3" />
                        User Management
                    </h1>
                    <p className="text-muted ">Manage team members and their permissions</p>
                </div>
                <div className="col-md-6 text-md-end">
                    <button
                        className="btn btn-primary px-4 py-2"
                        onClick={() => setOpen(true)}
                    >
                        <FaUserPlus className="me-2" />
                        Add User
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-12 mb-4 ">
                    <div className="card shadow-sm border-0">
                        <div className="card-body" style={{ borderRadius: '0.5rem' }}>
                            <div className="table-responsive">
                                <table className="table align-middle table-hover">
                                    <thead className="table-light">
                                    <tr>
                                        <th style={{ width: '50px' }}></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Current Roles</th>
                                        <th>Edit Roles</th>
                                        <th style={{ width: '180px' }}>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <div
                                                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto"
                                                    style={{ width: '40px', height: '40px' }}
                                                >
                                                    <FaUser size={16} />
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="mb-0 fw-bold">{user.name}</h6>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <FaEnvelope className="text-muted me-2" size={14} />
                                                    <span>{user.email}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {getRoleBadge(user.roles)}
                                                </div>
                                            </td>
                                            <td style={{ minWidth: '200px'}} >
                                                <Select
                                                    isMulti
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    options={roleOptions}
                                                    value={roleOptions.filter(option => (editedRoles[user.id] || user.roles).includes(option.value))}
                                                    onChange={(selectedOptions) => handleRoleChange(user.id, selectedOptions || [])}
                                                    styles={{
                                                        control: (base) => ({
                                                            ...base,
                                                            minHeight: '38px',
                                                            boxShadow: 'none',
                                                            borderColor: '#dee2e6',
                                                            '&:hover': {
                                                                borderColor: '#adb5bd'
                                                            }
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => saveRoleChange(user.id)}
                                                        className="btn btn-sm btn-outline-primary px-3"
                                                        disabled={isSaving[user.id]}
                                                        style={{ minWidth: '80px' }}
                                                    >
                                                        {isSaving[user.id] ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                                Saving
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaSave className="me-1" /> Save
                                                            </>
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => deleteUsers(user.id)}
                                                        disabled={isSaving[user.id]}
                                                        className="btn btn-sm btn-outline-danger px-3"
                                                        style={{ minWidth: '80px' }}
                                                    >
                                                        <FaUserTimes className="me-1" /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddNewUser open={open} onClose={handleClose} addNewUsers={addNewUsers} />
        </div>
    );
}

export default Settings;