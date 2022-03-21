import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from './Context'
import QRCode from 'react-qr-code'
import io from 'socket.io-client'
import { useRouter } from 'next/router'
import Button from './Button'

// const socket = io.connect('http://localhost:4000')

function Navigation() {
    const { logIn, signUp, user, logOut } = useContext(AuthContext)


    const [openqr, setOpenqr] = useState(false)
    const [routeName, setRouteName] = useState(null)
    const [sideNav, setSideNav] = useState(false)
    const [signOption, setSignOption] = useState(null)
    const [getAuth, setGetAuth] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { roomId } = router.query
    const handleQrcode = () => {
        setOpenqr(true)
        console.log(router.asPath)
        setRouteName(`${router.basePath}${router.asPath}?roomId=${user?.uid}`)
    }

    // useEffect(() => {
    //     // Initialize socket.io connection with the server
    //     socket.on('connect', () => {
    //         console.log("connection starting")
    //     })
    // })

    // useEffect(() => {

    //     const room = user?.uid

    //     if (user) {
    //         socket.emit('join-room', room)
    //         socket.emit('sendAuth', {
    //             room: room,
    //             ...getAuth
    //         })
    //     }
    //     console.log(routeName)
    // }, [openqr])

    // useEffect(() => {

    //     if (user) return
    //     socket.emit('recieveAuth', (email, password) => {
    //         console.log("new added thru qr",email, password)
    //     })

    // }, [])

    const cd = () => {
        setTimeout(() => {
            setLoading(false)
            setSideNav(!sideNav)
        }, 1500);
    }

    const handleSignIn = (e) => {
        setLoading(true)
        e.preventDefault()
        const { email, password } = e.target.elements
        const emailValue = email.value
        const passwordValue = password.value

        setGetAuth({
            email: emailValue,
            password: passwordValue
        })

        logIn(emailValue, passwordValue,cd)
        email.value = ""
        password.value = ""
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        setLoading(true)
        const { email, password, confirmPassword } = e.target.elements
        const emailValue = email.value
        const passwordValue = password.value
        const confirmPasswordValue = confirmPassword.value

        if (passwordValue.length < 5) {
            alert("password is too short")
            return
        }
        if (passwordValue !== confirmPasswordValue) {
            alert("passwords must be the same")
            return
        }

        signUp(emailValue, passwordValue, cd)
        setGetAuth({
            email: emailValue,
            password: passwordValue
        })
        email.value = ""
        password.value = ""
        confirmPassword.value = ""
    }

    const handleAuthWithQRcode = (e) => {
        if (signOption === "sign up") {
            handleSignUp(e)
        } else {
            handleSignIn(e)
        }
        socket.emit('sendAuth', {
            room: roomId,
            ...getAuth
        })
        router.push('/')
    }    



    return (
        <>
            <nav className='w-full fixed top-0 backdrop-blur-md flex flex-row justify-between items-center p-5 md:px-20  z-10 ' >
                <div className="font-semibold" >
                    SendMINE
                </div>
                <div className='w-full flex flex-row justify-end gap-3 items-center' >
                    {
                        user ? (
                            <>
                                <p className='w-8 h-8 bg-pink-800 rounded-full flex flex-col justify-center items-center text-center capitalize text-lg font-bold text-white' >
                                    {user?.email[0]}
                                </p>
                                <Button style="tetiary" click={logOut} >
                                    logout
                                </Button>
                            </>

                        ) : (
                            <>
                                <Button style="primary" click={() => {
                                    setSideNav(!sideNav)
                                    setSignOption("sign in")
                                }}>
                                    Sign In
                                </Button>
                                <Button style="tetiary" click={() => {
                                    setSideNav(!sideNav)
                                    setSignOption("sign up")
                                }} >
                                    Sign up
                                </Button>
                            </>
                        )
                    }
                    {/* <button onClick={() => handleQrcode()} >
                        QR code
                    </button> */}
                </div>
            </nav>
            <div className={` ${openqr ? 'flex fixed w-48 h-48 bg-blue-300 top-10 left-10 z-20' : "hidden"}`} onClick={() => setOpenqr(false)} >
                <div>
                    <QRCode value={routeName || ""} />
                </div>
            </div>
            <div className={` ${sideNav ? 'flex fixed w-full h-full justify-center items-start backdrop-blur-sm p-5 pt-28 top-0 left-0 shadow-lg overflow-hidden z-20' : "hidden"}`}  >
                <div className='w-4/5 h-fit md:w-80 md:h-fit bg-blue-300 flex flex-col relative rounded' >
                    <div className='w-full grid grid-cols-2 text-sm relative ' >
                        <button className={`p-3 rounded-tl font-medium ${signOption === "sign up" ? 'bg-blue-900 text-white font-semibold' : 'text-blue-900'}`} onClick={() => setSignOption("sign up")} >
                            Sign Up
                        </button>
                        <button className={`p-3 rounded-tr font-medium ${signOption === "sign in" ? 'bg-blue-900 text-white font-semibold' : 'text-blue-900'}`} onClick={() => setSignOption("sign in")}>
                            Sign In
                        </button>
                        <button onClick={() => setSideNav(!sideNav)} className="absolute -top-9  -right-9 w-10 h-10 bg-blue-900 rounded-full text-lg text-white text-center border-2 border-white">
                            X
                        </button>
                    </div>
                    <div className='w-full h-full p-5 ' >
                        {
                            signOption === "sign up" ? (
                                <form onSubmit={handleSignUp} className="w-full grid grid-cols-1 gap-2" >
                                    <fieldset className="fieldset" >
                                        <label className='capitalize'  >
                                            Email
                                        </label>
                                        <input className='text__input ' type="email" placeholder='Email' name="email" required />
                                    </fieldset>
                                    <fieldset className='fieldset'>
                                        <label className='capitalize' >
                                            Password
                                        </label>
                                        <input type="password" placeholder='Password' name="password" className='text__input' required />
                                    </fieldset>
                                    <fieldset className='fieldset' >
                                        <label className='capitalize' >
                                            Confirm Password
                                        </label>
                                        <input type="password" placeholder='Confirm Password' className='text__input' name="confirmPassword" required />
                                    </fieldset>
                                    <fieldset className='fieldset pt-5'>
                                        <button type='submit' className='primary ' >
                                            {
                                                loading ? "Loading..." : "Sign Up"
                                            }
                                        </button>
                                    </fieldset>
                                </form>
                            ) : (
                                <form onSubmit={handleSignIn} className="w-full grid grid-cols-1 gap-2" >
                                    <fieldset className="fieldset" >
                                        <label className='capitalize'  >
                                            Email
                                        </label>
                                        <input className='text__input ' type="email" placeholder='Email' name="email" required />
                                    </fieldset>
                                    <fieldset className='fieldset'>
                                        <label className='capitalize' >
                                            Password
                                        </label>
                                        <input type="password" placeholder='Password' name="password" className='text__input' required />
                                    </fieldset>
                                    <fieldset className='fieldset pt-5'>
                                        <button type='submit' className='primary ' >
                                            {
                                                loading ? "Loading..." : "Sign In"
                                            }
                                        </button>
                                    </fieldset>
                                </form>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation