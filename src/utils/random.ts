import variable from '../constant/variable'
import { _clearAddressCaches } from '../random'

// 解析内容
export const runCmd = (content: string) => {
  if (!content) return ''
  let tempCaches: { [key: string]: string } = {}
  // 添加防贪婪，用于解决模板是JSON字符串的问题
  const replaceReg = /\$\{(.(?!\${))*?\}/gim
  const parseContent = content.replace(replaceReg, (match, p1, offset, string) => {
    // ${域名}
    // ${身份证号()}
    // ${文本()}
    // ${文本(10)}
    // ${文本(10,20)}
    // ${正则(/[a-zA-Z0-9]{6,12}/)}
    // ${日期(YYYY-MM-DD HH:mm:ss)} 
    // ${日期(YYYY-MM-DDHH:mm:ss)}
    if (tempCaches[match]) {
      // 如果在一个内容中出现相同的变量，则始终返回相同内容
      return tempCaches[match]
    }
    // 解析方法名
    const fun = match.replace(/\(.*?\)/, '')
    // 解析出来参数
    const macthArguments = match.match(/\((.*?)\)/)?.[1] || ''
    let _arguments = fun === '${正则}' ? [macthArguments] : macthArguments.split(',')
    if (variable[fun]) {
      const result = variable?.[fun]?.function(..._arguments.filter((i) => i))
      // 缓存结果便于后续使用
      tempCaches[match] = result
      return result
    }
    // 如果该函数没有匹配到任何结果，返回当前匹配到的字符串
    return match
  })
  _clearAddressCaches()
  return parseContent.trim()
}
