import { useLocalSearchParams } from "expo-router";
import { useProductViewModel } from "@/viewModels/Product/useProduct.viewModel";
import { ProductView } from "../../../viewModels/Product/Product.view";

export default function Product() {
  const { id, openFeedbackBottomSheet } = useLocalSearchParams<{id: string, openFeedbackBottomSheet?: string}>()
  const viewModel = useProductViewModel(Number(id), Boolean(openFeedbackBottomSheet))

  return <ProductView {...viewModel} />
}