import { useState, useEffect } from "react";
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Component
import NavbarAndSidebar from '../../../../component/admin/NavbarAndSidebar';

// Utils
import {withAuth} from "../../../../utils/gsspAdmin";

import services from "../../../../services/admin.service";

// Form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';

export const getServerSideProps = withAuth(context => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
});

export default function DetailCustomer({currentUser}) {
  
  const router = useRouter(); 
  const { id } = router.query;

  const [data, setData] = useState();

  useEffect(() => {
    services.dataCustomerByid(id)
      .then((response)=>{
        setData(response.data);
      })
  },[]);

  return (
    <div>
      <Head>
        <title>Detail Customer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAndSidebar nama={currentUser.nama}>

        <h1 className="text-center m-5">Detail Customer</h1>
        <form className="container">
          <div className="row mb-3">
            <label htmlFor="adminEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" 
                className={`form-control`}  
                name="adminEmail"
                value={data ? data.email : ""}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="adminNama" className="col-sm-2 col-form-label">Nama</label>
            <div className="col-sm-10">
              <input 
                type="text" 
                className={`form-control`}  
                name="adminNama"
                value={data ? data.nama : ""}
                readOnly
              />
            </div>
          </div>
        
        </form>
      </NavbarAndSidebar>

    </div>
  )
}
