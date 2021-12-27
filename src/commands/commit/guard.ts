/*
 * @Author: saber
 * @Date: 2021-12-27 19:10:45
 * @LastEditTime: 2021-12-27 19:10:45
 * @LastEditors: saber
 * @Description:
 */
import chalk from 'chalk'

const errors = {
  scope: chalk.red('Enter a valid scope'),
  title: chalk.red('Enter a valid commit title'),
  message: chalk.red('Enter a valid commit message')
}

const title = (title: string) =>
  !title || title.includes('`') ? errors.title : true

const message = (message: string) =>
  message.includes('`') ? errors.message : true

const scope = (scope: string) => (scope.includes('`') ? errors.scope : true)

export default {
  message,
  scope,
  title
}
