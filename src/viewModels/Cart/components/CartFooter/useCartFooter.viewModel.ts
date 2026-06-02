import { router } from 'expo-router'
import { useState } from 'react'
import { CreditCard } from '../../../../shared/interfaces/credit-card'
import { useSubmitOrderMutation } from '../../../../shared/queries/orders/use-submit-order.mutation'
import { useCartStore } from '../../../../shared/store/cart-store'
import { useAppModal } from '../../../../shared/hooks/useAppModal'
import { localNotificationsService } from '@/shared/services/local-notifications.service'

export const useCartFooterViewModel = () => {
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<null | CreditCard>(null)
  const { products, total, clearCart } = useCartStore()
  const { showSuccess } = useAppModal()

  const createOrderMutation = useSubmitOrderMutation()

  const submitOrderMutation = async () => {
    if (!selectedCreditCard) return

    await createOrderMutation.mutateAsync({
      creditCardId: selectedCreditCard.id,
      items: products.map(({ id, quantity }) => ({ productId: id, quantity })),
    })

    products.forEach((product, index) => {
      localNotificationsService.scheduleFeedbackNotification({
        productName: product.name,
        productId: product.id,
        delayInMinutes: 5 * (index + 1),
      })
    })

    clearCart()
    router.replace('/(private)/(tabs)/orders')

    showSuccess({
      title: 'Pedido realizado com sucesso',
      message: 'Seu pedido foi realizado com sucesso',
      buttonText: 'Ok',
      onButtonPress: () => {},
    })
  }

  return {
    total,
    selectedCreditCard,
    setSelectedCreditCard,
    submitOrderMutation,
    isLoadingOrder: createOrderMutation.isPending,
  }
}