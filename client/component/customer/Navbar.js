import Link from 'next/link';
import { useRouter } from 'next/router';
// Icon
import { Bag, PersonCircle } from 'react-bootstrap-icons';
// CSS
import style from "../../styles/Navbar.module.css";
// Service
import AuthService from "../../services/auth.service";

export default function Navbar({isLogin, currentUser}) {
  
  const router = useRouter();

  const logout = () => {
    AuthService.logout()
    .then(()=>{
      router.push("/");
    });
  }

  return (
    <div>
      <nav className={`navbar navbar-expand-lg px-0 px-md-5 py-3 ${style.navbar}`}>
        <div className="container-fluid">
          <div className="dropdown me-0 me-md-5">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
          <Link href="/">
            <a className="navbar-brand">Navbar</a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex ms-auto mb-2 mb-lg-0" role="search">
              <input className="form-control me-2" type="search" placeholder="Cari Barang" aria-label="Search"/>
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            {isLogin ? 
              <>
                <Bag size={33} />
                <PersonCircle size={33} />{currentUser.nama}
                <button className="btn btn-primary ms-3" onClick={logout}>Logout</button>
              </>
              :
              <>
                <Link href="/login">
                  <button className="btn btn-primary ms-3">Login</button>
                </Link>
                <Link href="/register">
                  <button className="btn btn-primary ms-3">Register</button>
                </Link>
              </>
            }
            
          </div>
        </div>
      </nav>
      
    </div>
  )
}
