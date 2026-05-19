import axios, { AxiosInstance } from 'axios'
import { Platform } from 'react-native'

const getBaseURL = () => {
  return Platform.OS === 'ios' ? 'http://localhost:3001' : 'http://10.0.2.2:3001'
}

export class MarketPlaceApiClient {
  private instance: AxiosInstance
  private isRefreshing = false

  constructor() {
    this.instance = axios.create({
      baseURL: getBaseURL(),
    })
  }

  getInstance() {
    return this.instance
  }
}

export const marketPlaceApiClient = new MarketPlaceApiClient().getInstance()