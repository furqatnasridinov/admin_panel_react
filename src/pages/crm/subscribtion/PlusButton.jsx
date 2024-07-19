import React from 'react'

export default function PlusButton({
    onClick
}) {
    return (
        <svg className='cursor-pointer' onClick={onClick} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" fill="white" />
            <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#3AB96D" />
            <path d="M14 20H20M26 20H20M20 20V14M20 20V26" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}
