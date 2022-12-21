import axios from "axios";
const API_URL = "http://localhost:8000/user/";
const API_URL_PRODUK = "http://localhost:8000/produk/";

const dataAdmin = (page, size, filter) => {
  return axios
    .get(API_URL + `get_all_admin?page=${page}&size=${size}&filter=${filter}`, {withCredentials: true});
}

const dataAdminByid = (id) => {
  return axios
    .get(API_URL + `get_admin_byId/${id}`, {withCredentials: true});
}

const tambahAdmin = (nama, email, password) => {
  return axios
    .post(API_URL + "tambah_admin", {
      nama,
      email,
      password,
    }, 
    {withCredentials: true}
    )
}

const editAdmin = (nama, email, password, id) => {
  return axios
    .put(API_URL + `update_data_admin/${id}`, {
      nama,
      email,
      password,
    }, 
    {withCredentials: true}
    )
}

const deleteAdmin = (id) => {
  return axios
    .delete(API_URL + `delete_admin/${id}`, {withCredentials: true});
}

const dataCustomer = (page, size, filter) => {
  return axios
    .get(API_URL + `get_all_customer?page=${page}&size=${size}&filter=${filter}`, {withCredentials: true});
}

const dataCustomerByid = (id) => {
  return axios
    .get(API_URL + `get_customer_byId/${id}`, {withCredentials: true});
}

const dataKategori = (page, size, filter) => {
  return axios
    .get(API_URL_PRODUK + `data_kategori_pagination?page=${page}&size=${size}&filter=${filter}`, {withCredentials: true});
}

const dataKategoriBySlug = (slug) => {
  return axios
    .get(API_URL_PRODUK + `data_kategori_by_slug/${slug}`, {withCredentials: true});
}

const editKategori = ( formData, slug) => {
  return axios
    .put(API_URL_PRODUK + `update_kategori/${slug}`, formData, 
      {withCredentials: true}
    )
}

const editSubKategori = (namaSubKategori, slug) => {
  return axios
    .put(API_URL_PRODUK + `update_sub_kategori/${slug}`, {
      namaSubKategori
    }, 
    {withCredentials: true}
    )
}

const tambahSubKategori = (namaSubKategori, idKategori) => {
  return axios
    .post(API_URL_PRODUK + "tambah_sub_kategori", {
      namaSubKategori,
      idKategori,
    }, 
    {withCredentials: true}
    )
}

const deleteSubKategori = (slug) => {
  return axios
    .delete(API_URL_PRODUK + `hapus_sub_kategori/${slug}`, {withCredentials: true});
}

const tambahKategori = (formData) => {
  return axios
    .post(API_URL_PRODUK + "tambah_kategori", formData, 
    {withCredentials: true}
    )
}

const deleteKategori = (slug) => {
  return axios
    .delete(API_URL_PRODUK + `hapus_kategori/${slug}`, {withCredentials: true});
}

const gambarKategori = (file) => {
  return `${API_URL_PRODUK}/gambar_kategori/${file}`;
}

const gambarBrand = (file) => {
  return `${API_URL_PRODUK}/gambar_brand/${file}`;
}

const gambarProduk = (file) => {
  return `${API_URL_PRODUK}/gambar_produk/${file}`;
}

const dataBrand = (page, size, filter) => {
  return axios
    .get(API_URL_PRODUK + `all_data_brand?page=${page}&size=${size}&filter=${filter}`, {withCredentials: true});
}

const tambahBrand = (formData) => {
  return axios
    .post(API_URL_PRODUK + "tambah_brand", formData, 
    {withCredentials: true}
    )
}

const deleteBrand = (slug) => {
  return axios
    .delete(API_URL_PRODUK + `hapus_brand/${slug}`, {withCredentials: true});
}

const dataBrandBySlug = (slug) => {
  return axios
    .get(API_URL_PRODUK + `data_brand_by_slug/${slug}`, {withCredentials: true});
}

const editBrand = ( formData, slug) => {
  return axios
    .put(API_URL_PRODUK + `update_brand/${slug}`, formData, 
      {withCredentials: true}
    )
}

const dataProduk = (page, size, filter) => {
  return axios
    .get(API_URL_PRODUK + `all_data_produk?page=${page}&size=${size}&filter=${filter}`, {withCredentials: true});
}

const kategoriAll = () => {
  return axios
    .get(API_URL_PRODUK + `data_kategori_all`, {withCredentials: true});
}

const brandAll = () => {
  return axios
    .get(API_URL_PRODUK + `no_data_brand`, {withCredentials: true});
}

const tambahProduk = (formData) => {
  return axios
    .post(API_URL_PRODUK + "tambah_produk", formData, 
    {withCredentials: true}
    )
}

const dataProdukById = (id) => {
  return axios
    .get(API_URL_PRODUK + `data_produk_by_id/${id}`, {withCredentials: true});
}

const editProduct = ( formData, id) => {
  return axios
    .put(API_URL_PRODUK + `update_produk/${id}`, formData, 
      {withCredentials: true}
    )
}

const deleteProduk = (id) => {
  return axios
    .delete(API_URL_PRODUK + `hapus_produk/${id}`, {withCredentials: true});
}

export default {
  dataAdmin,
  dataAdminByid,
  tambahAdmin,
  editAdmin,
  deleteAdmin,
  dataCustomer,
  dataCustomerByid,
  dataKategori,
  gambarKategori,
  dataKategoriBySlug,
  editKategori,
  editSubKategori,
  tambahSubKategori,
  deleteSubKategori,
  tambahKategori,
  deleteKategori,
  dataBrand,
  gambarBrand,
  tambahBrand,
  deleteBrand,
  dataBrandBySlug,
  editBrand,
  dataProduk,
  gambarProduk,
  kategoriAll,
  brandAll,
  tambahProduk,
  dataProdukById,
  editProduct,
  deleteProduk
};