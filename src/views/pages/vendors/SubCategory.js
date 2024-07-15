import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import axios from 'axios'

const SubCategory = () => {
     const [catergories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([])
    const [category, setCategory] = useState('')
    const [item, setItem] = useState('')
    const token = localStorage.getItem('token')

    async function handleAddItem(e) {
        e.preventDefault()
        if (!item || !category) {
            alert('Please fill all fields')
            return
        }
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/createSubSubCatergory`, {
            subCatergoryType: category.toUpperCase(),
            subSubCatergoryType: item,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.status === 200) {
            alert(`${item} added to ${category}`)
            window.location.reload()
        } else {
            alert(res.data.message)
        }
    }

    async function getSubCategories() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/allSubSubCatergory`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // console.log(res.data);
        setSubCategories(res.data.subSubCatergories)
    }

    useEffect(() => {
        getSubCategories();
    }, [])

    const [selectedCategory, setSelectedCategory] = useState('');

    const getCategories = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/getAllCatergories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setCategories(res.data.catergories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };


    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-2'>ADD ITEM</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <CForm className="p-4 rounded shadow-sm">
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="categoriestype" className="form-label">Category</CFormLabel>
                                        <CFormSelect
                                            name="catergorytype"
                                            className="form-control"
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="" disabled>Select a category</option>
                                            {catergories?.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.catergorytype}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="catergorytype" className="form-label">Sub Category</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="catergorytype"
                                            placeholder="Sub Category"
                                            className="form-control"
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CFormLabel htmlFor="subcategory" className="form-label">Item</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="subcategory"
                                            placeholder="Item"
                                            className="form-control"
                                            onChange={(e) => setItem(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" onClick={handleAddItem} className="btn btn-primary">
                                        ADD
                                    </button>
                                </CForm>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <h4 className='mb-4 mt-4'>ALL SUB CATEGORIES</h4>
                            <div className='row gap-4 mx-2'>
                                {
                                    subcategories?.map((item, index) => (
                                        <div key={index} className="card mb-2 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="card-body">
                                                <h6 className="card-title">{item.catergoryType}</h6>
                                                <h6 className="card-title">{item.subCatergoryType}</h6>
                                                <h6 className="card-title">{item.subSubCatergoryType}</h6>
                                                {/* <button className="btn btn-danger text-white" onClick={() => handleDelete(item._id)}><CIcon icon={cilTrash} /></button> */}
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

export default SubCategory