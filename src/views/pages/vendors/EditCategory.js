import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EditCategory = () => {
    const [category, setCategory] = useState({})
    const [subcategory, setSubCategory] = useState('')
    const { id } = useParams();
    const token = localStorage.getItem('token')

    async function handleAddSubCategory(e) {
        e.preventDefault()
        if (!subcategory) {
            alert('Please fill all fields')
            return
        }
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/createSubCatergory`, {
            catergoryType: category.catergorytype,
            subCatergoryType: subcategory
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res);
    }

    useEffect(() => {
        async function getCategory() {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/fetchCatergoryById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategory(res.data.catergory)
        }
        getCategory()
    }, [])

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-2'>ADD SUB CATEGORY</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <CForm className="p-4 rounded shadow-sm">
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="catergorytype" className="form-label">Category</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="catergorytype"
                                            placeholder="Category Name"
                                            value={category.catergorytype}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CFormLabel htmlFor="subcategory" className="form-label">Sub Category</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="subcategory"
                                            placeholder="Sub Category"
                                            className="form-control"
                                            onChange={(e) => setSubCategory(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" onClick={handleAddSubCategory} className="btn btn-primary">
                                        Add
                                    </button>
                                </CForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCategory