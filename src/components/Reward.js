import axiosClient from '../utils/AxiosUtils';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setHasWallet, setIsAuth, setToken } from '../store/authSlice';
import { setUserId, setWalletId } from '../store/userSlice';
const Reward = () => {
  const walletId = useSelector(store => store.user.walletId);
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.userId) dispatch(setIsAuth(true));
    if (user.walletId) dispatch(setHasWallet(true));
    dispatch(setToken(user.token));
    dispatch(setUserId(user.userId));
    dispatch(setWalletId(user.walletId));
    const getTransaction = async () => {
      const res = await axiosClient({ url: `/reward/${walletId ? walletId : user.walletId}` })
      setTransactions(res.data);
    }
    getTransaction();
  }, []);

  return (
    <div className='text-white font-bold m-2'>
      <h1 className='text-blue-800 text-3xl text-center m-4'>Your Rewards</h1>
      <div className='flex flex-wrap gap-1 text-white'>
        {
          transactions.map(transaction =>
            <div key={transaction.id} className='bg-blue-800 p-10 rounded-2xl min-w-[21rem]'>
              <h1 className='text-center mb-5 font-bold text-xl'>CashBack: ₹{transaction.cashBack}</h1>
              <p className='mb-3 text-sm'>Transaction id: {transaction.id}</p>
              <p>Date: {transaction.dateTime}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Reward