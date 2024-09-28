import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import { AppSidebar, AppHeader } from '../../../components';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

const SubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/getAllCatergories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.catergories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, [token]);

  // Fetch subcategories
  const getSubCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/allSubSubCatergory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubCategories(response.data.subSubCatergories);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    getSubCategories();
  }, [token]);

  // Handle category change and filter subcategories
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    // Filter subcategories based on the selected category
    const filtered = subcategories.filter(subcategory => subcategory.catergoryType === selectedCategory);
    let uniqueSubCategories = filtered.filter((obj, index, self) =>
      index === self.findIndex((t) => t.subCatergoryType.trim() === obj.subCatergoryType.trim())
  );
    console.log(uniqueSubCategories, 'uni');
    
    setFilteredSubCategories(uniqueSubCategories);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!item || !category || !file) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('icon', file);
    formData.append('subCatergoryType', category.toUpperCase());
    formData.append('subSubCatergoryType', item);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/createSubSubCatergory`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert(`${item} added to ${category}`);
        setCategory('');
        setItem('');
        setFile(null);
        getSubCategories(); // Refresh subcategories after adding new item
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding sub-sub-category:', error);
      alert('An error occurred while adding the sub-sub-category');
    }
  };

  // Handle delete item
  async function handleDelete(id) {
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/deleteSubSubCatergory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.status === 200) {
      alert('Deleted');
      getSubCategories(); // Reload items after deletion
    } else {
      alert(`Error: ${res.data.message}`);
    }
  }

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="mx-3">
            <h4 className="mb-2">ADD ITEM</h4>
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
                      {categories.map((category) => (
                        <option key={category.id} value={category.catergorytype}>
                          {category.catergorytype}
                        </option>
                      ))}
                    </CFormSelect>
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="catergorytype" className="form-label">Sub Category</CFormLabel>
                    <CFormSelect
                      name="catergorytype"
                      className="form-control"
                      value={selectedSubCategory}
                      onChange={handleSubCategoryChange}
                    >
                      <option value="" disabled>Select a sub category</option>
                      {filteredSubCategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.subCatergoryType}>
                          {subcategory.subCatergoryType}
                        </option>
                      ))}
                    </CFormSelect>
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
                    <CFormLabel htmlFor="subcategory" className="form-label">Item</CFormLabel>
                    <CFormInput
                      type="text"
                      name="subcategory"
                      placeholder="Item"
                      className="form-control"
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                    />
                  </div>
                  <button type="submit" onClick={handleAddItem} className="btn btn-primary">
                    ADD
                  </button>
                </CForm>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="mb-4 mt-4">ALL ITEMS</h4>
              <div className="row gap-4 mx-2">
                {subcategories.map((item, index) => (
                  <div key={index} className="card mb-2 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" style={{width:'auto'}}>
                    <div className="card-body">
                      <h6 className="card-title">{item.catergoryType}</h6>
                      <h6 className="card-title">{item.subCatergoryType}</h6>
                      <h6 className="card-title">{item.subSubCatergoryType}</h6>
                      <button className="btn btn-danger text-white" onClick={() => handleDelete(item._id)}><CIcon icon={cilTrash} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategory;
