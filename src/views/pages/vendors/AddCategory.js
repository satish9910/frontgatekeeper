import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

const AddCategory = () => {
    const [formData, setFormData] = useState({})
    const [categories, setCategories] = useState([])
    const token = localStorage.getItem('token')

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleFileChange(e) {
        const { name, files } = e.target
        setFormData({
            ...formData,
            [name]: files[0]
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formData, 'formData');
        if (!formData.catergorytype || !formData.startcolor || !formData.endcolor || !formData.icon) {
            alert('Please fill all fields')
            return
        }
        const formDataToSend = new FormData()
        formDataToSend.append('catergorytype', formData.catergorytype)
        formDataToSend.append('startcolor', formData.startcolor)
        formDataToSend.append('endcolor', formData.endcolor)
        formDataToSend.append('icon', formData.icon)


        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/addCatergory`, formDataToSend, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res);
        if (res.status === 200) {
            alert('Added')
            return
        }
        alert('Not added')
        return
    }

    async function getCategories() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/getAllCatergories`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setCategories(res.data.catergories)
    }

    async function handleDelete(id) {
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/deleteCatergory/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            alert('Deleted')
            getCategories()
            return
        }
        alert('Not Deleted')
        return
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-2'>ADD CATEGORY</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <CForm className="p-4 rounded shadow-sm">
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="catergorytype" className="form-label">Category</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="catergorytype"
                                            placeholder="Category Name"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="startcolor" className="form-label">Start Color</label>
                                        <input
                                            type="color"
                                            name="startcolor"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="endcolor" className="form-label">End Color</label>
                                        <input
                                            type="color"
                                            name="endcolor"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="icon" className="form-label">Icon</label>
                                        <input
                                            type="file"
                                            name="icon"
                                            placeholder="Icon"
                                            className="form-control"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                                        Submit
                                    </button>
                                </CForm>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <h4 className='mb-2 mt-4'>ALL CATEGORIES</h4>
                            <div className='row gap-4'>
                                {
                                    categories?.map((item, index) => (
                                        <div key={index} className="card mb-2 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="card-body">
                                                <h6 className="card-title">{item.catergorytype}</h6>
                                                <button className="btn btn-danger text-white" onClick={() => handleDelete(item._id)}><CIcon icon={cilTrash} /></button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory