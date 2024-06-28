const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BASE_DIRECTORY = path.join(process.cwd(), 'content');
const LANGUAGES = ['id', 'hi', 'fil', 'tr', 'ms', 'en', 'zh', 'ko', 'ja', 'tw', 'pt', 'es', 'de', 'fr', 'vi', 'ru', 'ar'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const deleteMdxFile = (language, keyword) => {
  const CONTENT_DIRECTORY = path.join(BASE_DIRECTORY, language);
  if (!fs.existsSync(CONTENT_DIRECTORY)) {
    console.warn(`${language} 文件夹不存在: ${CONTENT_DIRECTORY}`);
    return;
  }
  
  const filenames = fs.readdirSync(CONTENT_DIRECTORY).filter(filename => filename.includes(`.${keyword}.mdx`));
  filenames.forEach(filename => {
    const filePath = path.join(CONTENT_DIRECTORY, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`文件已删除: ${filePath}`);
    } else {
      console.warn(`文件不存在: ${filePath}`);
    }
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
    deleteMdxFile(language, keyword);
  });

  console.log('所有文件已处理完毕。');
  rl.close();
});