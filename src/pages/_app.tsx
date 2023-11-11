import { AppProps } from 'next/app'
import { globalStyles } from '../styles/globals'
import logoImg from '../assets/logo.svg'
import Image from 'next/image'
import { Container, Header } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        {/* <Image src={logoImg} alt="logo" /> */}
        <img src={logoImg.src} alt="logo" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
