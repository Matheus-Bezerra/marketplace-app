import { ProductInterface } from '../../../../shared/interfaces/product'

interface UseProductCardViewModelParams {
  product: ProductInterface
}

export const useProductCardViewModel = ({
  product,
}: UseProductCardViewModelParams) => {
  const formatProductName = (name: string) => {
    return name.length >= 17 ? `${name.slice(0, 17)}...` : name
  }

  const formatRating = product.averageRating.toFixed(2).replace('.', ',')

  const displayName = formatProductName(product.name)

  return { product, displayName, formatRating }
}