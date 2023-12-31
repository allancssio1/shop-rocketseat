import Link from 'next/link'
import { SuccessContainer, ImageContainer } from '../../styles/pages/success'
import { GetServerSideProps } from 'next'
import { stripe } from '../../lib/stripe'
import Image from 'next/image'
import Stripe from 'stripe'
import Head from 'next/head'

interface SuccessPros {
  productName: string
  imageUrl: string
  userName: string
}

export default function Success({
  imageUrl,
  productName,
  userName,
}: SuccessPros) {
  return (
    <>
      <Head>
        <title>Compra efetuada</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>
        <ImageContainer>
          <Image src={imageUrl} width={120} height={110} alt="" />
        </ImageContainer>
        <p>
          Uhuul <strong>{userName}</strong>, sua <strong>{productName}</strong>{' '}
          já está a caminho da sua casa.
        </p>

        <Link href={'/'}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id

  if (!sessionId)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  const response = await stripe.checkout.sessions.retrieve(String(sessionId), {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const product = response.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      userName: response.customer_details.name,
      productName: product.name,
      imageUrl: product.images[0],
    },
  }
}
