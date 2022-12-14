import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// Component
import Navbar from "../component/customer/Navbar";
import Footer from "../component/customer/Footer";
// Utils
import {withAuth} from "../utils/gsspCustomer";

export const getServerSideProps = withAuth(context => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
});

export default function Home({isLogin, currentUser}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isLogin={isLogin} currentUser={currentUser} />
      
      <div class="container mb-2 mt-5">
        <div class={`${styles.daftarKategori}`}>
          <p class='text-start'><strong>Daftar Kategori</strong></p>
        </div>
        <div class={`${styles.kategoriContainer} text-center row row-cols-3 p-4`}>
          <div class="col">
            <img class='img-fluid' alt='kategori' src='/icon/laptop2.png' width={150} height={150} />
            <p class='text-center pt-2'>Notebook</p>
          </div>
          <div class="col">
            <img class='img-fluid' alt='kategori' src='/icon/processor2.png' width={150} height={150} />
            <p class='text-center pt-2'>Processor</p>
          </div>
          <div class="col">
            <img class='img-fluid' alt='kategori' src='/icon/motherboard2.png' width={150} height={150} />
            <p class='text-center pt-2'>Motherboard</p>
          </div>
          <div class="col" >
            <img class='img-fluid' alt='kategori' src='/icon/ssd2.png' width={150} height={150} />
            <p class='text-center pt-2'>SSD</p>
          </div>
          <div class="col" >
            <img class='img-fluid' alt='kategori' src='/icon/ram2.png' width={150} height={150} />
            <p class='text-center pt-2'>RAM</p>
          </div>
          <div class="col">
            <img class='img-fluid' alt='kategori' src='/icon/keyboard.png' width={150} height={150}/>
            <p class='text-center pt-2'>Keyboard</p>
          </div>
        </div>
      </div>
      <section>
        <div class="container py-5">
          <div class="row justify-content-center mb-3">
            <div class="col-md-12 col-xl-10">
              <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div class="bg-image hover-zoom ripple rounded ripple-surface">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                          class="w-100" />
                        <a href="#!">
                          <div class="hover-overlay">
                            <div class="mask"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-6">
                      <h5>Quant trident shirts</h5>
                      <p class="mb-4 mb-md-0">
                        There are many variations of passages of Lorem Ipsum available, but the
                        majority have suffered alteration in some form, by injected humour, or
                        randomised words which don't look even slightly believable.
                      </p>
                    </div>
                    <div class={`col-md-6 col-lg-3 col-xl-3 ${styles.border_sm_start_none} border-start`}>
                      <div class="d-flex flex-row align-items-center mb-1">
                        <h4 class="mb-1 me-1">Rp.5.000.000</h4>
                      </div>
                      <div class="d-flex flex-column mt-4">
                        <button class="btn btn-primary btn-sm" type="button">Details</button>
                        <button class="btn btn-outline-primary btn-sm mt-2" type="button">
                          Add to wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mb-3">
            <div class="col-md-12 col-xl-10">
              <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div class="bg-image hover-zoom ripple rounded ripple-surface">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
                          class="w-100" />
                        <a href="#!">
                          <div class="hover-overlay">
                            <div class="mask"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-6">
                      <h5>Quant olap shirts</h5>
                      <p class="mb-4 mb-md-0">
                        There are many variations of passages of Lorem Ipsum available, but the
                        majority have suffered alteration in some form, by injected humour, or
                        randomised words which don't look even slightly believable.
                      </p>
                    </div>
                    <div class={`col-md-6 col-lg-3 col-xl-3 ${styles.border_sm_start_none} border-start`}>
                      <div class="d-flex flex-row align-items-center mb-1">
                        <h4 class="mb-1 me-1">Rp.5.000.000</h4>
                      </div>
                      <div class="d-flex flex-column mt-4">
                        <button class="btn btn-primary btn-sm" type="button">Details</button>
                        <button class="btn btn-outline-primary btn-sm mt-2" type="button">
                          Add to wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-12 col-xl-10">
              <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div class="bg-image hover-zoom ripple rounded ripple-surface">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(5).webp"
                          class="w-100" />
                        <a href="#!">
                          <div class="hover-overlay">
                            <div class="mask"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-6">
                      <h5>Quant ruybi shirts</h5>
                      <p class="mb-4 mb-md-0">
                        There are many variations of passages of Lorem Ipsum available, but the
                        majority have suffered alteration in some form, by injected humour, or
                        randomised words which don't look even slightly believable.
                      </p>
                    </div>
                    <div class={`col-md-6 col-lg-3 col-xl-3 ${styles.border_sm_start_none} border-start`}>
                      <div class="d-flex flex-row align-items-center mb-1">
                        <h4 class="mb-1 me-1">Rp.5.000.000</h4>
                      </div>
                      <div class="d-flex flex-column mt-4">
                        <button class="btn btn-primary btn-sm" type="button">Details</button>
                        <button class="btn btn-outline-primary btn-sm mt-2" type="button">
                          Add to wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer/>
      
    </div>
  )
}
