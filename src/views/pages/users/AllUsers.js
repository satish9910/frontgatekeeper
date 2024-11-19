import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import CIcon from '@coreui/icons-react';
import { cilPaperPlane, cilTrash } from '@coreui/icons';
import { AppSidebar, AppHeader } from '../../../components/index';

const AllUsers = () => {
    const [services, setServices] = useState([]);
    const token = localStorage.getItem('token');

    async function getUsers() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        // Assuming the response has the users array
        const usersData = res.data.users;
        setServices(usersData);  // Set the response users data to services
    }

    async function handleDelete(id) {
        const confirmed = confirm('Confirm to delete?');
        if (confirmed) {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}admin/switch/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                getUsers();  // Refresh the user list after deletion
            }
        }
    }

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',  // Corresponds to the 'name' field in the API response
                size: 150,
            },
            {
                header: 'Mobile',
                accessorKey: 'phone',  // Use 'phone' instead of 'mobile' to match the response
                size: 150,
            },
            {
                header: 'EmployeeId',
                accessorKey: 'employeeId',  // Assuming 'employeeId' exists in the response (if not, remove this column)
                size: 60,
            },
            {
                header: 'Edit',
                size: 60,
                accessorFn: (dataRow) => <Link to={`/user/orders/${dataRow._id}`}><CIcon icon={cilPaperPlane} /></Link>
            },
            {
                header: 'Delete',
                size: 60,
                accessorFn: (dataRow) => <CIcon icon={cilTrash} onClick={() => handleDelete(dataRow._id)} style={{cursor: 'pointer', color: "red"}}/>
            },
        ],
        [],
    );

    useEffect(() => {
        getUsers();  // Fetch users when the component mounts
    }, []);

    const table = useMantineReactTable({
        columns,
        data: services,  // Set data to services (user data)
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableGlobalFilter: true,
        enableFullScreenToggle: false,
        initialState: { density: 'xs' },
    });

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3 mb-2'>
                        <h4 className='mb-2'>ALL USERS</h4>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllUsers;
