import { useRouter } from 'next/router'
import {
  ImageContiner,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import Image from 'next/image'

import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'

interface ProduceProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
}

export default function Product({
  imageUrl,
  name,
  price,
  description,
}: ProduceProps) {
  const { isFallback } = useRouter()

  if (isFallback) return <p>Loading...</p>

  return (
    <ProductContainer>
      <ImageContiner>
        <Image src={imageUrl} alt="" width={520} height={480} />
      </ImageContiner>
      <ProductDetails>
        <h1>{name}</h1>
        <span>{price}</span>

        <p>{description}</p>

        <button>comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}
//<any -> first tipe is return on function>
//<{id: string} -> second tipe is params into props to function>
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      ...product,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    },
    revalidate: 60 * 60 * 1, // 1 hour,
  }
}
