/*
 * @Author: saber
 * @Date: 2021-12-27 18:10:48
 * @LastEditTime: 2021-12-27 18:10:48
 * @LastEditors: saber
 * @Description:
 */
import ProxyAgent from 'proxy-agent'

const defaultProxy =
  process.env.https_proxy || process.env.http_proxy || undefined

export const buildAgent = (proxy = defaultProxy) =>
  proxy ? new ProxyAgent(proxy) : undefined

export const buildFetchOptions = (
  options: { proxy?: string } = {}
) => {
  const agent = buildAgent(options.proxy)
  return agent ? { agent } : undefined
}

export default buildFetchOptions
