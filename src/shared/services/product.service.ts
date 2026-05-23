import { marketPlaceApiClient } from '../api/market-place'
import { ProductResponse } from '../interfaces/http/product-response'
import { ProductRequest } from '../interfaces/http/product'
import { ProductCategoryInterface } from '../interfaces/http/product-category'

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

export const getProductCategories = async () => {
  const { data } = await marketPlaceApiClient.get<ProductCategoryInterface[]>(
    '/products/categories',
  )

  return data
}