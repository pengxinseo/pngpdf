const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const chokidar = require('chokidar');

const BASE_DIRECTORY = path.join(process.cwd(), 'content');
const LANGUAGES = ['id', 'hi', 'fil', 'tr', 'ms', 'en', 'zh', 'ko', 'ja', 'tw', 'pt', 'es', 'de', 'fr', 'vi', 'ru', 'ar']; // Add more languages as needed
const OUTPUT_DIRECTORY = path.join(process.cwd(), 'content');

const getAllPosts = (language) => {
  const CONTENT_DIRECTORY = path.join(BASE_DIRECTORY, language);
  if (!fs.existsSync(CONTENT_DIRECTORY)) {
    console.warn(`${language}文件夹为空: ${CONTENT_DIRECTORY}`);
    return [];
  }
  const filenames = fs.readdirSync(CONTENT_DIRECTORY).filter(filename => filename.endsWith('.mdx'));
  
  return filenames.map(filename => {
    const filePath = path.join(CONTENT_DIRECTORY, filename);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);
    const { date, description, title, keyword} = data;

    return {
      content,
      date,
      description,
      slug: filename.replace('.mdx', ''),
      title,
      keyword
    };
  });
};

// Function to generate JSON file for each language
const generateJsonFile = (language, posts) => {
  const OUTPUT_FILE = path.join(OUTPUT_DIRECTORY, `${language}.json`);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`【${language}】json导出成功: ${OUTPUT_FILE}`);
};

// Loop through each language and generate JSON file
LANGUAGES.forEach(language => {
  const posts = getAllPosts(language);
  generateJsonFile(language, posts);
});
