import cookies from 'js-cookie'

export const getUserCookie = () => {
    const cookie = cookies.get('auth')
    if(!cookie) return
    return JSON.parse(cookie)
}

export const setUserCookie = (user) => {
    cookies.set('auth', JSON.stringify(user), {
        expires: 1/24,
    })
    console.log('came here')
}

export const removeUserCookie = () => cookies.remove('auth')