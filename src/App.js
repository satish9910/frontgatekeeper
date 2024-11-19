import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import AllUsers from './views/pages/users/AllUsers'
import Material from './views/pages/vendors/Material'
import CreateVendor from './views/pages/vendors/CreateVendor'
import CreateUser from './views/pages/users/CreateUser'
import KycDetails from './views/pages/vendors/KycDetails'
import ServicesDetails  from './views/pages/vendors/ServicesDetails'
import AddCategory from './views/pages/vendors/AddCategory'
import Faq from './views/pages/others/faq'
import AboutUs from './views/pages/others/about'
import Coupon from './views/pages/others/Coupon'
import Sos from './views/pages/others/Sos'
import Orders from './views/pages/users/Orders'
import EditCategory from './views/pages/vendors/EditCategory'
import SubCategory from './views/pages/vendors/SubCategory'
import City from './views/pages/others/City'
import Complaint from './views/pages/others/Complaint'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    if (isColorModeSet()) {
      return
    }
    setColorMode(storedTheme)
  }, []) 

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route path='/users' element={<AllUsers />} />
          <Route path='/user/create' element={<CreateUser />} />
          <Route path='/material' element={<Material/>} />
          <Route path='/vendor/create' element={<CreateVendor />} />
          <Route path='/vendor/kyc/:id' element={<KycDetails />} />
          <Route path='/vendor/getAllServicesByVendorId/:id' element={<ServicesDetails />} />
          <Route path='/category' element={<AddCategory />} />
          <Route path='/edit/:id' element={<EditCategory />} />
          <Route path='/subcategory' element={<SubCategory />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/city' element={<City />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/complaint' element={<Complaint />} />
          <Route path='/coupon' element={<Coupon />} />
          <Route path='/sos' element={<Sos />} />
          <Route path='/user/orders/:id' element={<Orders />} /> 
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
