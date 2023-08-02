import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { setHasWallet, setIsAuth, setToken } from "../store/authSlice";
import { setWalletId, setUserId } from "../store/userSlice";
import { useEffect, useState } from "react";
import axiosClient from '../utils/AxiosUtils';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const isAuth = useSelector(store => store.auth.isAuth);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuth) navigate("/create-wallet");
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage("");

        }, 5000);
    }, [errorMessage]);

    const initialValues = {
        name: "",
        password: ""
    }
    const validationSchema = object({
        name: string().required("required").min(3, "Atlest 3 letters!").matches(/^[a-zA-Z0-9]+$/, 'only alphanumeric char'),
        password: string().required("required").min(3, "Atlest 3 letters!")
    })
    const navigate = useNavigate();
    const onSubmit = async (data, actions) => {
        try {

            const res = await axiosClient({
                url: "/login", method: 'post', data: {
                    username: data.name,
                    password: data.password
                }
            })
            console.log(res.data)
            console.log(data)
            dispatch(setToken(res.data.jwtToken))
            if (res.data) {
                localStorage.setItem("user", JSON.stringify({
                    userId: res.data.userId,
                    walletId: res.data.walletId ? res.data.walletId : null,
                    token: res.data.jwtToken
                }));

                dispatch(setUserId(res.data.userId))
                dispatch(setWalletId(res.data.walletId));
                dispatch(setIsAuth(true));

            }
            if (res.data.walletId)
                dispatch(setHasWallet(true));

            navigate("/create-wallet");
        } catch (error) {
            setErrorMessage(error.response.data.msg);
            // console.log("error.....", error.response.data.msg)
        }
        finally {
            actions.resetForm();
        }


    }

    return <div className="flex flex-col items-center">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            <Form className="flex flex-col items-center bg-blue-900 bg-opacity-90 p-7 rounded-3xl pt-10 font-bold text-white">
                <h1 className="text-2xl">Login</h1>

                {errorMessage.length > 0 && <div className="bg-blue-900 text-red-500 p-1.5 rounded-md m-2" >{errorMessage}</div>}

                <div className="mb-5">
                    <label htmlFor="name" >UserName</label><br />
                    <Field type="text" name="name" id="name" className=" p-1 w-80 rounded-xl pl-2 text-black font-thin outline-none" />
                    <div className="text-red-500 pl-3">
                        <ErrorMessage name="name" />
                    </div>
                </div>

                <div className="mb-5">
                    <label htmlFor="password"  >Password</label><br />
                    <Field type="password" name="password" id="password" className="p-1 w-80 rounded-xl pl-2 text-black font-thin outline-none" />
                    <div className="text-red-500 pl-3">
                        <ErrorMessage name="password" />
                    </div>
                </div>

                <div className="font-bold flex flex-col items-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 p-3 rounded-xl text-white">Login</button>
                    <p className="text-sm mt-2">Not have an Acoount? <span className="text-blue-400 hover:text-blue-300 cursor-pointer" onClick={() => navigate("/signup")}>Register</span></p>
                </div>

            </Form>
        </Formik>
    </div>
}

export default Login;



// (data, actions) => {
//     onSubmit(data);
//     actions.resetForm({
//         username: '',
//         password: ''
//     });
// }