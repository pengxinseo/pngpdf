const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BASE_DIRECTORY = path.join(process.cwd(), 'content');
const LANGUAGES = ['id', 'hi', 'fil', 'tr', 'ms', 'en', 'zh', 'ko', 'ja', 'tw', 'pt', 'es', 'de', 'fr', 'vi', 'ru', 'ar'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createEmptyMdxFile = (language, keyword) => {
  const CONTENT_DIRECTORY = path.join(BASE_DIRECTORY, language);
  if (!fs.existsSync(CONTENT_DIRECTORY)) {
    console.warn(`${language} 文件夹不存在: ${CONTENT_DIRECTORY}`);
    return;
  }

  const newFilePath = path.join(CONTENT_DIRECTORY, `${keyword}.mdx`);
  if (fs.existsSync(newFilePath)) {
    console.warn(`文件已存在: ${newFilePath}`);
    return;
  }

  fs.writeFileSync(newFilePath, ''); // 创建空文件
  console.log(`文件已创建: ${newFilePath}`);
};

rl.question('请输入关键词: ', (keyword) => {
  if (!keyword) {
    console.error('关键词不能为空');
    rl.close();
    return;
  }

  // Process each language
  LANGUAGES.forEach(language => {
    createEmptyMdxFile(language, keyword);
  });

  console.log('所有文件已处理完毕。');
  rl.close();
});