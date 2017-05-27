// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // closed defined but never used
    'no-unused-vars': 0,
    // 关闭缩进检测
    'indent': 0,
    // hbuilder编辑器不知道做完了什么处理，enter换行出出现no-mixed-spaces-and-tabs，然而shift+enter退回去，再按enter回到原来的样子去恶不报错
    "no-mixed-spaces-and-tabs":0,
    // hbuilder编辑器不知道做完了什么处理，enter换行出出现no-mixed-spaces-and-tabs，然而shift+enter退回去，再按enter回到原来的样子去恶不报错
    "no-tabs":0,
    "no-undef":0,
    "quotes":0
  }
}
