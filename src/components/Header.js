import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { setHasWallet, setIsAuth, setToken } from '../store/authSlice';
import { setWalletId, setUserId } from '../store/userSlice';

const Header = () => {
    const isAuth = useSelector(store => store.auth.isAuth);
    const hasWallet = useSelector(store => store.auth.hasWallet);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setIsAuth(false));
        dispatch(setHasWallet(false));
        dispatch(setToken(null));
        dispatch(setUserId(null));
        dispatch(setWalletId(null));
        localStorage.setItem("user", JSON.stringify({ userId: null, token: null, walletId: null }));
    }
    return (
        <div className='flex justify-between items-center p-2 bg-blue-900 bg-opacity-90 text-white font-bold'>
            <Link to='/'>
                <div className='w-20'>
                    <img data-testid="test-logo" className="rounded-full cursor-pointer items-stretch" src="https://w1.pngwing.com/pngs/320/650/png-transparent-money-logo-cryptocurrency-wallet-debt-finance-bank-saving-guarantee-business.png" alt="logo" />
                </div>
            </Link>
            <h1 className='text-2xl'>Wallet Banking</h1>
            <div>
                <ul className='flex'>
                    <Link to='/'>
                        <li className='pr-4 underline-offset-8 hover:underline hover:text-slate-300'>Home</li>
                    </Link>

                    {isAuth && hasWallet && <Link to="banking">
                        <li className='pr-4 underline-offset-8 hover:underline hover:text-slate-300'>Banking</li>
                    </Link>}

                    {isAuth && !hasWallet && <Link to="create-wallet">
                        <li className='pr-4 underline-offset-8 hover:underline hover:text-slate-300'>CreateWallet</li>
                    </Link>}

                    {!isAuth && <Link to="signup">
                        <li className='pr-4 underline-offset-8 hover:underline hover:text-slate-300'>Register</li>
                    </Link>}

                    {!isAuth && <Link to='login'>
                        <li className='pr-4 underline-offset-8 hover:underline hover:text-slate-300'>Login</li>
                    </Link>}

                    {isAuth && <Link to="/">
                        <li className='pr-4 underline-offset-8 hover:underline hover:text-slate-300' onClick={handleLogout}>Logout</li>
                    </Link>
                    }

                </ul>
            </div>
        </div >
    )
}

export default Header