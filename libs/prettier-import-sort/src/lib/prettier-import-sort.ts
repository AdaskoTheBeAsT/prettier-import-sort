import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginTypeScript from 'prettier/plugins/typescript';
import { sortImports } from 'import-sort';
import { getConfig, IResolvedConfig } from 'import-sort-config';
import { IStyle } from 'import-sort-style';
import { IParser } from 'import-sort-parser';
import * as path from 'path';
import { ParserOptions } from 'prettier';

function throwMessage(message: string): void {
  throw new Error(`@adaskothebeast/prettier-import-sort: ${message}`);
}

function throwIf(condition: boolean, message: string): void {
  if (condition) {
    throwMessage(message);
  }
}

function assertConfig(
  config: IResolvedConfig | undefined,
  extension: string,
): asserts config is IResolvedConfig {
  if (config == null) {
    throwMessage(`No configuration found for file type ${extension}`);
  }
}

function getAndCheckConfig(
  extension: string,
  fileDirectory: string,
): IResolvedConfig {
  const resolvedConfig = getConfig(extension, fileDirectory);
  assertConfig(resolvedConfig, extension);

  const rawParser = resolvedConfig.config.parser;
  const rawStyle = resolvedConfig.config.style;

  throwIf(!rawParser, `No parser defined for file type ${extension}`);
  throwIf(!rawStyle, `No style defined for file type ${extension}`);

  const { parser, style } = resolvedConfig;

  throwIf(!parser, `Parser "${rawParser}" could not be resolved`);
  throwIf(
    !style || style === rawStyle,
    `Style "${rawStyle}" could not be resolved`,
  );
  return resolvedConfig;
}

function organizeImports(
  unsortedCode: string,
  extension: string,
  dirname: string,
  filepath: string,
): string {
  // this throw exceptions up to prettier
  const config = getAndCheckConfig(
    extension,
    dirname || path.resolve(__dirname, '..', '..'),
  );
  const { parser, style, config: rawConfig } = config;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const realParser = require(parser ?? '');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const realStyle = require(style ?? '');
  const sortResult = sortImports(
    unsortedCode,
    realParser as unknown as IParser,
    realStyle.default as unknown as IStyle,
    typeof filepath === 'string' ? filepath : `dummy${extension}`,
    rawConfig.options,
  );
  return sortResult.code;
}

const plugin = {
  parsers: {
    typescript: {
      ...prettierPluginTypeScript.parsers.typescript,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preprocess: (text: string, options: ParserOptions<any>) : string => {
        let extname = '.ts';
        let dirname = '';

        let filePath = '';
        if (typeof options.filepath === 'string') {
          extname = path.extname(options.filepath);
          dirname = path.dirname(options.filepath);
          filePath = options.filepath;
        }

        return organizeImports(text, extname, dirname, filePath);
      },
    },
    babel: {
      ...prettierPluginBabel.parsers.babel,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preprocess: (text: string, options: ParserOptions<any>) : string => {
        let extname = '.js';
        let dirname = '';

        let filePath = '';
        if (typeof options.filepath === 'string') {
          extname = path.extname(options.filepath);
          dirname = path.dirname(options.filepath);
          filePath = options.filepath;
        }

        return organizeImports(text, extname, dirname, filePath);
      }
    },
  },
};

export default plugin;
