import { HomeContainer, Product } from '../styles/pages/home'
import camiseta1 from '../assets/1.png'
import camiseta2 from '../assets/2.png'
import Image from 'next/image'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camiseta1} alt="camiseta1" width={480} height={440} />
        <footer>
          <strong>Camiseta</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camiseta2} alt="camiseta2" width={520} height={480} />
        <footer>
          <strong>Camiseta</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
