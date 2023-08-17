# @adaskothebeast/prettier-import-sort

[Prettier] plugin for sort imports using [import-sort] for javascript and TypeScript files based on [prettier-plugin-import-sort] great work of @ggascoigne and @renke - adjustment for Prettier v3;

[Prettier]: https://github.com/prettier/prettier
[import-sort]: https://github.com/renke/import-sort
[prettier-plugin-import-sort]: https://github.com/ggascoigne/prettier-plugin-import-sort

## Installation

1. Install [Prettier] and this plugin with:

    ```bash
    npm i -D prettier @adaskothebeast/prettier-import-sort import-sort-config
    ```

    or

    ```bash
    yarn add -D prettier @adaskothebeast/prettier-import-sort import-sort-config
    ```

1. You will also want to install an import sort style module of your choice, such as: 

    ```bash
    npm i -D import-sort-style-module
    ```

    or

    ```bash
    yarn add -D import-sort-style-module
    ```

1. You will then need the configuration for import-sorts available for example in `importsortrc.js`

    ```js
    module.exports = {
      '.js, .jsx, .ts, .tsx': {
        style: 'module',
        parser: 'babel',
      },
    };
    ```

1. If you are using TypeScript, you may also need to specify the TypeScript parser.  This is somewhat dependant upon the TypeScript features used (decorators for instance), e.g.

    ```js
    module.exports = {
      '.js, .jsx, .ts, .tsx': {
        style: 'module',
        parser: 'typescript',
      },
    };
    ```

    Note: importSort silently falls back to its default configuration if it finds a setup error. Make sure that the extension list is like the example above and not something like `"*.js"` which is an error.

1. adjust your `.prettierrc` file to include the plugin:

    ```json
    {
      "plugins": ["@adaskothebeast/prettier-import-sort"]
    }
    ```

### Credits:

A large part of this code was copied from prettier-plugin-import-sort.
