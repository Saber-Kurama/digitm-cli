/*
 * @Author: saber
 * @Date: 2021-12-27 19:00:31
 * @LastEditTime: 2021-12-30 14:52:46
 * @LastEditors: saber
 * @Description:
 */
import inquirer from 'inquirer'
import guard from './guard';

const TITLE_MAX_LENGTH_COUNT: number = 48;
// @ts-ignore
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

export default (gitmojis, options): Array<Object> => {
  // const { title, message, scope } = getDefaultCommitContent(options)
  const { title, message } = { title: null, message: null }
  return [
    {
      name: 'gitmoji',
      message: '选择表情:',
      type: 'autocomplete',
      source: (answersSoFor: any, input: string) => {
        return Promise.resolve(
           gitmojis.map((gitmoji) => ({
            name: `${gitmoji.emoji}  - ${gitmoji.description}`,
            // value: gitmoji[configurationVault.getEmojiFormat()]
            value: `${gitmoji[`emoji`]} ${gitmoji[`commit-type`]}: `
          }))
        )
      }
    },
    // ...(configurationVault.getScopePrompt()
    //   ? [
    //       {
    //         name: 'scope',
    //         message: 'Enter the scope of current changes:',
    //         validate: guard.scope,
    //         ...(scope ? { default: scope } : {})
    //       }
    //     ]
    //   : []),
    {
      name: 'title',
      message: 'Enter the commit title',
      validate: guard.title,
      transformer: (input: string) => {
        return `[${
          (title || input).length
        }/${TITLE_MAX_LENGTH_COUNT}]: ${input}`
      },
      ...(title ? { default: title } : {})
    },
    {
      name: 'message',
      message: 'Enter the commit message:',
      validate: guard.message,
      ...(message ? { default: message } : {})
    }
  ]
}
