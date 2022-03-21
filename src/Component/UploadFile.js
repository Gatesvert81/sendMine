import React, { useContext } from 'react'
import { AuthContext } from './Context'

function UploadFile() {

    const { uploadFiles, progress } = useContext(AuthContext)

    const formHandler = (e) => {
        e.preventDefault()
        const { file } = e.target.elements
        const uploadedFile = file.files[0]
        uploadFiles(uploadedFile)
    }

    return (
        <div className='flex w-full flex-col justify-start items-center ' >
            <form onSubmit={formHandler} className="w-full grid grid-cols-1 gap-5 " >
                <fieldset className='fieldset flex flex-col w-full justify-center items-center' >
                    <label className='capitalize font-semibold text-lg' >
                        Select File
                    </label>
                    <input type="file" name='file' className='' required />
                </fieldset>
                <fieldset className='fieldset flex flex-row md:flex-col w-full justify-center items-center'>
                    <button type='submit' className='primary md:w-fit' >
                        Upload
                    </button>
                </fieldset>
                {
                    progress === 0 ? null : (
                        <progress value={progress} max="100">
                            {progress}%
                        </progress>
                    )
                }
            </form>
        </div>
    )
}

export default UploadFile