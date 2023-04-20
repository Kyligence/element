import fs from 'fs';

import { formatLessVarToJs } from './utils.js';

const palette = formatLessVarToJs('../../../packages/theme-chalk/src/common/basic/palette.less');
const color = formatLessVarToJs('../../../packages/theme-chalk/src/common/basic/color.less');

fs.writeFileSync('./paletteLess.json', JSON.stringify([...color, ...palette]));
