import { marketPlaceApiClient } from '../api/market-place'
import { ProductResponse } from '../interfaces/http/product-response'
import { ProductRequest } from '../interfaces/http/product'

export const getProducts = async ({ pagination, filters, sort }: ProductRequest) => {
  const { data } = await marketPlaceApiClient.post<ProductResponse>(
    '/products',
    {
      pagination,
      filters,
      sort,
    },
  )

  return data
}