import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { baseURL } from '../api/market-place'

const resolveLocalhost = (url: string) =>
  Platform.select({
    android: url.replace('localhost', '10.0.2.2'),
    ios: url,
    default: url,
  }) ?? url

export const buildImageUrl = (originalUrl?: string | null): string => {
  if (!originalUrl?.trim()) return ''

  const trimmed = originalUrl.trim()

  const url =
    trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `${baseURL}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`

  if (Constants.expoConfig?.extra?.isProduction) {
    return url
  }

  return resolveLocalhost(url)
}
