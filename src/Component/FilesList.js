import React, { useContext, useEffect } from 'react'
import FileCard from './FileCard'
import { AuthContext } from './Context'

function FilesList() {

    const { getFiles, files } = useContext(AuthContext)

    useEffect(() => {
      getFiles()
    }, [])

    // if (!files) {
    //     return (
    //         <div>

    //         </div>
    //     )
    // }
    

    return (
        <div className='w-full min-h-full py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ' >
            {
                files?.length > 0 ? files.map((file, index) => (
                    <FileCard file={file} key={index} />
                )) : (
                    <p className=' w-full text-center' >
                        No files added yet .
                    </p>
                )
            }
        </div>
    )
}

export default FilesList