module.exports = {
  printWidth: 120, // 一行最大多少字符
  tabWidth: 2, // tab占用的字符数
  semi: false, // 在语句末尾添加分号
  useTabs: false, // 是否使用tab代替空格
  singleQuote: true, // 是否使用单引号
  jsxSingleQuote: false, // jsx是否使用单引号
  jsxBracketSameLinte: true, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
  trailingComma: 'none', // 在任何可能的多行中输入尾逗号
  bracketSpacing: true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
  jsxBracketSameLine: false, // 看官网
  arrowParens: 'avoid', // 为单行箭头函数的参数添加圆括号,
  /**
   * endOfLine: "<auto|lf|crlf|cr>"
   * "auto" - 维护现有的行结尾（通过查看第一行之后使用的内容来标准化一个文件中的混合值）
   * "lf"- Line Feed only（\n），在Linux和macOS以及git repos内部很常见
   * "crlf"- 回车符+换行符（\r\n），在Windows上很常见
   * "cr"- 仅限回车符（\r），很少使用
   */
  endOfLine: 'auto' // 文件行结尾风格
}
