import { useState, useEffect } from 'react';
import { Service } from '../home/Home';
import AdminServicesForm from './AdminServicesForm';
import apiClient from '../../apiClient/ApiClient';

function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const handleClose = () => {
        setOpen(false);
        setSelectedService(null);
    };

    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        try {
            const response = await apiClient.get('/services');
            setServices(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteService = async (id: number | undefined) => {
        try {
            await apiClient.delete(`/services/${id}`);
            getServices();
        } catch (err) {
            console.log(err);
        }
    };

    const addService = async (data: Omit<Service, "id">) => {
        try {
            const response = await apiClient.post(`/services`, data);
            setServices([...services, response.data]);
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    const updateService = async (data: Service) => {
        try {
            await apiClient.put(`/services/${data.id}`, data);
            getServices();
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpenAdd = () => {
        setSelectedService(null);
        setOpen(true);
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setOpen(true);
    };

    return (
        <div className="admin-services p-4 rounded-4" style={{ backgroundColor: '#121212', color: '#fff' }}>
            <div className="admin-header d-flex justify-content-between align-items-center mb-5">
                <h2 className="display-5 fw-bold" style={{
                    background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    <i className="bi bi-gear-fill me-3"></i>
                    Service Management
                </h2>
                <button
                    className="btn px-4 py-2 fw-medium d-flex align-items-center"
                    onClick={handleOpenAdd}
                    style={{
                        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                        color: '#fff',
                        border: 'none',
                        boxShadow: '0 4px 8px rgba(0, 123, 255, 0.3)'
                    }}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Service
                </button>
            </div>

            <AdminServicesForm
                open={open}
                onClose={handleClose}
                addService={addService}
                updateService={updateService}
                selectedService={selectedService}
            />

            <div className="services-table mt-4 p-4 rounded-4" style={{ backgroundColor: '#1e1e1e', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                <div className="table-responsive">
                    <table className='table table-dark table-hover align-middle mb-0'>
                        <thead>
                        <tr style={{ backgroundColor: '#2c2c2c' }}>
                            <th className='ps-4'>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th className='text-end pe-4'>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {services.map(service => (
                            <tr key={service.id}>
                                <td className='ps-4 fw-semibold'>{service.id}</td>
                                <td>
                                    <div className='service-image-container'>
                                        <img
                                            src={service.imgUrl}
                                            alt={service.name}
                                            className='service-image rounded'
                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                        />
                                    </div>
                                </td>
                                <td className='fw-medium'>{service.name}</td>
                                <td>
                                    <div className='text-truncate' style={{ maxWidth: '200px' }}>
                                        {service.description}
                                    </div>
                                </td>
                                <td className="actions text-end pe-4">
                                    <button
                                        className="btn btn-sm btn-outline-warning me-2"
                                        onClick={() => handleEdit(service)}
                                    >
                                        <i className="bi bi-pencil-square me-1"></i>
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => deleteService(service.id)}
                                    >
                                        <i className="bi bi-trash me-1"></i>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminServices;
