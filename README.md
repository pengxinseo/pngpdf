# PNG to PDF Online Converter

A simple, fast, and free online PNG to PDF conversion tool.

## 📝 Project Introduction

PNG to PDF is a web application developed with Next.js that allows users to quickly and conveniently convert PNG images to PDF documents. No software download is required, and conversions can be completed directly in your browser.

### Key Features

- 🚀 **Completely Free**: All features are free with no limitations
- 🔒 **Secure & Reliable**: All conversions happen in the browser without server uploads, protecting your privacy
- 📱 **Cross-Platform Support**: Works on computers, tablets, and mobile phones
- 🌐 **Multi-language Support**: Offers 12+ language interfaces to meet global user needs
- 🖼️ **Batch Conversion**: Supports combining multiple PNG images into a single PDF document
- ⚙️ **Customization Options**: Allows selection of paper size and page margins

## ✨ Features

- Convert PNG images to PDF documents
- Support for batch conversion (up to 30 images)
- Customizable paper sizes (A4, A1, A2, and many other standard sizes)
- Adjustable page margins
- Drag-and-drop to reorder images
- One-click download of conversion results

## 🛠️ Technology Stack

- Next.js 14.2.3
- React 18
- TypeScript
- jsPDF (for PDF generation)
- @dnd-kit (for drag-and-drop functionality)
- Tailwind CSS
- next-intl (for internationalization)

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pngpdf.git
cd pngpdf
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Visit [http://localhost:3000](http://localhost:3000) in your browser

## 📖 User Guide

1. Click the upload button or drag and drop PNG images to the designated area
2. Choose paper size and margin settings (optional)
3. For single images: Click the download button under the corresponding image
4. For multiple images: Click the "Merge" button to combine all images into one PDF
5. Download the generated PDF file

## 🌐 Internationalization Support

This project supports multiple languages to meet the needs of global users:

| Language Code | Language Name | Region |
|---------------|---------------|--------|
| 🇨🇳 `zh` | Chinese | Mainland China |
| 🇺🇸 `en` | English | Global |
| 🇯🇵 `ja` | Japanese | Japan |
| 🇰🇷 `ko` | Korean | Korea |
| 🇫🇷 `fr` | French | France |
| 🇩🇪 `de` | German | Germany |
| 🇪🇸 `es` | Spanish | Spain |
| 🇷🇺 `ru` | Russian | Russia |
| 🇵🇹 `pt` | Portuguese | Portugal |
| 🇹🇼 `tw` | Traditional Chinese | Taiwan Region |
| 🇻🇳 `vi` | Vietnamese | Vietnam |
| 🇮🇩 `id` | Indonesian | Indonesia |
| 🇮🇳 `hi` | Hindi | India |
| 🇵🇭 `fil` | Filipino | Philippines |
| 🇹🇷 `tr` | Turkish | Turkey |
| 🇲🇾 `ms` | Malay | Malaysia |
| 🇸🇦 `ar` | Arabic | Arab Countries |

## 📂 Project Structure

```
pngpdf/
├── content/                  # Blog content directory, organized by language
│   ├── zh/                   # Chinese content
│   ├── en/                   # English content
│   ├── ...                   # Other language content
│   └── *.json                # Exported content JSON files
├── messages/                 # Internationalization translation files
│   ├── zh.json               # Chinese translations
│   ├── en.json               # English translations
│   └── ...                   # Other language translations
├── public/                   # Static resources
├── scripts/                  # Utility scripts
│   ├── exportPosts.js        # Content export script
│   ├── watchContent.js       # Content monitoring script
│   ├── createMdx.js          # MDX file creation script
│   └── deleteMdx.js          # MDX file deletion script
├── src/                      # Source code directory
│   ├── app/                  # Next.js application directory
│   │   └── [locale]/         # Internationalized routes
│   │       └── [slug]/       # Dynamic routes (blog posts)
│   ├── components/           # React components
│   │   ├── PngToPdf.tsx      # Core PNG to PDF conversion component
│   │   ├── ui/               # UI components
│   │   └── markdown/         # Markdown rendering components
│   ├── configs/              # Configuration files
│   ├── lib/                  # Utility libraries
│   └── i18n.ts               # Internationalization configuration
├── .next/                    # Next.js build directory
├── node_modules/             # Dependencies
├── package.json              # Project configuration
└── README.md                 # Project documentation
```

### Directory Explanation

- **content/**: Blog content stored by language, along with exported JSON files
- **messages/**: Translation files for different languages, used for UI internationalization
- **scripts/**: Scripts related to content management
- **src/app/**: Main structure of the Next.js application, supporting internationalized routes
- **src/components/**: Various React components, including the core PngToPdf conversion component
- **public/**: Static assets such as images and icons

## 📜 Script Usage Guide

The project includes several utility scripts for content management and internationalization support. These scripts are located in the `scripts/` directory:

### exportPosts.js
Exports content files for all languages in JSON format for website content display.

```bash
npm run export-posts
```

### watchContent.js
Monitors content file changes and automatically updates the corresponding JSON files when content is modified.

```bash
npm run content
```

### createMdx.js
Creates new multilingual content files. After running the script, enter a keyword to create corresponding MDX files in all language directories.

```bash
npm run mdx
```

### deleteMdx.js
Deletes multilingual content files for a specified keyword. After running the script, enter a keyword to delete corresponding MDX files in all language directories.

```bash
npm run del
```

### Content Management Workflow

1. Use `npm run mdx` to create new content files
2. Edit the `content/[language]/[keyword].mdx` files
3. Content changes will be automatically updated to JSON files via `watchContent.js`
4. Use `npm run del` when you need to delete content

## 🔜 Future Plans

- Develop browser plugin version
- Add more customization options (background, watermark, etc.)
- Support more image formats (JPEG, GIF, etc.)
- Optimize mobile experience

## 👨‍💻 Contributions

Issues and PRs are welcome to help improve this project!

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📝 Copyright and Attribution

© 2023-2024 PngPDF.net

### How to Cite This Project

If you use or reference this project in your own project or article, please cite it in the following format:

```
PNG to PDF converter - Developed by PngPDF.net
Project URL: https://github.com/yourusername/pngpdf
```

### License Statement

This project code is open-source under the [MIT License](LICENSE). You are free to use, modify, and distribute it, but you must retain the original copyright notice and license information. For full terms, please see the [LICENSE](LICENSE) file. 


## 🔗 Related Projects

Below are our other related projects:

| Project Name | Website | Description |
|--------------|---------|-------------|
| Tiepolo AI | [https://tiepolo.app](Tiepolo ai) | Transform your ideas into high-quality AI-generated images and videos with Tiepolo AI's powerful technology. Create stunning visual content with simple text prompts - completely free to start. No design skills needed.| 