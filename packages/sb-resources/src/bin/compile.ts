import * as fs from 'fs';
import * as path from 'path';

import * as fetch from 'isomorphic-fetch';
import * as inquirer from 'inquirer';
import {load as loadFont} from 'opentype.js';

function exists(path: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
}

const FONT_SIZE = 20;

async function run() {
  const {apiKey} = await inquirer.prompt([
    {type: 'input', name: 'apiKey', message: 'Google Fonts API Key?'},
  ]);

  const request = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?fields=items(category%2Cfamily%2Cfiles)&key=${encodeURIComponent(
      apiKey,
    )}`,
  );
  const response: {
    error: any;
    items: Array<{
      family: string;
      category: string;
      files: {[weight: string]: string};
    }>;
  } = await request.json();

  if (!response.items) {
    throw new Error(response.error);
  }

  const fontPreviewStream = fs.createWriteStream(
    'src/fontPreviews/familyPaths.json',
  );
  fontPreviewStream.write('{\n');

  const filteredItems = response.items
    .filter(x => !x.family.includes('Barcode'))
    .filter(x => Boolean(x.files.regular))
    .reduce((acc, cur) => {
      if (!acc.some(x => cur.family.startsWith(x.family))) {
        acc.push(cur);
      }
      return acc;
    }, []);

  const fontRequests = await Promise.all(
    filteredItems.map(async ({family, files}) => {
      const pathname = `/tmp/${encodeURIComponent(family)}.ttf`;
      let buff;
      if (await exists(pathname)) {
        console.log(`Loading ${family}`);
        buff = await new Promise((resolve, reject) => {
          fs.readFile(pathname, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      } else {
        console.log(`Fetching ${family}`);
        const response = await fetch(files.regular);
        if (response.status !== 200) {
          throw new Error(`Bad status code ${response.status} for ${family}`);
        }
        buff = await response.buffer();
        await new Promise((resolve, reject) => {
          fs.writeFile(`/tmp/${encodeURIComponent(family)}.ttf`, buff, err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
        console.log(`Fetched ${family}`);
      }

      let font = await new Promise<{
        getPath(
          text: string,
          x: number,
          y: number,
          size: number,
        ): {toSVG(decimals: number): string};
      }>((resolve, reject) => {
        loadFont(`/tmp/${encodeURIComponent(family)}.ttf`, (err, font) => {
          if (err) {
            reject(err);
          } else {
            console.log(`Decoded ${family}`);
            resolve(font);
          }
        });
      });
      let fontPath;
      try {
        fontPath = font.getPath(family.substr(0, 15), 0, 0, FONT_SIZE);
      } catch (e) {
        console.error(e);
        return null;
      }
      console.log(`Pathed ${family}`);

      const svg = fontPath.toPathData(1);
      if (
        !svg ||
        svg.length > 1024 * 14 ||
        svg.startsWith('M12.5 0L2.5 0L2.5-12.5L12.5-12.5L12.5 0Z') ||
        svg.startsWith('M9.0 0L1.0 0L1.0-14.3L9.0-14.3L9.0 0Z')
      ) {
        return null;
      }
      fontPreviewStream.write(`  "${family}": "${svg}",\n`);
      console.log(`Drawn ${family}`);

      return family;
    }),
  );

  await new Promise((resolve, reject) => {
    fontPreviewStream.end('"_":""}\n', err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  const completedFamilies = fontRequests
    .filter(x => x)
    .sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(
    'src/fontPreviews/fontList.json',
    JSON.stringify(completedFamilies),
  );
  fs.writeFileSync(
    'src/fontPreviews/fontCategories.json',
    JSON.stringify(
      filteredItems.reduce((acc, cur) => {
        if (!completedFamilies.includes(cur.family)) {
          return acc;
        }
        if (!acc[cur.category]) {
          acc[cur.category] = [];
        }
        acc[cur.category].push(cur.family);
        return acc;
      }, {}),
    ),
  );
}

run().then(null, err => {
  console.error(err);
  process.exit(1);
});
