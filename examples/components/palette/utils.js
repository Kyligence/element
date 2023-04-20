import fs from 'fs';
import path from 'path';

export const formatLessVarToJs = (lessPath) => {
  let less = fs.readFileSync(lessPath, 'utf8');
  less = less.replace(/\s/g, '');
  less = less.split(';').filter((item) => item);
  let presetBox = {};
  const result = [];
  for (const item of less) {
    if (item.includes('@import')) {
      const reg = /"(.*?)"/;
      const suffix = item.match(reg)[1];
      const importPath = path.resolve(lessPath, '../', suffix);
      const importItem = formatLessVarToJs(importPath);
      presetBox = Object.fromEntries(importItem);
    } else {
      // eslint-disable-next-line prefer-const
      let [key, value] = item.split(':');
      if (value.startsWith('@')) {
        value = presetBox[value];
      }
      presetBox[key] = value;
      result.push([key, value]);
    }
  }
  return result;
};
