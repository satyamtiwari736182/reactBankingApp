import axiosClient from '../utils/AxiosUtils';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setHasWallet, setIsAuth, setToken } from '../store/authSlice';
import { setUserId, setWalletId } from '../store/userSlice';

const AccountStatement = () => {
    const walletId = useSelector(store => store.user.walletId);
    const [transactions, setTransactions] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.userId) dispatch(setIsAuth(true));
        if (user?.walletId) dispatch(setHasWallet(true));
        dispatch(setToken(user?.token));
        dispatch(setUserId(user?.userId));
        dispatch(setWalletId(user?.walletId));
        const getTransaction = async () => {
            const res = await axiosClient({ url: `/transaction/${walletId ? walletId : user?.walletId}` })
            console.log(res.data)
            setTransactions(res.data);
        }
        getTransaction();
    }, []);
    return (
        <div className='m-5 '>
            <h1 className='text-blue-800 text-2xl font-bold text-center m-5'>Account Statement</h1>
            <div className='overflow-auto rounded-md shadow'>
                <table className='border border-slate-800 w-full'>
                    <thead className='border-b-2 bg-blue-900 bg-opacity-90 text-white border-slate-800'>
                        <tr>
                            <th className='border border-slate-800 p-2 '>Sl. no.</th>
                            <th className='border border-slate-800 p-2 '>Transaction Id</th>
                            <th className='border border-slate-800 p-2 '>( to | from ) WalletId </th>
                            <th className='border border-slate-800 p-2 '>CashBack</th>
                            <th className='border border-slate-800 p-2 '>Amount</th>
                            <th className='border border-slate-800 p-2 '>Transaction Type</th>
                            <th className='border border-slate-800 p-2 '>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((transaction, i) =>
                                <tr key={transaction.id} className='border border-slate-800'>
                                    <td className='border border-slate-800 p-2 whitespace-nowrap'>{i + 1}</td>
                                    <td className='border border-slate-800 p-2 whitespace-nowrap'>{transaction.id}</td>
                                    <td className='border border-slate-800 p-2 whitespace-nowrap'>{transaction.tranferWalletId}</td>
                                    <td className='border border-slate-800 p-2 whitespace-nowrap'>{transaction.cashBack > 0 ? `₹${transaction.cashBack}` : "_"}</td>
                                    <td className='border border-slate-800 p-2 whitespace-nowrap'>₹{transaction.amount}</td>
                                    <td className='border border-slate-800 p-2 whitespace-nowrap'>{transaction.category}</td>
                                    <td className='border border-slate-800 p-2 whitespace-nowrap'>{(new Date(transaction.dateTime)).toLocaleString("en-US")}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AccountStatement