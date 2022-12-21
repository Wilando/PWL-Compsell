import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IconContext } from "react-icons";
import { BsSearch, BsPlusLg, BsFillTrashFill, BsPencilSquare, BsFillInfoCircleFill } from "react-icons/bs";
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

export default function Customer({currentUser}) {

  const router = useRouter();

  const [data, setData] = useState();
  const [cari, setCari] = useState("");
  const [page, setPage] = useState("");
  const [itemPerPage, setItemPerPage] = useState("5");

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

  const detail = (id) => {
    router.push(`/admin/customer/detail/${id}`)
  }

  useEffect(() => {
    services.dataCustomer(page,itemPerPage,cari)
      .then((response)=>{
        setData(response.data);
      })
  },[page, cari, itemPerPage]);

  return (
    <div>
      <Head>
        <title>Customer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAndSidebar nama={currentUser.nama}>
        
        <h1 className="text-center m-5">Customer</h1>
        
        <div className="container">
          
          <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
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
                  <th scope="col">Email</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                { data ?
                  data.items.map((admin, index)=>
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{admin.email}</td>
                      <td>{admin.nama}</td>
                      <td>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                          <button className="btn btn-primary" type="button" onClick={()=>{detail(admin.id)}}>
                            <BsFillInfoCircleFill/> Detail
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
                  data && 
                  (data.items.length === 0 &&
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
            pageCount={data && data.totalPages}
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
