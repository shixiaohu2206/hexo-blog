module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    commonjs: true,
    amd: true,
    es6: true,
    mocha: true
  },
  extends: ['eslint:recommended'], // 使用Eslint官方规则推荐
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    semi: 0, // 要求或禁止使用分号代替 ASI
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'jsx-quotes': 0, // 强制在 JSX 属性中一致地使用双引号或单引号
    quotes: [0, 'single', 'double'], // 强制使用一致的反勾号、双引号或单引号
    'no-multi-spaces': 2, // 禁止使用多个空格
    'comma-spacing': [2, { before: false, after: true }], // 强制在逗号前后使用一致的空格
    'comma-dangle': 2, // 要求或禁止末尾逗号
    'valid-jsdoc': 0, // 强制使用有效的 JSDoc 注释
    indent: ['error', 2], // 强制使用一致的缩进
    'arrow-parens': 0, // 要求箭头函数的参数使用圆括号
    'object-curly-spacing': 0, // 强制在大括号中使用一致的空格
    'spaced-comment': [2, 'always'], // 强制在注释中 // 或 /* 使用一致的空格
    'one-var-declaration-per-line': 2, // 要求或禁止在变量声明周围换行
    'default-case': 2, // 要求 switch 语句中有 default 分支
    'no-new-wrappers': 2, // 禁止对 String，Number 和 Boolean 使用 new 操作符
    eqeqeq: 1, // 要求使用 === 和 !==
    'no-alert': 1, // 禁用 alert、confirm 和 prompt
    'no-console': 1, // 禁用 alert、confirm 和 prompt
    'no-eval': 1, // 禁用 eval()
    'no-implied-eval': 1, // 禁止使用类似 eval() 的方法
    'eol-last': 2, // 要求或禁止文件末尾存在空行
    'no-multiple-empty-lines': 2, // 禁止出现多行空行
    'no-var': 0, // 要求使用 let 或 const 而不是 var
    'no-undef': 0, //
    'no-inner-declarations': 0, //
    'prefer-const': 0 // 要求使用 const 声明那些声明后不再被修改的变量
  }
}
