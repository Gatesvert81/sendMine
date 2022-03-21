import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { getDownloadURL, ref, } from 'firebase/storage'
import { db } from '../firebase/init'
import Button from './Button'
import { AuthContext } from './Context'


function FileCard({ file }) {
    
    const [fileUrl, setFileUrl] = useState(null)
    const [loading, setLoading] = useState(true)

    const { downloadFile } = useContext(AuthContext)


    const fileRef = ref(db, file?.fullPath)
    getDownloadURL(fileRef).then(url => {
        setFileUrl(url)
    })

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div>
                loading
            </div>
        )
    }


    return (
        <div className='w-full h-52 rounded-md flex flex-col justify-start shadow-md' >
            <div className='w-full h-full relative backdrop-blur-md ' >
                {
                    fileUrl ? (
                        <Image src={fileUrl} layout="fill" className='object-cover p-3 m-2' />
                    ) : (
                        <div className='w-full h-full backdrop-blur-md flex flex-col justify-center items-center text-center text-xl bg-blue-500 ' >
                            Loading ...
                        </div>
                    )
                }
            </div>
            <div className='capitalized w-full p-2 flex flex-row justify-between items-center ' >
                <p>
                    {file?.name.split('.')[0]}
                </p>
                <Button style="tetiary" click={() => downloadFile(file?.fullPath)}  >
                    Download
                </Button>
            </div>
        </div>
    )
}

export default FileCard