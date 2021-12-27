/*
 * @Author: saber
 * @Date: 2021-12-27 17:57:46
 * @LastEditTime: 2021-12-27 19:47:30
 * @LastEditors: saber
 * @Description:
 */
import inquirer from 'inquirer';
import getEmojis from '../../utils/getEmojis';
import prompts from './prompts';
import COMMIT_MODES from '../../constants/commit';
import withClient from './withClient';

export interface CommitOptions {
  message?: string;
  mode: typeof COMMIT_MODES.CLIENT | typeof COMMIT_MODES.HOOK;
  scope?: string;
  title?: string;
}

const promptAndCommit = (options: CommitOptions) =>
  getEmojis()
    .then((gitmojis) => prompts(gitmojis, options))
    .then((questions) => {
      console.log('questions', questions)
      inquirer.prompt(questions).then((answers) => {
        // if (options.mode === COMMIT_MODES.HOOK) return withHook(answers);

        return withClient(answers);
      });
    });

const commit = (options: CommitOptions) => {
  console.log('options:', options);
  // // options.mode = 'hook';
  // if (options.mode === COMMIT_MODES.HOOK) {
  //   registerHookInterruptionHandler()
  //   return cancelIfNeeded().then(() => promptAndCommit(options))
  // }

  return promptAndCommit(options);
};

export default commit
