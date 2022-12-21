import { useState, useEffect } from "react";
import Head from 'next/head';
import Image from 'next/image';
import { BsPlusLg, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
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

export default function EditKategori({currentUser}) {
  
  const router = useRouter(); 
  const { slug } = router.query;

  const [data, setData] = useState();

  useEffect(() => {
    services.dataBrandBySlug(slug)
      .then((response)=>{
        setData(response.data);
      })
  },[]);

  const validationSchema = Yup.object().shape({
    brand: Yup.string().required("Email Masih Kosong"),
    deskripsi: Yup.string().required("Deskripsi Masih Kosong"),
  });

  const formik = useFormik({
    initialValues: {
      brand: `${data ? data.nama_brand : ""}`,
      deskripsi: `${data ? data.deskripsi_brand : ""}`,
      logo_brand: "",
    },
    enableReinitialize: true,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (data) => {
      let formData = new FormData();
      formData.append('namaBrand', data.brand);
      formData.append('deskripsiBrand', data.deskripsi);
      formData.append('logoBrand', data.logo_brand);

      services.editBrand(formData, slug)
        .then((response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Update Berhasil',
            showConfirmButton: false,
            timer: 2500
          })
          router.push("/admin/brand")
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
        <title>Edit Brand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAndSidebar nama={currentUser.nama}>

        <h1 className="text-center m-5">Edit Brand</h1>
        <form className="container" onSubmit={formik.handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="brand" className="col-sm-2 col-form-label">Nama Brand</label>
            <div className="col-sm-10">
              <input type="text" 
                className={`form-control ${formik.errors.brand ? "is-invalid" : ""}`}  
                name="brand"
                onChange={formik.handleChange}
                value={formik.values.brand}
              />
              <div className="text-danger">
                {formik.errors.brand ? formik.errors.brand : null}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="deskripsi" className="col-sm-2 col-form-label">Deskripsi Brand</label>
            <div className="col-sm-10">
              <input type="text" 
                className={`form-control ${formik.errors.deskripsi ? "is-invalid" : ""}`}  
                name="deskripsi"
                onChange={formik.handleChange}
                value={formik.values.deskripsi}
              />
              <div className="text-danger">
                {formik.errors.deskripsi ? formik.errors.deskripsi : null}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="logo_brand" className="col-sm-2 col-form-label">Gambar</label>
            <div className="col-sm-10">
              <input className="form-control" type="file" name="logo_brand" onChange={(e) =>
                formik.setFieldValue('logo_brand', e.currentTarget.files[0])}
              />
              <div className="form-text">Kosongkan jika tidak ingin merubah Gambar</div>
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
