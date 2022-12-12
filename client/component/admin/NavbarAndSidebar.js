import { useRouter } from 'next/router';
import Link from 'next/link';
// Auth service
import AuthService from "../../services/auth.service";
// Icon
import { IconContext } from "react-icons";
import { BsFillMenuButtonWideFill, BsLayoutTextWindowReverse, BsPersonLinesFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";

const NavbarAndSidebar = ({children ,nama}) => {

  const router = useRouter();

  const sidebarToggle = (event) => {
    event.preventDefault();
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
  }

  const logout = () => {
    AuthService.logout().then(()=>{
      router.push("/admin");  
    });
  }
  
  return (
    <>
       <div className="d-flex" id="wrapper">
      {/*<!-- Sidebar-->*/}
      <div className="border-end bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading border-bottom bg-light">
            Composell
          </div>
          <div className="list-group list-group-flush">
              <Link href="/admin/dashboard">
                <a className={`list-group-item list-group-item-action list-group-item-light p-3 sidebar-item ${router.pathname == "/admin/dashboard" && 'active-sidebar'}`}> 
                  <BsLayoutTextWindowReverse/> Dashboard
                </a>
              </Link>
              <Link href="/admin/dashboard">
                <a className={`list-group-item list-group-item-action list-group-item-light p-3 sidebar-item ${router.pathname == "/admin/management_admin" && 'active-sidebar'}`}>
                  <BsPersonLinesFill/> Management Admin
                </a>
              </Link>
              <Link href="/admin/dashboard">
                <a className={`list-group-item list-group-item-action list-group-item-light p-3 sidebar-item ${router.pathname == "/admin/" && 'active-sidebar'}`}>Customer</a>
              </Link>
              <Link href="/admin/dashboard">
                <a className={`list-group-item list-group-item-action list-group-item-light p-3 sidebar-item ${router.pathname == "/admin/" && 'active-sidebar'}`}>Product</a>
              </Link>
              <a className="list-group-item list-group-item-action list-group-item-light p-3 sidebar-item" href="#!">Pesanan</a>
          </div>
      </div>
      {/*<!-- Page content wrapper-->*/}
      <div id="page-content-wrapper">
          {/*<!-- Top navigation-->*/}
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <div className="container-fluid">
                  <button className="btn btn-primary" id="sidebarToggle" onClick={sidebarToggle}> 
                    <IconContext.Provider value={{ color: "black" }}> <BsFillMenuButtonWideFill /> </IconContext.Provider> <span style={{color: "black"}}>Menu</span>
                  </button>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                          {/*bisa di pake nanti*/} 
                          {/*<li className="nav-item active"><a className="nav-link" href="#!">Home</a></li>
                          <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>*/}
                          <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {nama}
                              </a>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                  {/*bisa di pake nanti*/}
                                  {/*<a className="dropdown-item" href="#!">Action</a>
                                  <a className="dropdown-item" href="#!">Another action</a>*/}
                                  {/*<div className="dropdown-divider"></div>*/}
                                  <button className="dropdown-item" onClick={logout}><TbLogout/> Logout</button>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
          {/*<!-- Page content-->*/}
          <div className="container-fluid">
             <main>{children}</main>
          </div>
      </div>
  </div>
    </>
  );
  
  
};

export default NavbarAndSidebar;