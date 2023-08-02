import axiosClient from '../utils/AxiosUtils';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { number, object, string, ref } from "yup";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);


  const isAuth = useSelector(store => store.auth.isAuth);
  useEffect(() => {
    if (isAuth) navigate("/home");
  }, []);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    cfpassword: ""
  }
  const validationSchema = object({
    name: string().required("required").min(3, "Atlest 3 letters!").matches(/^[a-zA-Z0-9]+$/, 'only alphanumeric char'),
    email: string().email("inValid email format").required("required"),
    phone: number().required("required"),
    password: string().required("required").min(3, "Atlest 3 letters!"),
    cfpassword: string().required("required").oneOf([ref('password'), null], 'Passwords must match'),
  })
  const navigate = useNavigate();
  const onSubmit = async (data, actions) => {
    console.log(data)
    try {
      const res = await axiosClient({
        url: "/signup", method: 'post', data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password
        }
      })
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.msg);
      console.log(error)
    }
    finally {
      actions.resetForm();
    }
  }

  return <div className="flex flex-col items-center">
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
      <Form action="" method="POST" className="flex flex-col items-center bg-blue-900 bg-opacity-90 p-7 rounded-3xl pt-10 font-bold text-white">

        <h1 className="text-2xl">Signup</h1>

        {errorMessage.length > 0 && <div className="bg-blue-900 text-red-500 p-2 rounded-md m-2" >{errorMessage}</div>}


        <div className="mb-5">
          <label htmlFor="name" >Name</label><br />
          <Field type="text" name="name" id="name" className="p-1 w-80 outline-none text-black font-thin rounded-xl pl-2" />
          <div className="text-red-500 pl-3">
            <ErrorMessage name="name" />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="email" >Email</label><br />
          <Field type="email" name="email" id="email" className="p-1  outline-none text-black font-thin w-80 rounded-xl pl-2" />
          <div className="text-red-500 pl-3">
            <ErrorMessage name="email" />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="phone" >Phone</label><br />
          <Field type="number" name="phone" id="phone" className="p-1 outline-none text-black font-thin w-80 rounded-xl pl-2" />
          <div className="text-red-500 pl-3">
            <ErrorMessage name="phone" />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="password" >Password</label><br />
          <Field type="password" name="password" id="password" className="outline-none text-black font-thin p-1 w-80 rounded-xl pl-2" />
          <div className="text-red-500 pl-3">
            <ErrorMessage name="password" />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="cfpassword" >Confirm Password</label><br />
          <Field type="password" name="cfpassword" id="cfpassword" className="outline-none text-black font-thin p-1 w-80 rounded-xl pl-2" />
          <div className="text-red-500 pl-3">
            <ErrorMessage name="cfpassword" />
          </div>
        </div>

        <div className="font-bold flex flex-col items-center">
          <button type="submit" className="outline-none bg-blue-500 hover:bg-blue-700 p-3 rounded-xl text-white">Register</button>
          <p className="text-sm mt-2">Already have an acoount? <span className="text-blue-400 hover:text-blue-300 cursor-pointer" onClick={() => navigate("/login")}>Login</span></p>
        </div>

      </Form>
    </Formik>
  </div>
}

export default Signup;

