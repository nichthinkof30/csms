import faker from 'faker'
import { Response, Request } from 'express'
import { IChargeStationData } from '../src/api/types'

const chargestationList: IChargeStationData[] = []
const chargestationCount = 100
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

for (let i = 0; i < chargestationCount; i++) {

  const arr = ['OCPP1.6','OCPP2.0.1','OSCP2.0','OSCP1.0','NON-OCPP']
  let serialChars = ''
  for (let i = 0; i < 2; i++) {
    serialChars += faker.random.alpha().toUpperCase()
  }

  let serialChars2 = ''
  for (let i = 0; i < 2; i++) {
    serialChars2 += faker.random.alpha().toUpperCase()
  }

  let serialNo = '0'
  let serialNo2 = '0'
  serialNo +=  faker.datatype.number( {'min': 10000,'max': 90000}).toString()
  serialNo2 +=  faker.datatype.number( {'min': 10000,'max': 90000}).toString()

  let serial = serialChars + serialNo
  let serialBoxNo = serialChars2 + serialNo2

  chargestationList.push({
    title: 'title_dummy',
    id: i + 1,
    serial:  serial,
    operator: faker.company.companyName().toUpperCase(),
    provider: faker.random.arrayElement(arr),
    status: faker.datatype.boolean(),
    location: faker.address.streetAddress() + ', ' + faker.address.county() + ', ' + faker.address.zipCode() + ', ' + faker.address.city(),
    lastUpdated: faker.datatype.datetime().toLocaleString('en-GB', { hour12: false }),
    action: ['edit', 'delete'],
    timestamp: faker.date.past().getMilliseconds(),
    pageviews: faker.datatype.number({ min: 300, max: 500 }),
    latitude: faker.address.latitude().toString(),
    longitude: faker.address.longitude().toString(),
    currency: faker.finance.currencyCode() + ' - ' + faker.finance.currencyName(),
    currencyCode: faker.finance.currencyCode(),
    currencyName: faker.finance.currencyName(),
    charge_box_serial_number: serialBoxNo,
    ocpp_hash_code: 'ocpp_hash_code',
    ocpp_status: faker.datatype.boolean() ?  'Available' : 'Unavailable',
    info: '{}',
    is_private: faker.datatype.boolean(),
    device_status: 'device_status',
    diagnostics_status: 'diagnostics_status',
    firmware_status: faker.datatype.boolean() ?  'Status Ok' : 'Status Not Ok',
    meta: {
      access_hours: 'string',
      tariffs_start: 0,
      tariffs_minute: 1,
      kilowatt: 2,
      power_min: 3,
      power_max: 4,
      is_solar_energy: faker.datatype.boolean(),
      autocharge_enable: faker.datatype.boolean(),
      currency: 5,
      twentyfourseven: faker.datatype.boolean(),
    },
    location_id: faker.random.alphaNumeric(2).toUpperCase(),
    operator_id: 'string'
  })
}

export const getChargeStations = (req: Request, res: Response) => {
  const { importance, type, title, page = 1, limit = 20, sort } = req.query

  let mockList = chargestationList.filter(item => {
    //  if (importance && item.importance !== +importance) return false
    //  if (type && item.type !== type) return false
    //  if (title && item.title.indexOf(title as string) < 0) return false
    return true
  })

  if (sort === '-id') {
    mockList = mockList.reverse()
  }

  const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const getChargeStation = (req: Request, res: Response) => {
  const { id } = req.params
  for (const chargestation of chargestationList) {
    if (chargestation.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          chargestation
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'ChargeStation not found'
  })
}

export const createChargeStation = (req: Request, res: Response) => {
  const { chargestation } = req.body
  return res.json({
    code: 20000,
    data: {
      chargestation
    }
  })
}

export const updateChargeStation = (req: Request, res: Response) => {
  const { id } = req.params
  const { chargestation } = req.body
  for (const v of chargestationList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          chargestation
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'ChargeStation not found'
  })
}

export const deleteChargeStation = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const getPageviewsCS = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      pageviews: [
        { key: 'PC', pageviews: 1024 },
        { key: 'Mobile', pageviews: 1024 },
        { key: 'iOS', pageviews: 1024 },
        { key: 'Android', pageviews: 1024 }
      ]
    }
  })
}
