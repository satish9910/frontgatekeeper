import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
} from '@coreui/react'
import axios from 'axios'

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalVendors, setTotalVendors] = useState(0)

  useEffect(() => {
    async function fetchUsersAndVendors() {
      const token = localStorage.getItem('token')
      const users = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/fetchAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log();
      setTotalUsers(users.data.users.length)
      const vendors = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/fetchAllVendors`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTotalVendors(vendors.data.vendors.length)
    }
    fetchUsersAndVendors()
  }, [])

  return (
    <>
      <CCard
        textBgColor={'primary'}
        className="mb-4 mt-3"
        style={{ maxWidth: '18rem' }}
      >
        <CCardHeader>Vendors</CCardHeader>
        <CCardBody>
          <CCardTitle>Vendors: {totalVendors}</CCardTitle>
        </CCardBody>
      </CCard>
      <CCard
        textBgColor={'secondary'}
        className="mb-3"
        style={{ maxWidth: '18rem' }}
      >
        <CCardHeader>Users</CCardHeader>
        <CCardBody>
          <CCardTitle>Users: {totalUsers} </CCardTitle>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
