import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IconContext } from "react-icons";
import { BsSearch, BsPlusLg, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

// Component
import NavbarAndSidebar from '../../../component/admin/NavbarAndSidebar';

import services from "../../../services/admin.service";

// Utils
import {withAuth} from "../../../utils/gsspAdmin";

export const getServerSideProps = withAuth(context => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
});

export default function Kategori({currentUser}) {

  const router = useRouter();

  const [kategori, setKategori] = useState();
  const [cari, setCari] = useState("");
  const [page, setPage] = useState("");
  const [itemPerPage, setItemPerPage] = useState("5");

  const tambah = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Tambah',
      html:
        '<div class="mb-3 mx-4">'+
          '<label for="nama" class="form-label">Nama Kategori</label>'+
          '<input type="email" class="form-control" id="nama">'+
        '</div>'+
        '<div class="mb-3 mx-4">'+
          '<label for="gambar" class="form-label">Gambar</label>'+
          '<input class="form-control" type="file" id="gambar">'+
        '</div>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('nama').value,
          document.getElementById('gambar').files[0],
        ]
      }
    })

    if (formValues) {
      let formData = new FormData();
      formData.append('namaKategori', formValues[0]);
      formData.append('gambarKategori', formValues[1]);

      services.tambahKategori(formData)
        .then((response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Tambah Berhasil',
            showConfirmButton: false,
            timer: 2500
          })
          setPage(0);
          setCari("")
          services.dataKategori(page,itemPerPage,cari)
          .then((response)=>{
            setKategori(response.data);
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

  const onChangeCari = (event)=>{
    setCari(event.target.value);
    setPage(0);
  }

  const onChangeItemPerPage = (event)=>{
    setItemPerPage(event.target.value);
    setPage(0);
  }

  const handlePageChange = (event) => {
    // TODO Only change displayed selected page
    // when its content is loaded in useEffect.
    setPage(event.selected);
  };

  const edit = (id) => {
    router.push(`/admin/kategori/edit/${id}`)
  }

  const deleteAdmin = (id) => {
    services.deleteKategori(id)
      .then((response)=>{
        Swal.fire({
          icon: 'success',
          title: 'Delete Berhasil',
          showConfirmButton: false,
          timer: 2500
        })
        setPage(0);
        services.dataKategori(page,itemPerPage,cari)
          .then((response)=>{
            setKategori(response.data);
          })
      }) 
  }

  useEffect(() => {
    services.dataKategori(page,itemPerPage,cari)
      .then((response)=>{
        setKategori(response.data);
      })
  },[page, cari, itemPerPage]);

  return (
    <div>
      <Head>
        <title>Kategori</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAndSidebar nama={currentUser.nama}>
        
        <h1 className="text-center m-5">Kategori</h1>
        
        <div className="container">
          
          <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
            <div>
              <button type="button" className="btn btn-success" onClick={tambah}>
                <BsPlusLg/> Tambah Kategori
              </button>
            </div>
            <div>
              <div className="input-group">
                <label className="input-group-text" htmlFor="jumlah">Jumlah :</label>
                <select className="form-select" id="jumlah" onChange={onChangeItemPerPage}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
            </div>
            <div>
              <div className="input-group">
                <span className="input-group-text"><BsSearch /></span>
                <input type="text" className="form-control" placeholder="cari" onChange={onChangeCari}/>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Gambar Kategori</th>
                  <th scope="col">Nama Kategori</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                { kategori ?
                  kategori.items.map((admin, index)=>
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td><img src={services.gambarKategori(admin.gambar_kategori)} className="img-fluid" /></td>
                      <td>{admin.nama_kategori}</td>
                      <td>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                          <button className="btn btn-warning" type="button" onClick={()=>{edit(admin.slug)}}>
                            <BsPencilSquare/>Edit
                          </button>
                          <button className="btn btn-danger" type="button" onClick={()=>{deleteAdmin(admin.slug)}}>
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
                {
                  kategori && 
                  (kategori.items.length === 0 &&
                    <tr>
                      <td colSpan="4">
                        <div className="d-flex justify-content-center">
                          <h2 className="mt-3">Data Tidak Ditemukan</h2>
                        </div>
                      </td>
                    </tr> 
                  ) 
                }
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={kategori && kategori.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={page}
            renderOnZeroPageCount={null}
          />
        </div>
      
      </NavbarAndSidebar>

    </div>
  )
}
