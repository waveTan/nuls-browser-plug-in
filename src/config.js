/**
 * @disc: 测试网 配置文件
 * @date: 2019-10-10 13:58
 * @author: Wave
 */
"use strict";
//开发模式
export const IS_DEV = process.env.NODE_ENV === 'production';
//链信息
export const CHAIN_INFO = IS_DEV ? {chainId: 1, assetsId: 1, prefix: 'NULS'} : {
  chainId: 2,
  assetsId: 1,
  prefix: 'tNULS'
};
//正式、测试网络的api
export let API_URL = IS_DEV ? 'https://public1.nuls.io' : 'https://beta.wallet.nuls.io/api';
//请求最迟时间
export const API_TIME = IS_DEV ? '9000' : '6000';
//浏览器连接地址
export const EXPLORER_URL = IS_DEV ? 'https://www.nulscan.io/' : 'http://beta.nulscan.io/';
