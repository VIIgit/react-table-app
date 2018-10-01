# Table of content

- [Table of content](#table-of-content)
- [How to create an React App with ease](#how-to-create-an-react-app-with-ease)
    - [Pre-condition command done for this project](#pre-condition-command-done-for-this-project)
- [Preparation](#preparation)
    - [Install additional npm modules](#install-additional-npm-modules)
    - [Cleanup generated files](#cleanup-generated-files)
    - [Build project](#build-project)


# How to create an React App with ease

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Pre-condition command done for this project

```sh
npx create-react-app react-table-app
cd react-table-app
npm start
```

You can find the most recent information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


# Preparation

## Install additional npm modules

ajv dependency of react-bootstrap-table

```sh
npm install ajv --save
```

[react-bootstrap-table](https://react-bootstrap-table.github.io/react-bootstrap-table2)

```sh
npm install react-bootstrap-table-next --save
npm install react-bootstrap-table2-filter --save
npm install react-bootstrap-table2-toolkit --save
```
[bootstrap](https://www.npmjs.com/package/bootstrap)

```sh
npm install react-bootstrap-table-next --save
```

[css-loader](https://github.com/webpack-contrib/css-loader)

```sh
#npm install css-loader --save-dev
```

[window-or-global](https://www.npmjs.com/package/window-or-global)

```sh
npm install window-or-global --save
```

[bootstrap](https://www.npmjs.com/package/bootstrap)

npm WARN bootstrap@4.1.3 requires a peer 
of jquery@1.9.1 - 3 but none is installed.
of popper.js@^1.14.3 but none is installed. 
You must install peer dependencies yourself

```sh
npm install jquery --save
npm install popper.js --save
npm install bootstrap --save
```

[bootstrap-select](https://www.npmjs.com/package/bootstrap-select)

```sh
npm install bootstrap-select --save
```

[react-markdown](https://github.com/rexxars/react-markdown)

```sh
npm install react-markdown --save
```

[babel-polyfill](https://babeljs.io/docs/en/babel-polyfill) for IE11

```sh
npm install babel-polyfill --save
```

## Cleanup generated files

"ajv-keywords": "^3.2.0",

## Build project

```sh
npm run build
```