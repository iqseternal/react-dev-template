

import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { join } from 'path';

import tsConfigJson from './tsconfig.json';

export const resolveAlias = (basePath: string, aliasPath: Record<string, string[]>) => {
  const alias: Record<string, string> = {};

  for (const key in aliasPath) {
    alias[key.replace('/*', '')] = join(basePath, aliasPath[key][0].replace('/*', ''));
  }

  return alias;
}


const rsbuildConfig = defineConfig(({ env, envMode, command }) => {

  return {
    source: {
      entry: {
        index: join(__dirname, './src/index.tsx')
      },
      alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths)
    },
    plugins: [
      pluginSass(),
      pluginStyledComponents(),
      pluginTypedCSSModules(),
      pluginReact()
    ],

    server: {
      port: 3002
    },
    output: {
      polyfill: 'off',
      assetPrefix: '.',
      cleanDistPath: true,
      minify: {
        js: true,
        jsOptions: {
          minimizerOptions: {
            format: {
              comments: false,
              ecma: 2015
            }
          }
        },
        css: true,
      }
    }
  }
})

export default rsbuildConfig;
