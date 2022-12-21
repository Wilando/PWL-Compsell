import { useState, useEffect } from "react";
import Head from 'next/head';
import Image from 'next/image';
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from 'next/router';

// Component
import NavbarAndSidebar from '../../../component/admin/NavbarAndSidebar';

// Utils
import {withAuth} from "../../../utils/gsspAdmin";

import services from "../../../services/admin.service";

// Form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';

export const getServerSideProps = withAuth(context => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
});

export default function TambahProduk({currentUser}) {
  
  const router = useRouter();

  const [kategori, setKategori] = useState();
  const [subKategori, setSubKategori] = useState();
  const [brand, setBrand] = useState();

  useEffect(() => {
    services.kategoriAll()
      .then((response)=>{
        setKategori(response.data);
      })

    services.brandAll()
      .then((response)=>{
        setBrand(response.data);
      })

  },[]);

  const validationSchema = Yup.object().shape({
    idKategori: Yup.string().required("Kategori Belum Di isi"),
    idSubKategori: Yup.string().required("Sub Kategori Belum Di isi"),
    idBrand: Yup.string().required("Brand Belum Di isi"),
    namaProduk: Yup.string().required("Nama Produk Tidak Boleh Kosong"),
    deskripsi: Yup.string().required("Deskripsi Masih Kosong"),
    gambarProduk: Yup.string().required("Gambar Produk Belum Dicantumkan"),
    harga: Yup.string().required("Harga Tidak Boleh Kosong"),
    stok: Yup.string().required("Stok Belum Di isi"),

  });

  const formik = useFormik({
    initialValues: {
      idKategori: "",
      idSubKategori: "",
      idBrand: "",
      namaProduk: "",
      deskripsi: "",
      gambarProduk: "",
      harga: "",
      stok: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (data) => {
      let formData = new FormData();
      formData.append('idKategori', data.idKategori);
      formData.append('idSubKategori', data.idSubKategori);
      formData.append('idBrand', data.idBrand);
      formData.append('namaProduk', data.namaProduk); 
      formData.append('deskripsi', data.deskripsi); 
      formData.append('gambarProduk', data.gambarProduk); 
      formData.append('harga', data.harga);   
      formData.append('stok', data.stok);      

      services.tambahProduk(formData)
        .then((response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Tambah Berhasil',
            showConfirmButton: false,
            timer: 2500
          })
          router.push("/admin/produk")
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
        <title>Tambah Produk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAndSidebar nama={currentUser.nama}>

        <h1 className="text-center m-5">Tambah Produk</h1>
        <form className="container" onSubmit={formik.handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="idKategori" className="col-sm-2 col-form-label">Kategori</label>
            <div className="col-sm-10">
              <select className={`form-select ${formik.errors.idKategori ? "is-invalid" : ""}`}
                onChange={(e) =>{
                  setSubKategori(undefined);
                  formik.setFieldValue('idSubKategori', "");
                  const newArray = kategori.filter(function (el)
                    {
                      return el.id == e.currentTarget.value
                    }
                  );
                  {newArray.length != 0 && setSubKategori(newArray[0].SubKategoris) } 
                  formik.setFieldValue('idKategori', e.currentTarget.value);               
                  }
                }
                value={formik.values.idKategori}
                defaultValue=""
              >
                <option value="" >Pilih Kategori</option>
                {kategori ? 
                  kategori.map((kategori, index)=>
                    <option key={index} value={kategori.id}>{kategori.nama_kategori}</option>
                  )
                  :
                  null
                }
              </select>
              <div className="text-danger">
                {formik.errors.idKategori ? formik.errors.idKategori : null}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="idSubKategori" className="col-sm-2 col-form-label">Sub Kategori</label>
            <div className="col-sm-10">
              <select className={`form-select ${formik.errors.idSubKategori ? "is-invalid" : ""}`}
                onChange={(e) => formik.setFieldValue('idSubKategori', e.currentTarget.value)}
                value={formik.values.idSubKategori}
                defaultValue=""
              >
                <option value="" >Pilih Sub Kategori</option>
                {subKategori ? 
                  subKategori.map((kategori, index)=>
                    <option key={index} value={kategori.id}>{kategori.nama_sub_kategori}</option>
                  )
                  :
                  null
                }
              </select>
              <div className="text-danger">
                {formik.errors.idSubKategori ? formik.errors.idSubKategori : null}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="idBrand" className="col-sm-2 col-form-label">Sub Kategori</label>
            <div className="col-sm-10">
              <select className={`form-select ${formik.errors.idBrand ? "is-invalid" : ""}`}
                onChange={(e) => formik.setFieldValue('idBrand', e.currentTarget.value)}
                value={formik.values.idBrand}
                defaultValue=""
              >
                <option value="" >Pilih Brand</option>
                {brand ? 
                  brand.map((brand, index)=>
                    <option key={index} value={brand.id}>{brand.nama_brand}</option>
                  )
                  :
                  null
                }
              </select>
              <div className="text-danger">
                {formik.errors.idBrand ? formik.errors.idBrand : null}
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="namaProduk" className="col-sm-2 col-form-label">Nama Produk</label>
            <div className="col-sm-10">
              <input 
                type="text" 
                className={`form-control ${formik.errors.namaProduk ? "is-invalid" : ""}`}  
                name="namaProduk"
                onChange={formik.handleChange}
                value={formik.values.namaProduk}
              />
              <div className="text-danger">
                {formik.errors.namaProduk ? formik.errors.namaProduk : null}
              </div>
            </div>
          </div>
          
          <div className="row mb-3">
            <label htmlFor="deskripsi" className="col-sm-2 col-form-label">Deskripsi</label>
            <div className="col-sm-10">
              <textarea 
                type="text" 
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
            <label htmlFor="harga" className="col-sm-2 col-form-label">Harga</label>
            <div className="col-sm-10">
              <input 
                type="number" 
                className={`form-control ${formik.errors.harga ? "is-invalid" : ""}`}  
                name="harga"
                onChange={formik.handleChange}
                value={formik.values.harga}
              />
              <div className="text-danger">
                {formik.errors.harga ? formik.errors.harga : null}
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="stok" className="col-sm-2 col-form-label">Stok</label>
            <div className="col-sm-10">
              <input 
                type="number" 
                className={`form-control ${formik.errors.stok ? "is-invalid" : ""}`}  
                name="stok"
                onChange={formik.handleChange}
                value={formik.values.stok}
              />
              <div className="text-danger">
                {formik.errors.stok ? formik.errors.stok : null}
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="gambarProduk" className="col-sm-2 col-form-label">Gambar</label>
            <div className="col-sm-10">
              <input className="form-control" type="file" name="gambarProduk" onChange={(e) =>
                formik.setFieldValue('gambarProduk', e.currentTarget.files[0])}
              />
              <div className="text-danger">
                {formik.errors.gambarProduk ? formik.errors.gambarProduk : null}
              </div>
            </div>
          </div>
        
          <div className="d-grid col-2 mx-auto mb-5">
            <button type="submit" className="btn btn-success btn-lg">
              Tambah Produk
            </button>
          </div>
        </form>
      </NavbarAndSidebar>

    </div>
  )
}
