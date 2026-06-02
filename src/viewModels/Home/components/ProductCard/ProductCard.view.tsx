import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../../styles/colors'
import { useProductCardViewModel } from './useProductCard.viewModel'
import { AppPriceText } from '@/shared/components/AppPriceText'
import { router } from 'expo-router'
import { buildImageUrl } from '@/shared/helpers/buildImageUrl'

export const ProductCardView: FC<
  ReturnType<typeof useProductCardViewModel>
> = ({ product, displayName, formatRating }) => {
  const photoUrl = buildImageUrl(product.photo)

  return (
    <TouchableOpacity className="w-[48%] my-1 rounded-xl shadow-sm overflow-hidden h-[157px] p-[4px] bg-white mb-2" onPress={() => router.push(`/product/${product.id}`)}>
      <View>
        {photoUrl ? (
          <Image
            source={{ uri: photoUrl }}
            className="w-full h-[96px] rounded-md"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-[96px] rounded-md bg-gray-200 items-center justify-center">
            <Ionicons name="image-outline" size={32} color={colors.gray[400]} />
          </View>
        )}
        <View className="absolute top-0 right-0 flex-row items-center px-2 py-1 rounded-b-lg rounded-r-none bg-white">
          <Ionicons name="star" size={12} color={colors['blue-base']} />
          <Text className="text-sm font-semibold ml-1">
            {formatRating}
          </Text>
        </View>
      </View>
      <View className="p-3">
        <Text className="text-xs font-semibold mb-1" numberOfLines={1}>
          {displayName}
        </Text>
        <View className="flex-row items-center justify-between">
          <AppPriceText value={Number(product.value)} />
        </View>
      </View>
    </TouchableOpacity>
  )
}