/*
 * @Author: saber
 * @Date: 2021-12-27 19:47:58
 * @LastEditTime: 2021-12-27 19:50:40
 * @LastEditors: saber
 * @Description:
 */
import execa from 'execa'
// import fs from 'fs'
import chalk from 'chalk'

// import isHookCreated from '../../../utils/isHookCreated'
// import configurationVault from '../../../utils/configurationVault'

const withClient = async (answers) => {
  try {
    const scope = answers.scope ? `(${answers.scope}): ` : ''
    const title = `${answers.gitmoji} ${scope}${answers.title}`
    // const isSigned = configurationVault.getSignedCommit() ? ['-S'] : []
    const isSigned = ['-S'];

    // if (await isHookCreated()) {
    //   return console.log(
    //     chalk.red(
    //       "\nError: Seems that you're trying to commit with the cli " +
    //         'but you have the hook created.\nIf you want to use the `gitmoji -c` ' +
    //         'command you have to remove the hook with the command `gitmoji -r`. \n' +
    //         'The hook must be used only when you want to commit with the instruction `git commit`\n'
    //     )
    //   )
    // }

    // if (configurationVault.getAutoAdd()) await execa('git', ['add', '.'])

    await execa(
      'git',
      ['commit', ...isSigned, '-m', title, '-m', answers.message],
      {
        buffer: false,
        stdio: 'inherit'
      }
    )
  } catch (error: any) {
    console.error(
      chalk.red(
        '\n',
        'Oops! An error ocurred. There is likely additional logging output above.\n',
        'You can run the same commit with this command:\n'
      ),
      '\t',
      error.escapedCommand
    )
  }
}

export default withClient
