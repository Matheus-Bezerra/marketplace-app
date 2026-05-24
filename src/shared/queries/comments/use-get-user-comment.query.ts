import { useQuery } from '@tanstack/react-query'
import { getUserComment } from '../../services/product.service'

export const useGetUserCommentQuery = (productId: number) => {
  const query = useQuery({
    queryFn: async () => {
      try {
        return await getUserComment(productId)
      } catch {
        return null
      }
    },
    queryKey: ['user-comment', productId],
    staleTime: 1000 * 60 * 5,
  })
  return query
}