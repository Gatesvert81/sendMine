import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { AuthContext } from '../src/Component/Context'
import FilesList from '../src/Component/FilesList'
import UploadFile from '../src/Component/UploadFile'



export default function Home() {

  const { user } = useContext(AuthContext)

  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-full min-h-screen flex flex-col justify-start items-start py-20 px-10 gap-10' >
        <p className='w-full text-center text-xl md:text-3xl font-semibold ' > 
          Welcome 
          {
            user ? `, ${user?.email.split('@')[0]}` : ' To sendMine'
          }
          !
        </p>
        {
          user ? (
            <div className='w-full h-fit ' >
              <UploadFile />
              <FilesList />
            </div>
          ) : (
            <div className='w-full h-full flex flex-col justify-center items-center' >
              <p className='capitalize text-center ' >You can sign In here and on another device to connect both and send file between devices.</p>
              <div className="w-full h-60 bg-sendMine bg-no-repeat bg-contain bg-center" />
            </div>
          )
        }
      </main>
    </div>
  )
}
