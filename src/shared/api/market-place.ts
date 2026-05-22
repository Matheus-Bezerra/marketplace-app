import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { Platform } from 'react-native'
import { useUserStore } from '../store/user-store'

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const getBaseURL = () => {
  return Platform.select({
    ios: 'http://localhost:3001',
    android: 'http://10.0.2.2:3001',
  })
}

export const baseURL = getBaseURL()

export class MarketPlaceApiClient {
  private instance: AxiosInstance
  private isRefreshing = false

  constructor() {
    this.instance = axios.create({
      baseURL,
    })

    this.setupInterceptors()
  }

  getInstance() {
    return this.instance
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const userData = await AsyncStorage.getItem('marketplace-auth')
        if (userData) {
          const {
            state: { token },
          } = JSON.parse(userData)

          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as RetryableRequest | undefined

        if (
          originalRequest &&
          error.response?.status === 401 &&
          error.response?.data?.message === 'Token expirado' &&
          !originalRequest._retry &&
          !this.isRefreshing
        ) {
          originalRequest._retry = true
          this.isRefreshing = true

          try {
            const userData = await AsyncStorage.getItem('marketplace-auth')

            if (!userData) {
              throw new Error('Usuário não autenticado')
            }

            const {
              state: { refreshToken },
            } = JSON.parse(userData)

            if (!refreshToken) {
              throw new Error('Refresh token não encontrado')
            }

            const { data: response } = await this.instance.post(
              '/auth/refresh',
              {
                refreshToken,
              },
            )

            const { updateTokens } = useUserStore.getState()
            updateTokens({
              token: response.token,
              refreshToken: response.refreshToken,
            })

            originalRequest.headers.Authorization = `Bearer ${response.token}`

            return this.instance(originalRequest)
          } catch {
            this.handleUnauthorized()
            return Promise.reject(
              new Error('Sessão expirada, faça o login novamente.'),
            )
          } finally {
            this.isRefreshing = false
          }
        }

        if (error.response && error.response.data) {
          return Promise.reject(new Error(error.response.data.message))
        } else {
          return Promise.reject(new Error('Falha na requisição'))
        }
      },
    )
  }

  private async handleUnauthorized() {
    const { logout } = useUserStore.getState()

    delete this.instance.defaults.headers.common.Authorization
    logout()
  }
}

export const marketPlaceApiClient = new MarketPlaceApiClient().getInstance()