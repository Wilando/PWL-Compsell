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
    services.dataKategoriBySlug(slug)
      .then((response)=>{
        setData(response.data);
      })
  },[]);

  const tambah = async ()=>{
    const { value: hasil } = await Swal.fire({
      title: 'Tambah Sub Kategori',
      input: 'text',
      confirmButtonText: 'Tambah',
      inputLabel: 'Nama Sub Kategori',
      inputValue: "",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Tidak Boleh Kosong'
        }
      }
    })

    if(hasil){
      
      services.tambahSubKategori(hasil, data.id)
        .then((response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Tambah Berhasil',
            showConfirmButton: false,
            timer: 2500
          })
          services.dataKategoriBySlug(slug)
            .then((response)=>{
              setData(response.data);
            })
        })
        .catch((error)=>{
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          
        })
    }
  }

  const edit = async (paramSub, paramSlug) => {
    const { value: hasil } = await Swal.fire({
      title: 'Edit Sub Kategori',
      input: 'text',
      confirmButtonText: 'Ubah',
      inputLabel: 'Nama Sub Kategori',
      inputValue: paramSub,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Tidak Boleh Kosong'
        }
      }
    })

    if (hasil) {
      services.editSubKategori(hasil, paramSlug)
        .then((response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Update Sub Kategori Berhasil',
            showConfirmButton: false,
            timer: 2500
          })
          services.dataKategoriBySlug(slug)
            .then((response)=>{
              setData(response.data);
            })
        })
        .catch((error)=>{
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          
        })
    }

  }

  const deleteSubKategori = (paramSlug) =>{
    services.deleteSubKategori(paramSlug)
        .then((response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Delete Berhasil',
            showConfirmButton: false,
            timer: 2500
          })
          services.dataKategoriBySlug(slug)
            .then((response)=>{
              setData(response.data);
            })
        })
        .catch((error)=>{
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          
        })
  }

  const validationSchema = Yup.object().shape({
    kategori: Yup.string().required("Kategori Masih Kosong"),
  });

  const formik = useFormik({
    initialValues: {
      kategori: `${data ? data.nama_kategori : ""}`,
      gambar: "",
    },
    enableReinitialize: true,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (data) => {
      let formData = new FormData();
      formData.append('namaKategori', data.kategori);
      formData.append('gambarKategori', data.gambar);

      services.editKategori(formData, slug)
        .then((response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Update Berhasil',
            showConfirmButton: false,
            timer: 2500
          })
          router.push("/admin/kategori")
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
        <title>Edit Kategori</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAndSidebar nama={currentUser.nama}>

        <h1 className="text-center m-5">Edit Kategori</h1>
        <form className="container" onSubmit={formik.handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="kategori" className="col-sm-2 col-form-label">Nama Kategori</label>
            <div className="col-sm-10">
              <input type="text" 
                className={`form-control ${formik.errors.kategori ? "is-invalid" : ""}`}  
                name="kategori"
                onChange={formik.handleChange}
                value={formik.values.kategori}
              />
              <div className="text-danger">
                {formik.errors.kategori ? formik.errors.kategori : null}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="gambar" className="col-sm-2 col-form-label">Gambar</label>
            <div className="col-sm-10">
              <input className="form-control" type="file" name="gambar" onChange={(e) =>
                formik.setFieldValue('gambar', e.currentTarget.files[0])}
              />
              <div className="form-text">Kosongkan jika tidak ingin merubah Gambar</div>
            </div>
          </div>
          <div className="d-grid col-2 mx-auto">
            <button type="submit" className="btn btn-warning btn-lg">
              Ubah
            </button>
          </div>
          <div className="table-responsive mt-3">
            <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
              <h4>Sub Kategori:</h4>
              <button type="button" className="btn btn-success" onClick={tambah} >
                <BsPlusLg/> Tambah Sub Kategori
              </button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Sub Kategori</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                { data ?
                  data.SubKategoris.map((admin, index)=>
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{admin.nama_sub_kategori}</td>
                      <td>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                          <button className="btn btn-warning" type="button" onClick={()=>{edit(admin.nama_sub_kategori, admin.slug)}}>
                            <BsPencilSquare/>Edit
                          </button>
                          <button className="btn btn-danger" type="button" onClick={()=>{deleteSubKategori(admin.slug)}}>
                            <BsFillTrashFill/>Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                  :
                  <tr>
                    <td colSpan="4">
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </form>
      </NavbarAndSidebar>

    </div>
  )
}
