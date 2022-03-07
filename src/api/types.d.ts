import { number } from "echarts"

export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}


export interface IChargeStationData {
  title: string
  id: number
  serial: string
  operator: string
  provider: string
  status: boolean
  currency: string
  location: string
  is_private: boolean
  lastUpdated: string
  action: string[]
  timestamp: number
  pageviews: number
  latitude: string
  longitude: string
  currencyCode: string
  currencyName: string
  charge_box_serial_number: string
  ocpp_hash_code: string
  ocpp_status: string
  info: string
  device_status: string
  diagnostics_status: string
  firmware_status: string
  meta: {
    access_hours: string
    tariffs_start: number
    tariffs_minute: number
    kilowatt: number
    power_min: number
    power_max: number
    is_solar_energy: boolean
    autocharge_enable: boolean
    currency: number
    twentyfourseven: boolean
  },
  location_id: string
  operator_id: string
}
