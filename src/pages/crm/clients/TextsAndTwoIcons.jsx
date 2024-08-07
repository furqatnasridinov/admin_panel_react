import React from 'react'
import "./index.css"

export default function TextsAndTwoIcons() {
  return (
        <div className='flex flex-row items-center justify-between'>
            <div className="flex flex-col gap-[5px]">
                <span className='text-[14px] font-bold leading-[16px]'>В этом разделе находятся ваши клиенты, не относящиеся к подписке MyFit</span>
                <span className='text-[14px] font-normal leading-[16px]'>Вы можете свободно добавлять новых клиентов и управлять текущими.</span>
            </div>
            <div className="flex flex-row gap-[10px]">
                <div className='greenMiniButton'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='greenMiniButton'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 16L21 16" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 16H6" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.5 18.5C9.88071 18.5 11 17.3807 11 16C11 14.6193 9.88071 13.5 8.5 13.5C7.11929 13.5 6 14.6193 6 16C6 17.3807 7.11929 18.5 8.5 18.5Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 8L21 8" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 8H13" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.5 10.5C16.8807 10.5 18 9.38071 18 8C18 6.61929 16.8807 5.5 15.5 5.5C14.1193 5.5 13 6.61929 13 8C13 9.38071 14.1193 10.5 15.5 10.5Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </div>
            </div>
        </div>
  )
}
