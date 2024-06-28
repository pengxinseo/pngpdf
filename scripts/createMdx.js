const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BASE_DIRECTORY = path.join(process.cwd(), 'content');
const LANGUAGES = ['id', 'hi', 'fil', 'tr', 'ms', 'en', 'zh', 'ko', 'ja', 'tw', 'pt', 'es', 'de', 'fr', 'vi', 'ru', 'ar'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createMdxFile = (language, keyword) => {
  const CONTENT_DIRECTORY = path.join(BASE_DIRECTORY, language);
  if (!fs.existsSync(CONTENT_DIRECTORY)) {
    console.warn(`${language} 文件夹不存在: ${CONTENT_DIRECTORY}`);
    return;
  }
  
  const filenames = fs.readdirSync(CONTENT_DIRECTORY).filter(filename => filename.endsWith('.mdx'));
  filenames.forEach(filename => {
    const filePath = path.join(CONTENT_DIRECTORY, filename);
    const newFilePath = path.join(CONTENT_DIRECTORY, filename.replace('.mdx', `.${keyword}.mdx`));
    
    if (fs.existsSync(newFilePath)) {
      console.warn(`文件已存在: ${newFilePath}`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    fs.writeFileSync(newFilePath, content);
    console.log(`文件已创建: ${newFilePath}`);
  });
};

rl.question('请输入关键词: ', (keyword) => {
  if (!keyword) {
    console.error('关键词不能为空');
    rl.close();
    return;
  }

  // Process each language
  LANGUAGES.forEach(language => {
    createMdxFile(language, keyword);
  });

  console.log('所有文件已处理完毕。');
  rl.close();
});