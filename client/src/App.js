import React, {useEffect} from 'react'
import './styles/globalStyles.css'
import Home from './pages/Admin/HomePages/Home/Home';
import SideMenu from './components/SideMenu/SideMenu';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from './utils/ScrollToTop';

import TopMenu from './components/TopMenu/TopMenu';
import InvoicesPages from './pages/Admin/InvoicesPages/InvoicesPages'
import CRM from './pages/Admin/CRM/CRM';
import ErrorPage from './pages/ErrorPage';
import HomePageInvoices from './pages/Admin/InvoicesPages/HomePageInvoices/HomePageInvoices';
import InvoiceDetails from "./pages/Admin/InvoicesPages/Invoices/InvoiceDetails/InvoiceDetails";
import HomeHome from "./pages/Admin/HomePages/Home/HomeHome";
import Jobs from "./pages/Admin/HomePages/Jobs/Jobs"
import Invertory from './pages/Admin/Invertory/Invertory'
import Estimates from './pages/Admin/InvoicesPages/Estimates/Estimates';
import Employees from './pages/Admin/Employees/Employees';
import CreateInvoice from './pages/Admin/InvoicesPages/Invoices/CreateInvoice/CreateInvoice';
import CreateEstimate from './pages/Admin/InvoicesPages/Estimates/CreateEstimate/CreateEstimate';
import FormsTest from './components/Forms/FormsTest';
import CustomerPage from './pages/Admin/CRM/CustomerPage/CustomerPage';
import CreateCustomer from './pages/Admin/CRM/CreateCustomer/CreateCustomer';
import AdminLogin from './pages/LoginPages/AdminLogin/AdminLogin';
import Layout from './pages/Layout';
import WelcomePage from './pages/WelcomePage'
import CustomerLogin from './pages/LoginPages/CustomerLogin/CustomerLogin';
import CreateItem from './pages/Admin/Invertory/CreateItem/CreateItem';
import EditItem from './pages/Admin/Invertory/EditItem/EditItem'
import EditCustomer from './pages/Admin/CRM/EditCustomer/EditCustomer';
import PdfRender from './components/PdfRender';
import InvoicePdf from './pages/Admin/InvoicesPages/Invoices/InvoiceDetails/InvoicePdf';
import SideMenuCustomer from './components/SideMenu/SideMenuCustomer';
import InvoicesCustomer from './pages/Customer/Invoices/InvoicesCustomer';
import InvoiceDetailsCustomer from './pages/Customer/Invoices/InvoiceDetailsCustomer';
import HomeInvoicesCustomer from './pages/Customer/Invoices/HomeInvoicesCustomer'
import EditInvoice from './pages/Admin/InvoicesPages/Invoices/EditInvoice/EditInvoice';
import CreateJob from './pages/Admin/HomePages/Jobs/CreateJob';
import JobDetails from './pages/Admin/HomePages/Jobs/JobDetails';
import EmployeeDetails from './pages/Admin/Employees/EmployeeList/EmployeeDetails';
import AddAnEmployee from './pages/Admin/Employees/AddAnEmployee/AddAnEmployee';
import EditEmployee from './pages/Admin/Employees/EmployeeList/EditEmployee';
import EstimateDetails from './pages/Admin/InvoicesPages/Estimates/EstimateDetails/EstimateDetails';
import EstimatePdf from './pages/Admin/InvoicesPages/Estimates/EstimateDetails/EstimatePdf';
import EditEstimate from './pages/Admin/InvoicesPages/Estimates/EditEstimate/EditEstimate';
import EstimateDetailsCustomer from './pages/Customer/Estimates/EstimateDetailsCustomer';
import HomeCustomer from './pages/Customer/HomePages/HomeCustomer';
import HomeTech from './pages/Tech/Home/HomeTech';
import SideMenuTech from './components/SideMenu/SideMenuTech';
import HomeTechJobs from './pages/Tech/Jobs/HomeTech';
import JobDetailsTech from './pages/Tech/Jobs/JobDetailsTech';
import InvoicePdfTech from './pages/Tech/Jobs/InvoicePdfTech';



