import React,{ useEffect, useState} from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { auth } from './init'

const FirebaseAuthConfig = {
    signInFlow: 'popup',
    signInOption: [
        auth.Go
    ]
}

function FirebaseAuth() {
  return (
    <div>

    </div>
  )
}

export default FirebaseAuth