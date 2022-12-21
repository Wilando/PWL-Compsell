import { useState, useEffect } from "react";
import Head from 'next/head';
import Image from 'next/image';
import { BsPlusLg } from "react-icons/bs";
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

export default function EditAdmin({currentUser}) {
  
  const router = useRouter(); 
  const { id } = router.query;

  const [data, setData] = useState();

  useEffect(() => {
    services.dataAdminByid(id)
      .then((response)=>{
        setData(response.data);
      })
  },[]);

  const validationSchema = Yup.object().shape({
    adminEmail: Yup.string().required("Email Masih Kosong").email("Format Email Tidak Valid"),
    adminNama: Yup.string().required("Nama Maih Kosong"),
  });

  const formik = useFormik({
    initialValues: {
      adminEmail: `${data ? data.email : ""}`,
      adminNama: `${data ? data.nama : ""}`,
      adminPassword: "",
    },
    enableReinitialize: true,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (data) => {
      services.editAdmin(data.adminNama, data.adminEmail, data.adminPassword, id)
        .then((response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Update Berhasil',
            showConfirmButton: false,
            timer: 2500
          })
          router.push("/admin/management_admin")
        })
        .catch((error)=>{
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          
        })

    },
  });

  return (
    <div>
      <Head>
        <title>Edit Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAndSidebar nama={currentUser.nama}>

        <h1 className="text-center m-5">Edit Admin</h1>
        <form className="container" onSubmit={formik.handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="adminEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" 
                className={`form-control ${formik.errors.adminEmail ? "is-invalid" : ""}`}  
                name="adminEmail"
                onChange={formik.handleChange}
                value={formik.values.adminEmail}
              />
              <div className="text-danger">
                {formik.errors.adminEmail ? formik.errors.adminEmail : null}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="adminNama" className="col-sm-2 col-form-label">Nama</label>
            <div className="col-sm-10">
              <input 
                type="text" 
                className={`form-control ${formik.errors.adminNama ? "is-invalid" : ""}`}  
                name="adminNama"
                onChange={formik.handleChange}
                value={formik.values.adminNama}
              />
              <div className="text-danger">
                {formik.errors.adminNama ? formik.errors.adminNama : null}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="adminPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input 
                type="password" 
                className={`form-control ${formik.errors.adminPassword ? "is-invalid" : ""}`}  
                name="adminPassword"
                onChange={formik.handleChange}
                value={formik.values.adminPassword}
              />
              <div className="form-text">Kosongkan jika tidak ingin merubah Password</div>
              <div className="text-danger">
                {formik.errors.adminPassword ? formik.errors.adminPassword : null}
              </div>
            </div>
          </div>
        
          <div className="d-grid col-2 mx-auto">
            <button type="submit" className="btn btn-warning btn-lg">
              Ubah
            </button>
          </div>
        </form>
      </NavbarAndSidebar>

    </div>
  )
}
