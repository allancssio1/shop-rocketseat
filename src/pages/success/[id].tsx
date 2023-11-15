import Link from 'next/link'
import { SuccessContainer, ImageContainer } from '../../styles/pages/success'

interface SuccessPros {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  priceId: string
}

export default function Success(props: SuccessPros) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada</h1>
      <ImageContainer></ImageContainer>
      <p>
        Uhuul <strong>Diego Fernandes</strong>, sua{' '}
        <strong>Camiseta Beyond the Limits</strong> já está a caminho da sua
        casa.
      </p>

      <Link href={'/'}>Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true,
//   }
// }
//<any -> first tipe is return on function>
//<{id: string} -> second tipe is params into props to function>
// export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
//   params,
// }) => {
//   const productId = params.id

//   const product = await stripe.products.retrieve(productId, {
//     expand: ['default_price'],
//   })

//   const price = product.default_price as Stripe.Price

//   return {
//     props: {
//       ...product,
//       imageUrl: product.images[0],
//       priceId: price.id,
//       price: new Intl.NumberFormat('pt-BR', {
//         style: 'currency',
//         currency: 'BRL',
//       }).format(price.unit_amount / 100),
//     },
//     revalidate: 60 * 60 * 1, // 1 hour,
//   }
// }
