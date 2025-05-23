const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const chokidar = require('chokidar');

const BASE_DIRECTORY = path.join(process.cwd(), 'content');
const OUTPUT_DIRECTORY = path.join(process.cwd(), 'content');
const LANGUAGES = ['id', 'hi', 'fil', 'tr', 'ms', 'en', 'zh', 'ko', 'ja', 'tw', 'pt', 'es', 'de', 'fr', 'vi', 'ru', 'ar'];

const getCurrentFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以要加1
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
};

// Function to process MDX files and generate JSON
const processMdxFiles = (language) => {
  const CONTENT_DIRECTORY = path.join(BASE_DIRECTORY, language);
  if (!fs.existsSync(CONTENT_DIRECTORY)) {
    console.warn(`${language} 文件夹不存在: ${CONTENT_DIRECTORY}`);
    return;
  }
  
  const filenames = fs.readdirSync(CONTENT_DIRECTORY).filter(filename => filename.endsWith('.mdx'));
  const posts = filenames.map(filename => {
    const filePath = path.join(CONTENT_DIRECTORY, filename);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);
    const { date, description, title, keyword } = data;

    return {
      content,
      date,
      description,
      slug: filename.replace('.mdx', ''),
      title,
      keyword
    };
  });

  const OUTPUT_FILE = path.join(OUTPUT_DIRECTORY, `${language}.json`);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  const currentDate = getCurrentFormattedDate();
  console.log(`${language}.json ======> 文件已更新: ${currentDate}`);
};

// Initial processing for all languages
LANGUAGES.forEach(language => {
  processMdxFiles(language);
});

// Watch for changes in MDX files using chokidar
const watcher = chokidar.watch(path.join(BASE_DIRECTORY, '*/*.mdx'));
watcher.on('change', (filePath) => {
  console.log(`File changed: ${filePath}`);
  
  // Determine language from filePath
  const parts = filePath.split(path.sep);
  const languageIndex = parts.findIndex(part => LANGUAGES.includes(part));

  if (languageIndex !== -1) {
    const language = parts[languageIndex];
    processMdxFiles(language);
  }
});