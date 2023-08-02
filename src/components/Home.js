import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setHasWallet, setIsAuth, setToken } from '../store/authSlice';
import { setUserId, setWalletId } from '../store/userSlice';

const Home = () => {
    const dispatch = useDispatch();
    if (localStorage.key(0) !== "user")
        localStorage.setItem("user", JSON.stringify({ userId: null, token: null, walletId: null }));

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.userId) dispatch(setIsAuth(true));
        if (user.walletId) dispatch(setHasWallet(true));
        dispatch(setToken(user.token));
        dispatch(setUserId(user.userId));
        dispatch(setWalletId(user.walletId));
    }, []);

    return (
        <div className='flex justify-between items-center p-3 max-msm:flex-col-reverse'>
            <div>
                <h1 className='text-xl font-bold mb-5'>Wallet Banking</h1>
                <p className='text-gray-700 mb-5'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolorum neque vitae esse
                </p>
                <p className='text-gray-700 mb-5'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolorum neque vitae esse laudantium sapiente praesentium atque in ea. Iste praesentium enim, accusamus unde sapiente rem harum laboriosam veritatis quasi.
                </p>
                <button className='bg-slate-800 text-white font-bold p-3 rounded-md cursor-pointer hover:bg-slate-950'>Read more</button>
            </div>
            <img className="w-1/2 rounded-xl ml-4 max-msm:w-screen max-msm:mb-2" src="https://economictimes.indiatimes.com/thumb/msid-81946453,width-1200,height-900,resizemode-4,imgsize-104659/wallet-interoperability.jpg?from=mdr" alt="wallet-img" />
        </div>
    )
}

export default Home