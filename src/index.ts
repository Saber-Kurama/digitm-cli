/*
 * @Author: saber
 * @Date: 2021-12-27 15:39:25
 * @LastEditTime: 2021-12-27 20:08:59
 * @LastEditors: saber
 * @Description:
 */
import path from 'path';
import fs from 'fs-extra';
import { Command } from 'commander';
import commands from './commands'

const program = new Command();
const packageContent = fs.readFileSync(
  path.resolve(__dirname, '../package.json'),
  'utf8'
);
const packageData: any = JSON.parse(packageContent);
// TODO: 如何集成 gitmoji-cli 呢 后面需要思考一下，针对一些工具的二次开发或者说封装
program
  .version(packageData.version)
  .name('digitm')
  .usage('[options]')
  .description('测试')
  .option('-c, --commit', '提交commit')
  .option('-i, --init', '初始化')
  .action(({commit}) => {
    if(commit){
      // 提交
      commands.commit({ mode: 'client'})
    }
  });

program.parse(process.argv);
// 为啥
export default () => {}