function App() {
  const history = useNavigate()

  const location = useLocation()
  useEffect(() => {
    console.log(location.pathname);
    console.log(location)
    // if(!isLoggedIn){
    //   return history('')
    // }
  }, [location, location.search]);

  return (
    <>
      <Routes>
        {/* Welcome page */}  
        <Route path='/' element={<WelcomePage />} />
        {/* custmer login this line */}
        <Route path='/login/customer' element={<CustomerLogin />} />
        <Route path='/login/employee' element={<AdminLogin />} />
        {/* admin routes */}
        {/* pdf routes */}

        {/* customer routes */} 
        <Route path='customer-dashboard' element={<SideMenuCustomer />}>
          <Route path='home'>
            <Route index element={<HomeCustomer />} />
          </Route>
            <Route path='invoices'>
              <Route index   element={<HomeInvoicesCustomer /> }/>
              <Route path=':id' element={<InvoiceDetailsCustomer />} />
              <Route path='estimate/:id' element={<EstimateDetailsCustomer />} />

          </Route>
        </Route>

        <Route path='employee-dashboard/admin' element={<SideMenu />}>
          <Route path='home'>
            <Route index element={<Home />} />
            <Route path='createJob' element={<CreateJob />} />
            <Route path='jobs/:id' element={<JobDetails />} />
          </Route>
          <Route path='invoices'>
            <Route index   element={<InvoicesPages /> }/>
            <Route path=':id' element={<InvoiceDetails />} />
            <Route path='estimate/:id' element={<EstimateDetails />} />
            <Route path='create-invoice' element={<CreateInvoice />} />
            <Route path='create-estimate' element={<CreateEstimate />} />
            <Route path=':id/pdf/:id' element={<InvoicePdf />} />
            <Route path='estimate/:id/pdf-estimate/:id' element={<EstimatePdf />} />
            <Route path=':id/edit-invoice/:id' element={<EditInvoice />} />
            <Route path='estimate/:id/edit-estimate/:id' element={<EditEstimate />} />
          </Route>
          <Route path='crm'>
            <Route index   element={<CRM/> }/>
            <Route  exact path=':id' element={<CustomerPage />} />
            <Route path=':id/edit-customer/:id' element={<EditCustomer />} />
            <Route path='create-customer' element={<CreateCustomer />} />
          </Route>
          <Route path='invertory'>
            <Route index  element={<Invertory/>} />
            <Route path='edit-item/:id' element={<EditItem />} />
            <Route path='create-item' element={<CreateItem />} />
          </Route>
          <Route path='employees'>
            <Route index   element={<Employees/> }/>
            <Route  exact path=':id' element={<EmployeeDetails />} />
            <Route path=':id/edit-employee/:id' element={<EditEmployee />} />
            <Route path='create-employee' element={<AddAnEmployee />} />
          </Route>
        </Route>
        

        {/* tech routes */}
        <Route path='employee-dashboard/tech' element={<SideMenuTech />}>
          <Route path='home'>
            <Route index element={<HomeTech/>} />
          </Route>
          <Route path='jobs'>
            <Route index element={<HomeTechJobs/>} />
            <Route  exact path='job-details/:id' element={<JobDetailsTech />} />
            <Route  exact path='job-details/:id/item-list/:invID' element={<InvoicePdfTech />} />

          </Route>
          
          

        </Route>
      </Routes>
    </>

  // <BrowserRouter>
  //   <Routes>

  //       <Route path='/' element={<Layout />}>
  //           <Route index element={<AdminLogin />} />
  //           <Route path='dash' element={<SideMenu />}>
  //             <Route path='home'>
  //               <Route index  element={<Home />}/>
  //             </Route>
  //             <Route path='invoices'>
  //               <Route index   element={<InvoicesPages /> }/>
  //               <Route path='invoice/:id' element={<InvoiceDetails />} />
  //               <Route path='create-invoice' element={<CreateInvoice />} />
  //               <Route path='create-estimate' element={<CreateEstimate />} />
  //             </Route>
              // <Route path='crm'>
              //   <Route index   element={<CRM/> }/>
              //   <Route path=':id' element={<CustomerPage />} />
              //   <Route path='create-customer' element={<CreateCustomer />} />
              // </Route>
              
  //             <Route path='invertory' element={<Invertory/>} />
  //             <Route path='employees' element={<Employees />} />
  //             <Route path = 'test-forms' element={<FormsTest />} />
  //             <Route path = 'error' element={<ErrorPage />} />  
  //           </Route>
  //       </Route>
  //   </Routes>
  // </BrowserRouter>

  )
}

export default App; 