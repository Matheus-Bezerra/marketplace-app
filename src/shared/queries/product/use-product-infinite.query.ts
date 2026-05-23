import { useInfiniteQuery } from '@tanstack/react-query'
import { buildImageUrl } from '../../helpers/buildImageUrl'
import { getProducts } from '../../services/product.service'
import { FilterState } from '@/shared/store/use-filter-store'

export interface productsInfinityQueryParams {
  filters: FilterState
}

export const useProductInfiniteQuery = ({ filters }: productsInfinityQueryParams) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await getProducts({
          pagination: {
            page: pageParam,
            perPage: 10,
          },
          filters: {
            categoryIds: filters.selectedCategories ?? [],
            maxValue: filters.valueMax ?? undefined,
            minValue: filters.valueMin ?? undefined,
            searchText: filters.searchText ?? undefined,
          },
        })

        return response
      } catch (error) {
        throw error
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.totalPages) return undefined

      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
    },
    initialPageParam: 1,
    queryKey: ['products', filters],
    staleTime: 1000 * 60 * 1, // 1 minute stale time
  })

  const products =
    data?.pages
      .flatMap((page) => page.data)
      .map((product) => ({
        ...product,
        imageUrl: buildImageUrl(product.photo),
      })) ?? []

  return {
    products,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  }
}