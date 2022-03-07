import request from '@/utils/request'
import { IChargeStationData } from './types'

export const defaultChargeStationData: IChargeStationData = {
  title: '',
  id: 0,
  serial: '',
  operator: '',
  provider: '',
  currency: '',
  location: '',
  lastUpdated: '',
  action: ['edit', 'delete'],
  status: true,
  pageviews: 200,
  latitude: '',
  longitude: '',
  currencyCode: '',
  currencyName: '',
  charge_box_serial_number: '',
  ocpp_hash_code: '',
  ocpp_status: '',
  info: '{}',
  is_private: true,
  device_status: '',
  diagnostics_status: '',
  firmware_status: '',
  meta: {
    access_hours: '',
    tariffs_start: 0,
    tariffs_minute: 0,
    kilowatt: 0,
    power_min: null,
    power_max: null,
    is_solar_energy: true,
    autocharge_enable: true,
    currency: 0,
    twentyfourseven: true
  },
  location_id: '',
  operator_id: '',
  timestamp: 1644240850

}

export const getChargeStations = (params: any) =>
  request({
    url: '/chargestations',
    method: 'get',
    params
  })

export const getChargeStation = (id: number, params: any) =>
  request({
    url: `/chargestations/${id}`,
    method: 'get',
    params
  })

export const createChargeStation = (data: any) =>
  request({
    url: '/chargestations',
    method: 'post',
    data
  })

export const updateChargeStation = (id: number, data: any) =>
  request({
    url: `/chargestations/${id}`,
    method: 'put',
    data
  })

export const deleteChargeStation = (id: number) =>
  request({
    url: `/chargestations/${id}`,
    method: 'delete'
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
