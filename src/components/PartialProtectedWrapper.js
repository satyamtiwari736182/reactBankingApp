import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PartialProtectedWrapper = (props) => {
    const isAuth = useSelector(store => store.auth.isAuth);
    const hasWallet = useSelector(store => store.auth.hasWallet);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) navigate("/login");
        if (hasWallet) navigate("/")
    }, []);
    return < props.component />

}

export default PartialProtectedWrapper