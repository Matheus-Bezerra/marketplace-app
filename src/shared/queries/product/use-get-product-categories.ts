import { getProductsCategories } from "@/shared/services/product.service"
import { useQuery } from "@tanstack/react-query"
import { ProductCategoryInterface } from "../../interfaces/http/product-category"

export const useGetProductCategoriesQuery = () => {
  const query = useQuery<ProductCategoryInterface[]>({
    queryKey: ['products-categories'],
    queryFn: () => getProductsCategories(),
    staleTime: 1000 * 60 * 60
  })

  return query
}