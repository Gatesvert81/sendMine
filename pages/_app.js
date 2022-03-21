import Context from '../src/Component/Context'
import Navigation from '../src/Component/Navigation'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <Navigation />
      <Component {...pageProps} />
    </Context>
  )
}

export default MyApp
