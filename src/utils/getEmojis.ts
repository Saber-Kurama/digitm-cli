/*
 * @Author: saber
 * @Date: 2021-12-27 18:02:18
 * @LastEditTime: 2021-12-30 11:56:37
 * @LastEditors: saber
 * @Description:
 */

import chalk from 'chalk'
// @ts-ignore
import fetch from 'node-fetch';
import ora from 'ora';

import cache from './emojisCache'
import buildFetchOptions from './buildFetchOptions'
// import configurationVault from './configurationVault'

const getGitmojisUrl = 'http://image.parligerly.com/digitm.json';

const getEmojis = async (
  skipCache: boolean = false
): Promise<Array<Object>> => {
  const emojisFromCache = cache.getEmojis()
  if (cache.isAvailable() && !skipCache) return emojisFromCache

  const spinner = ora('获取 git commit emojis').start()

  try {
    const response = await fetch(
      // configurationVault.getGitmojisUrl(),
      // buildFetchOptions()
      getGitmojisUrl,
      {}
    )
    const data = await response.json();
    const emojis: any = data.data

    cache.createEmojis(emojis)

    if (emojis.length === emojisFromCache.length) {
      spinner.info('git commit emojis 已经是最新的了')

      return []
    }

    spinner.succeed('git commit emojis下载成功, 这些是新表情:')
    return emojis.filter((emoji: any) => !emojisFromCache.includes(emoji))
  } catch (error) {
    spinner.fail(`Error: ${error}`)

    return []
  }
}

export default getEmojis
