import plugin from './prettier-import-sort';

describe('prettierImportSort', () => {
  it('should work', () => {
    expect(plugin).not.toBeUndefined();
    const result = plugin.parsers.typescript.preprocess(
      `import { parsers as javascriptParsers } from 'prettier/plugins/babel';
import { parsers as typescriptParsers } from 'prettier/plugins/typescript';
import { sortImports } from 'import-sort';
import { getConfig, IResolvedConfig } from 'import-sort-config';
import { IStyle } from 'import-sort-style';
import { IParser } from 'import-sort-parser';
import path = require('path');`,
      {
        filepath: 'adam.ts',
        locStart:()=> 0,
        locEnd:()=> 0,
        originalText:'',
        semi: true,
        useTabs: false,
        tabWidth: 2,
        singleQuote: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        parser: 'typescript',
        jsxSingleQuote: false,
        bracketSameLine: false,
        arrowParens: 'avoid',
        rangeStart: 0,
        rangeEnd: 0,
        requirePragma: false,
        insertPragma: false,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        endOfLine: 'lf',
        embeddedLanguageFormatting: 'auto',
        quoteProps: 'as-needed',
        vueIndentScriptAndStyle: false,
        plugins: [],
        singleAttributePerLine: false,
        printWidth: 80,
      },
    );
    expect(result).not.toBeUndefined()
  });
});
