import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setHasWallet } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../utils/AxiosUtils';

import { setWalletId } from '../store/userSlice';


const CreateWallet = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [walletId, setWallet] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user.userId);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 5000);
    }, [errorMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosClient({
                url: "/wallet", method: 'post', data: {
                    userId: user,
                    walletId: walletId,
                }
            });
            console.log(res.data);
            dispatch(setHasWallet(true));
            dispatch(setWalletId(res.data.walletId));
            const localUser = JSON.parse(localStorage.getItem("user"));
            localUser.walletId = walletId;
            localStorage.setItem("user", JSON.stringify(localUser));
            console.log(localUser)
            navigate("/banking");
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.msg);
        }
    }
    return (
        <div className='text-white font-bold h-screen'>
            <h1 className='text-blue-800 text-3xl text-center mt-2'>Services</h1>
            <div className='bg-blue-800 w-96 h-60 p-3 m-14 rounded-2xl '>
                <h1 className='text-center'>
                    Create Wallet
                </h1>
                {errorMessage.length > 0 && <div className="bg-blue-900 text-red-500 p-1.5 rounded-md m-2" >{errorMessage}</div>}

                <div className='ml-16 mt-10'>
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="walletId">WalletId</label>< br />
                        <input type="text" pattern="[a-zA-Z0-9]+" name="walletId" id="walletId" className='text-black font-thin rounded-md mt-2 pl-1 outline-none' value={walletId} onChange={(e) => setWallet(e.target.value)} required />< br />
                        <div className='mt-3'>
                            <button type="submit" className=" bg-blue-700 p-2 rounded-md text-white text-sm hover:bg-blue-900"
                            >Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default CreateWallet;