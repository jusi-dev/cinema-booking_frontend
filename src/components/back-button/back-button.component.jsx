import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = ({size}) => {
    const navigate = useNavigate();
    return (
        <span class={`material-icons text-blue-600 cursor-pointer md-${size}`} onClick={() => navigate(-1)}>
            keyboard_return
        </span>
        // <button className='bg-blue-600 rounded-lg px-4 py-2 text-white font-bold text-center' onClick={() => navigate(-1)}>Go back</button>
    )
}

export default BackButton