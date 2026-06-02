import { Text, View } from "react-native";
import { useOrdersViewModel } from "@/viewModels/Orders/useOrders.viewModel";
import { OrdersView } from "@/viewModels/Orders/Orders.view";

export default function Orders() {
  const viewModel = useOrdersViewModel()

  return (
    <OrdersView {...viewModel} />
  )
}