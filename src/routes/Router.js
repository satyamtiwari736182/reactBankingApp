import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Error from "../components/Error"
import Home from "../components/Home"
import Signup from "../components/Signup"
import Login from "../components/Login"
import Banking from "../components/Banking"
import App from '../App'
import AccountStatement from '../components/AccountStatement'
import Reward from '../components/Reward'
import ProtectedWrapper from '../components/ProtectedWrapper'
import PartialProtectedWrapper from '../components/PartialProtectedWrapper'
import CreateWallet from '../components/CreateWallet'


const Router = [{
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: "signup",
            element: <Signup />
        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "create-wallet",
            element: <PartialProtectedWrapper component={CreateWallet} />
        },
        {
            path: "banking",
            children: [
                {
                    index: true,
                    element: <ProtectedWrapper component={Banking} />
                },
                {
                    path: 'statement',
                    element: <ProtectedWrapper component={AccountStatement} />
                },
                {
                    path: 'reward',
                    element: <ProtectedWrapper component={Reward} />
                }
            ]
        }
    ]
}]


export default Router