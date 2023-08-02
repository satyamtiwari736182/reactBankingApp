import axiosClient from '../utils/AxiosUtils';
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { number, object, string } from "yup";
import { setIsAmountChanged } from '../store/utilsSlice';

const TransferWallet = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasTransferred, setHasTransferred] = useState(false);
    const senderWalletId = useSelector(store => store.user.walletId);
    const dispatch = useDispatch();
    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage("");

        }, 5000);
    }, [errorMessage]);

    useEffect(() => {
        if (hasTransferred) setTimeout(() => setHasTransferred(false), 3000);
    }, [hasTransferred]);

    const initialValues = {
        walletId: "",
        amount: ""
    }
    const validationSchema = object({
        walletId: string().required("required").notOneOf([senderWalletId], "Not your wallitId!").matches(/^[a-zA-Z0-9]+$/, 'only alphanumeric char'),
        amount: number().required("required").min(1, "Atlest Rs.1")
    })
    const onSubmit = async (data, actions) => {
        try {
            const res = await axiosClient({
                url: "/wallet/transaction/transfer", method: 'post', data: {
                    senderWalletId: senderWalletId,
                    receiverWalletId: data.walletId,
                    amount: data.amount
                }
            })
            dispatch(setIsAmountChanged(true));
            setHasTransferred(true);
        } catch (error) {
            setErrorMessage("No such receiver's wallet exist!!");
            // setErrorMessage(error.response.data.msg);
        }
        finally {
            actions.resetForm()
        }
    }
    return (
        <div className='bg-blue-800 p-6 rounded-2xl '>
            <h1 className='text-center'>Money Transfer</h1>
            {errorMessage.length > 0 && <div className="bg-blue-900 bg-opacity-80 text-red-500 p-2 rounded-md m-2" >{errorMessage}</div>}

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                <Form action="/cart" method="GET" className="ml-4 min-w-[17rem]">

                    <div className="mb-5  mt-3">
                        <label htmlFor="walletId">Receiver walletId</label><br />
                        <Field type="text" name="walletId" id="walletId" className='text-black font-thin rounded-md mt-2 pl-1 outline-none' />
                        <div className="text-red-500 pl-3">
                            <ErrorMessage name="walletId" />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="amount"  >Amount</label><br />
                        <Field type="number" name="amount" id="amount" className='text-black font-thin rounded-md mt-2 pl-1 outline-none' />
                        <div className="text-red-500 pl-3">
                            <ErrorMessage name="amount" />
                        </div>
                    </div>

                    <div className="font-bold">
                        <div className='mt-3 flex justify-between items-center'>
                            <button type="submit" className=" bg-blue-700 p-2 rounded-md text-white text-sm hover:bg-blue-900"
                            >Transfer</button>
                            {hasTransferred && <span className='bg-green-600 p-2 rounded-md ml-2'>Transferred successfully</span>}
                        </div>
                    </div>

                </Form>
            </Formik>
        </div>
    )
}

export default TransferWallet