import { random } from 'lodash'

// 手机号前缀来源：https://baike.baidu.com/item/%E7%94%B5%E8%AF%9D%E5%8F%B7%E7%A0%81/1417271
const phonePrefixs = [
  '134',
  '135',
  '136',
  '137',
  '138',
  '139',
  '147',
  '150',
  '151',
  '152',
  '157',
  '158',
  '159',
  '172',
  '178',
  '182',
  '183',
  '184',
  '187',
  '188',
  '195',
  '197',
  '198',
  '130',
  '131',
  '132',
  '145',
  '155',
  '156',
  '166',
  '175',
  '176',
  '185',
  '186',
  '196',
  '133',
  '149',
  '153',
  '180',
  '181',
  '189',
  '173',
  '177',
  '190',
  '191',
  '193',
  '199',
]

const phone = () => {
  return phonePrefixs[random(phonePrefixs.length - 1)] + String(random(10000000, 99999999))
}

export default { phone }
