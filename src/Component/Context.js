import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/init'
import { getUserCookie, removeUserCookie, setUserCookie } from '../firebase/setUserCookie'
import { getDownloadURL, ref, uploadBytesResumable, listAll } from 'firebase/storage'


export const AuthContext = createContext()
function Context({ children }) {

    const [user, setUser] = useState(null)
    const [progress, setProgress] = useState(0)
    const [files, setFiles] = useState(null)



    const logIn = (email, password, cd) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                setUserCookie(userCredential.user)
                cd()
                alert("You are signed in")
            })
            .catch((error) => {
                alert(error.code)
                cd(error)
            })
    }

    const signUp = (email, password, cd) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                setUserCookie(userCredential.user)
                cd()
                alert("You are authenticated !")
            })
            .catch((error) => {
                alert(error.code)
                cd(error)
            })
    }

    const logOut = () => {
        signOut(auth).then(() => {
            setUser(null)
            removeUserCookie()
        }).catch((error) => (
            alert(error.message)
        ))
    }

    const uploadFiles = (file) => {
        if (!file) {
            alert("Select a file")
            return
        }
        const storageRef = ref(db, `/${user?.uid}/${file?.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(prog)
            },
            (err) => {
                alert(err.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => console.log(url))
            })
        alert("upoad was succesful")
    }

    const getFiles = () => {
        const listRef = ref(db, `${user?.uid}`)

        listAll(listRef)
            .then((res) => {
                console.log(res.items)
                setFiles(res.items)
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const downloadFile = (fileName) => {
        const pathRef = ref(db, fileName)
        getDownloadURL(pathRef)
            .then((url) => {
                const xhr = new XMLHttpRequest()
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    console.log(xhr.response)
                }
                xhr.open('GET', url)
                xhr.send()
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    useEffect(() => {
        const cookie = getUserCookie()
        if (cookie) {
            setUser(cookie)
        }

    }, [])

    console.log(user)

    return (
        <AuthContext.Provider value={{ logIn, signUp, user, logOut, uploadFiles, progress, downloadFile, getFiles , files}} >
            {children}
        </AuthContext.Provider>
    )
}

export default Context