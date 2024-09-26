import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import CIcon from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';
import { Modal, Button, Textarea, Select } from '@mantine/core';
import { AppSidebar, AppHeader } from '../../../components/index';
import dayjs from 'dayjs'; // To format dates

const Complaint = () => {
    const [complaints, setComplaints] = useState([]);
    const [opened, setOpened] = useState(false); // Modal state
    const [editData, setEditData] = useState(null); // Data for the user being edited
    const token = localStorage.getItem('token');

    // Fetch complaints data
    async function getComplaints() {
        const res = await axios.get('http://103.189.172.112:5000/admin/userComplaints', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log( res.data.complaints)
        setComplaints(res.data.complaints); // assuming res.data is an array of complaints
    }

    // Open the modal with complaint data for editing
    const handleEdit = (complaint) => {
        setEditData(complaint); // Set the selected complaint data
        setOpened(true); // Open the modal
    };

    // Handle status change for complaint
    const handleStatusChange = async (complaintId, status) => {
        try {
            await axios.patch(`http://103.189.172.112:5000/admin/completeUncompleteComplaint/${complaintId}`, {
                isResolved: status === 'true',
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getComplaints(); // Refresh the complaints list after updating status
        } catch (error) {
            console.error("Error updating complaint status:", error);
        }
    };

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorFn: (row) => row.userId.name, // Accessing nested data
                size: 150,
            },
            {
                header: 'Complaint',
                accessorKey: 'complaint',
                size: 200,
            },
            {
                header: 'Created Date',
                accessorFn: (row) => dayjs(row.createdAt).format('DD-MM-YYYY'),
                size: 150,
            },
            {
                header: 'Updated Date',
                accessorFn: (row) => dayjs(row.updatedAt).format('DD-MM-YYYY'),
                size: 150,
            },
            {
                header: 'Status',
                accessorFn: (row) => (
                    <Select
                        value={row.isResolved ? 'Complete' : 'Pending'}
                        onChange={(value) => handleStatusChange(row._id, value)}
                        data={[
                            { value: 'Complete', label: 'Complete' },
                            { value: 'Pending', label: 'Pending' },
                        ]}
                    />
                ),
                size: 150,
            },
            {
                header: 'Edit',
                size: 60,
                accessorFn: (row) => (
                    <CIcon
                        icon={cilPencil}
                        onClick={() => handleEdit(row)} // Open modal with edit data
                        style={{ cursor: 'pointer', color: 'blue' }}
                    />
                ),
            },
        ],
        [],
    );

    useEffect(() => {
        getComplaints();
    }, []);

    const table = useMantineReactTable({
        columns,
        data: complaints,
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
                    <div className="mx-3 mb-2">
                        <h4 className="mb-2">USER COMPLAINTS</h4>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>

           
            <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Complaint" centered>
                {editData && (
                    <div>
                        <Textarea
                            label="Complaint"
                            value={editData.complaint}
                            onChange={(e) =>
                                setEditData({ ...editData, complaint: e.target.value })
                            }
                            placeholder="Edit the complaint"
                        />

                       
                        {/* <Button onClick={() => setOpened(false)} className="mt-3">
                            Save Changes
                        </Button> */}
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Complaint;
