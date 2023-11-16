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
import axios from 'axios'
import { useState } from 'react'
import Head from 'next/head'

interface ProduceProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  priceId: string
}

export default function Product({
  imageUrl,
  name,
  price,
  description,
  priceId,
}: ProduceProps) {
  const [isPaymentSendding, setIsPaymentSendding] = useState<boolean>(false)

  async function handleBuyProduct() {
    try {
      setIsPaymentSendding(true)
      const response = await axios.post('/api/checkout', {
        priceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
      setIsPaymentSendding(false)
    } catch (err) {
      alert('error')
    }
  }

  return (
    <>
      <Head>
        <title>{name} | Detalhes</title>
      </Head>
      <ProductContainer>
        <ImageContiner>
          <Image src={imageUrl} alt="" width={520} height={480} />
        </ImageContiner>
        <ProductDetails>
          <h1>{name}</h1>
          <span>{price}</span>

          <p>{description}</p>

          <button disabled={isPaymentSendding} onClick={handleBuyProduct}>
            comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
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
      imageUrl: product.images[0],
      priceId: price.id,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    },
    revalidate: 60 * 60 * 1, // 1 hour,
  }
}
