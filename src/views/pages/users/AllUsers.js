import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import CIcon from '@coreui/icons-react';
import { cilCheck, cilPaperPlane } from '@coreui/icons';
import { AppSidebar, AppHeader } from '../../../components/index'

const AllUsers = () => {
    const [services, setServices] = useState([]);
    const token = localStorage.getItem('token')
    async function getUsers() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/FetchAllUsers`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const ser = res.data.users;
        setServices(ser);
    }

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                size: 150,
            },
            {
                header: 'Email',
                accessorKey: 'email',
                size: 150,
            },
            {
                header: 'Coins',
                accessorKey: 'totalCoins',
                size: 60,
            }
        ],
        [],
    );

    useEffect(() => {
        getUsers();
    }, [])

    const table = useMantineReactTable({
        columns,
        data: services,
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
    )
}
export default AllUsers
