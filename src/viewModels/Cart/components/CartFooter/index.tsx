import { FC } from 'react'
import { CartFooterView } from './CartFooter.view'
import { useCartFooterViewModel } from './useCartFooter.viewModel'
import { CreditCard } from '../../../../shared/interfaces/credit-card'

export interface CartFooterParams {
  openCartBottomSheet: () => void
  creditCards: CreditCard[]
  isLoadingCreditCards: boolean
}

export const CartFooter: FC<CartFooterParams> = ({
  openCartBottomSheet,
  creditCards,
  isLoadingCreditCards,
}) => {
  const viewModel = useCartFooterViewModel()

  return (
    <CartFooterView
      {...viewModel}
      openCartBottomSheet={openCartBottomSheet}
      creditCards={creditCards}
      isLoadingCreditCards={isLoadingCreditCards}
    />
  )
}