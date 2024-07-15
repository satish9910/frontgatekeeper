import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppSidebar, AppHeader } from '../../../components/index';
import { Table } from 'reactstrap';
import CIcon from '@coreui/icons-react';
import { cilCheckAlt, cilX } from '@coreui/icons';

const ServiceDetails = () => {
    const [services, setServices] = useState([]);
    const token = localStorage.getItem('token');
    const { id } = useParams();

    async function getServices() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/getAllServicesByVendorId/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response data:', res.data);
            setServices(res.data.services);
        } catch (error) {
            console.error('Failed to fetch service details:', error);
        }
    }

    async function activateService(serviceId) {
        try {
            await axios.patch(`http://103.189.172.112:5000/admin/activateService/${serviceId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getServices(); // Refresh the services list
        } catch (error) {
            console.error('Failed to activate service:', error);
        }
    }

    async function deactivateService(serviceId) {
        try {
            await axios.patch(`http://103.189.172.112:5000/admin/deactivateService/${serviceId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getServices(); // Refresh the services list
        } catch (error) {
            console.error('Failed to deactivate service:', error);
        }
    }

    useEffect(() => {
        getServices();
    }, [id]);

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-4'>SERVICE DETAILS</h4>
                        {services.length === 0 && <div className="d-flex justify-content-center">
                            <h4>No Service Details Found</h4>
                        </div>}
                        {services.length > 0 && (
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Sub Sub Category</th>
                                        <th>Service Description</th>
                                        <th>Price</th>
                                        <th>Vendor Email</th>
                                        <th>Vendor Mobile</th>
                                        <th>Date</th>
                                        <th>Is Active</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map(service => (
                                        <tr key={service._id}>
                                            <td>{service.servicename || 'N/A'}</td>
                                            <td>{service.title || 'N/A'}</td>
                                            <td>{service.catergory || 'N/A'}</td>
                                            <td>{service.subCatergory || 'N/A'}</td>
                                            <td>{service.subSubCatergory || 'N/A'}</td>
                                            <td>{service.servicedescription || 'N/A'}</td>
                                            <td>{service.price != null ? service.price : 'N/A'}</td>
                                            <td>{service.vendoremail || 'N/A'}</td>
                                            <td>{service.vendoreMobile || 'N/A'}</td>
                                            <td>{service.date ? new Date(service.date).toLocaleDateString() : 'N/A'}</td>
                                            <td>{service.isActive ? 'Yes' : 'No'}</td>
                                            <td>
                                                {service.isActive ? (
                                                    <button className='border-0 bg-danger rounded-1' onClick={() => deactivateService(service._id)}>
                                                        <CIcon icon={cilX} />
                                                    </button>
                                                ) : (
                                                    <button className='border-0 bg-primary rounded-1' onClick={() => activateService(service._id)}>
                                                        <CIcon icon={cilCheckAlt} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceDetails;
