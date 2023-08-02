import axiosClient from '../utils/AxiosUtils';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setHasWallet, setIsAuth, setToken } from '../store/authSlice';
import { setUserId, setWalletId } from '../store/userSlice';
import { setIsAmountChanged } from '../store/utilsSlice'
import TransferWallet from './TransferWallet';
const Banking = () => {
    const [rechargeAmount, setRechargeAmount] = useState("");
    const isAmountChaged = useSelector(store => store.utils.isAmountChaged);
    const [hasRecharged, setHasRecharged] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const walletId = useSelector(store => store.user.walletId);
    const [wallet, setWallet] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        // const user = localStorage.getItem("user");
        if (user.userId) dispatch(setIsAuth(true));
        if (user.walletId) dispatch(setHasWallet(true));
        dispatch(setToken(user.token));
        dispatch(setUserId(user.userId));
        dispatch(setWalletId(user.walletId));

        const getWallet = async () => {
            const res = await axiosClient({ url: `/wallet/${walletId ? walletId : user.walletId}` });
            setWallet(res.data);
        }
        getWallet();
    }, [])

    useEffect(() => {
        const updateWallet = async () => {
            const res = await axiosClient({ url: `/wallet/${walletId}` });
            setWallet(res.data);
            dispatch(setIsAmountChanged(false));
        }
        if (isAmountChaged) updateWallet();
    }, [isAmountChaged]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 5000);
    }, [errorMessage]);

    useEffect(() => {
        if (hasRecharged) setTimeout(() => setHasRecharged(false), 3000);
    }, [hasRecharged]);

    const handleRecharge = async () => {
        if (rechargeAmount <= 0) {
            setErrorMessage("enter positive value")
            setRechargeAmount("");
        } else {
            try {
                const res = await axiosClient({
                    url: "/wallet/transaction", method: 'post', data: {
                        walletId: walletId,
                        amount: rechargeAmount
                    }
                })
                setHasRecharged(true);
                setRechargeAmount("");
                console.log(res.data);
                dispatch(setIsAmountChanged(true));
                setWallet(res.data);
            } catch (error) {
                setErrorMessage(error.response.data.msg);
            }
        }
    }

    return (
        <div className='text-white font-bold'>
            <h1 className='text-blue-800 text-3xl text-center mt-2'>Services</h1>

            <div className='flex flex-wrap max-msm:gap-2 gap-2 m-14 max-msm:flex-col max-msm:m-1'>

                <div className='bg-blue-800 p-6 rounded-2xl min-w-[21rem] max-[360px]:w-screen max-msm:mb-0'>
                    <h1 className='text-center'>
                        My Wallet
                    </h1>
                    <div className='mt-10 ml-4'>
                        <h2>Wallet id: {wallet?.walletId} </h2>
                        <h2>Balance: ₹ {wallet?.balance} </h2>
                    </div>
                </div>

                <div className='bg-blue-800 p-6 rounded-2xl min-w-[21rem]'>
                    <h1 className='text-center'>
                        My Rewards
                    </h1>
                    <div className='mt-10 ml-4'>
                        <h2>Total Reward: ₹ {wallet?.cashBack} </h2>
                        <Link to='reward'>
                            <button type="reset" className=" bg-blue-700 p-2 rounded-md text-white text-sm mt-3 hover:bg-blue-900">All reward</button>
                        </Link>

                    </div>
                </div>

                <div className='bg-blue-800 p-6 rounded-2xl min-w-[21rem]'>
                    <h1 className='text-center'> Recharge Wallet</h1>
                    {errorMessage.length > 0 && <div className=" bg-blue-900 bg-opacity-80 text-red-500 p-1.5 rounded-md text-center mt-2" >{errorMessage}</div>}

                    <div className='ml-4 mt-10'>
                        <label htmlFor="walletId" name="recharge">Amount</label>< br />
                        <input data-testid="test-recharge" type="number" name="recharge" id="walletId" className='text-black font-thin rounded-md mt-2 pl-1 outline-none'
                            value={rechargeAmount}
                            onChange={(e) => setRechargeAmount(e.target.value)}
                        />< br />
                        <div className='mt-3 flex justify-between items-center'>
                            <button type="reset" className=" bg-blue-700 p-2 rounded-md text-white text-sm hover:bg-blue-900"
                                onClick={handleRecharge}
                            >Recharge</button>
                            {hasRecharged && <span className='bg-green-600 p-2 rounded-md ml-4'>Recharged successfully</span>}
                        </div>
                    </div>
                </div>

                <TransferWallet />

                <div className='bg-blue-800 p-6 rounded-2xl min-w-[21rem]'>
                    <h1 className='text-center'>
                        Account statement
                    </h1>
                    <div className='mt-10 ml-4'>
                        <h2>Status: <span className='bg-green-500 p-1 rounded-md'>Active</span> </h2>
                        <Link to='statement'>
                            <button type="reset" className=" bg-blue-700 p-2 rounded-md text-white text-sm mt-3 hover:bg-blue-900">Details</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banking