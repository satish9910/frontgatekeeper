import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CButton, CListGroup, CListGroupItem } from '@coreui/react';

const KycDetails = () => {
    const [details, setDetails] = React.useState({})
    const [document, setDocument] = React.useState('')
    const token = localStorage.getItem('token')
    const id = useParams().id
    async function getKycDetails() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/fetchKycByVendorId/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setDetails(res.data.kyc)
        setDocument(res.data.kyc.document[0])
    }

    useEffect(() => {
        getKycDetails()
    }, [])

    async function accept(){
        const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}admin/completeKycByVendorId/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(res.status === 200){
            alert('Accepted')
            return
        }
        alert('Failed to Accept')
        return
    }

    async function reject(){
        const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}admin/rejectKycByVendorId/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(res.status === 200){
            alert('Rejected')
            return
        }
        alert('Failed to Reject')
        return
    }

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-4'>KYC DETAILS</h4>
                        {!details._id && <div className="d-flex justify-content-center">
                            <h4>No KYC Details Found</h4>
                        </div>}
                        {details._id && <div className="row justify-content-center">
                            <div className="d-flex gap-2">
                                <CListGroup>
                                    <CListGroupItem>Name</CListGroupItem>
                                    <CListGroupItem>Phone</CListGroupItem>
                                    <CListGroupItem>Alternate Phone</CListGroupItem>
                                    <CListGroupItem>Email</CListGroupItem>
                                    <CListGroupItem>Alternate Email</CListGroupItem>
                                    <CListGroupItem>Address</CListGroupItem>
                                    <CListGroupItem>Pincode</CListGroupItem>
                                </CListGroup>
                                <CListGroup>
                                    <CListGroupItem>{details.name}</CListGroupItem>
                                    <CListGroupItem>{details.mobile}</CListGroupItem>
                                    <CListGroupItem>{details.alternatephone}</CListGroupItem>
                                    <CListGroupItem>{details.email}</CListGroupItem>
                                    <CListGroupItem>{details.alternateemail}</CListGroupItem>
                                    <CListGroupItem>{details.homeaddress}</CListGroupItem>
                                    <CListGroupItem>{details.pincode}</CListGroupItem>

                                </CListGroup>

                                <div style={{ width: '350px' }}>
                                    <img src={`http://103.189.172.112:5000`+ document.path} alt="kyc" width={'100%'}  />
                                </div>

                            </div>
                        </div>}
                        {
                            details._id && details.status === 'pending' &&
                            <div className='d-flex gap-4 mt-5'>
                            <CButton color='primary' className='mt-4' onClick={accept}>Accept</CButton>
                            <CButton color='secondary' className='mt-4' onClick={reject}>Reject</CButton>
                        </div>
                        }
                        {
                            details._id && details.status === 'completed' &&
                            <div className=" mt-5">
                            <h4>User Verified</h4>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default KycDetails