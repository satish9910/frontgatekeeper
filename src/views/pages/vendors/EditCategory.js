import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const EditCategory = () => {
    const [category, setCategory] = useState({})
    const [subcategories, setSubCategories] = useState([])
    const [formData, setFormData] = useState('');
    const [file, setFile] = useState(null);
    const { id } = useParams();
    const token = localStorage.getItem('token')



    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddSubCategory = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('icon', file);
        data.append('catergoryType', category.catergorytype);
        data.append('subCatergoryType', formData);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/createSubCatergory`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                alert('SubCategory added successfully');
                window.location.reload()
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding subcategory');
        }
    };

    useEffect(() => {
        async function getCategory() {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/fetchCatergoryById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(res.data);
            setCategory(res.data.catergory)
        }
        getCategory()
    }, [])
    useEffect(() => {
        async function getCategoryDetails() {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/fetchCatergoryById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data);
            setSubCategories(res.data.catergoryDetails)
        }
        getCategoryDetails()
    }, [])


    async function handleDelete(id) {
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/deleteSubCatergory/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            alert('Deleted')
            window.location.reload()
        }else {
            alert(`Error: ${res.data.message}`);
        }
    }

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
                                        <label htmlFor="icon" className="form-label">Icon</label>
                                        <input
                                            type="file"
                                            name="icon"
                                            placeholder="Icon"
                                            className="form-control"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CFormLabel htmlFor="subcategory" className="form-label">Sub Category</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="subcategory"
                                            placeholder="Sub Category"
                                            className="form-control"
                                            onChange={(e) => setFormData(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" onClick={handleAddSubCategory} className="btn btn-primary">
                                        Add
                                    </button>
                                </CForm>
                            </div>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <h4 className='mb-4 mt-4'>ALL SUB CATEGORY</h4>
                        <div className='row gap-4 mx-2'>
                            {
                                subcategories.map((scat, index) => (
                                    <div key={index} className="card mb-2 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                        <div className="card-body">
                                            <h6 className="card-title">{scat.subCatergory.subCatergoryType}</h6>

                                            <button className="btn btn-danger text-white" onClick={() => handleDelete(scat.subCatergory._id)}><CIcon icon={cilTrash} /></button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCategory