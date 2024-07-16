import React from 'react'
import FileViewer from 'react-file-viewer';
import { toast } from 'react-toastify';

export default function MyGymsPageCrm() {
  const file = 'https://myfit-russia.ru/doc/test.docx'
  const type = 'docx'
  return (
    <FileViewer
        fileType={type}
        filePath={file}
        errorComponent={<></>}
        onError={
            e => toast.error('Ошибка при открытии файла' + e, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }/>

  
  )
}


    {/* <div className='flex justify-center mt-[300px] text-[30px] text-crm-link'>MyGymsPageCrm</div> */}
