/*
 * @Author: saber
 * @Date: 2021-12-27 18:08:15
 * @LastEditTime: 2021-12-27 19:42:15
 * @LastEditors: saber
 * @Description:
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import pathExists from 'path-exists'

export const GITMOJI_CACHE = {
  FOLDER: '.digitm',
  FILE: 'digitm.json'
}

export const CACHE_PATH = path.join(
  os.homedir(),
  GITMOJI_CACHE.FOLDER,
  GITMOJI_CACHE.FILE
)

const createEmojis = (emojis: any) => {
  if (!pathExists.sync(path.dirname(CACHE_PATH))) {
    fs.mkdirSync(path.dirname(CACHE_PATH))
  }

  fs.writeFileSync(CACHE_PATH, JSON.stringify(emojis))
}

const getEmojis = () => {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH).toString())
  } catch (error) {
    return []
  }
}

const isAvailable = (): boolean => pathExists.sync(CACHE_PATH)

export default {
  createEmojis,
  getEmojis,
  isAvailable
}
