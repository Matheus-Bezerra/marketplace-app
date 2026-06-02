import { createElement } from 'react'
import { useBottomSheetStore } from '../../shared/store/bottomsheet-store'
import { useCartStore } from '../../shared/store/cart-store'
import { AddCardBottomSheet } from './components/AddCardBottomSheet'
import { useGetCreditCardsQuery } from '@/shared/queries/credit-cards/use-get-credit-cards'

export const useCartViewModel = () => {
  const { products } = useCartStore()

  const { open: openBottomSheet } = useBottomSheetStore()

  const { data: creditCards = [], isLoading: loadingCreditCards } = useGetCreditCardsQuery()

  const openCartBottomSheet = () => {
    openBottomSheet({ content: createElement(AddCardBottomSheet) })
  }

  return { products, openCartBottomSheet, creditCards, loadingCreditCards }
}