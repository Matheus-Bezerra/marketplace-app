import { getProductDetails } from "@/shared/services/product.service"
import { useQuery } from "@tanstack/react-query"
import { GetProductDetailsInterface } from "../../interfaces/http/product-detail"

export const useGetProductDetailQuery = (id: number) => {
  const query = useQuery<GetProductDetailsInterface>({
    queryKey: ['product-detail', id],
    queryFn: async () => getProductDetails(id),
  })

  return query
}