import { useState } from "react";
import { useRouter } from 'next/router';
import Head from 'next/head'
// Form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';
// Component

// Auth service
import AuthService from "../../services/auth.service";

export default function Login() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email Masih Kosong").email("Format Email Tidak Valid"),
    password: Yup.string().required("Password Maih Kosong")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (data) => {
      setLoading(true);

      AuthService.login(data.email, data.password)
        .then((response)=>{
          if (response.data.message === "Email atau Password Salah") {
            setMessage(response.data.message);
            setLoading(false);
          } else if (response.data.message === "Log in Customer Berhasil") {
            setMessage("Email atau Password Salah");
            setLoading(false);
            AuthService.logout();
          }
          else if (response.data.message === "Log in Admin Berhasil") {
            setLoading(false);
            router.push("/admin/dashboard");
          }
        })
        .catch((error)=>{
          setLoading(false);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
          console.log(error)
        })

    },
  });

  return (

    <>
      <Head>
        <title>Login Admin</title>
      </Head>

      <div className="container">
        <h1 className="text-center mt-5">Login Admin</h1>

        <form className="row row-cols-1 justify-content-center my-5 pb-5" onSubmit={formik.handleSubmit} >

          <div className="mb-3 col-9 col-md-4">
            <div className="form-floating">
              <input 
                type="text" 
                className={`form-control ${formik.errors.email ? "is-invalid" : ""}`} 
                name="email"  
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <label forhtml="email">Email</label>
            </div>
            <div className="text-danger">
              {formik.errors.email ? formik.errors.email : null}
            </div>
          </div>

          <div className="w-100"></div>

          <div className="mb-3 col-9 col-md-4">
            <div className="form-floating">
              <input 
                type="password"
                className={`form-control ${formik.errors.password ? "is-invalid" : ""}`}
                name="password"
                placeholder="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <label forhtml="password">Password</label>
            </div>
            <div className="text-danger">
              {formik.errors.password ? formik.errors.password : null}
            </div>
          </div>

          <div className="w-100"></div>

          {message && (
            <div className="mb-2 col-9 col-md-4">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}

          <div className="w-100"></div>
          
          <div className="col-9 col-md-4">
            <div className="d-grid">
              <button type="submit" className="btn btn-lg btn-primary" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Login
              </button>
            </div>
          </div>

        </form>
      </div>

    </>
  )
}
