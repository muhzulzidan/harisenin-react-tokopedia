import React from 'react';
import { useDispatch,} from 'react-redux';
import {  openModal } from '../redux/modalSlice';


const LoginModal: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <button
                onClick={() => dispatch(openModal())} // Dispatch the openModal action
                className="border border-green-700 hover:bg-green-600 text-stone-950 font-bold py-2 px-4 rounded"
            >
                Masuk
            </button> 
        </div>
    );
};

export default LoginModal;
