import { useRouter } from 'next/router'
import {
  ImageContiner,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import Image from 'next/image'

import camiseta from '../../assets/1.png'

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContiner>
        <img src={camiseta.src} alt="" />
      </ImageContiner>
      <ProductDetails>
        <h1>Camiseta</h1>
        <span>R$ 79,9</span>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem iusto
          nesciunt, reprehenderit laboriosam, officiis ab facere suscipit iste
          hic magni asperiores alias. Ea, quibusdam. Aliquam similique aperiam
          molestiae aut veniam.
        </p>

        <button>comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
