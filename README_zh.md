# PNG转PDF 在线转换工具

一款简单、快速、免费的在线PNG转PDF转换工具。

## 📝 项目介绍

PNG转PDF是一个基于Next.js开发的Web应用，能够让用户快速、方便地将PNG图片转换为PDF文档。无需下载任何软件，通过浏览器即可完成转换操作。

### 主要特点

- 🚀 **完全免费**：所有功能完全免费，无限制使用
- 🔒 **安全可靠**：所有转换在浏览器端进行，不会上传到服务器，保护您的隐私
- 📱 **跨平台支持**：支持在电脑、平板和手机上使用
- 🌐 **多语言支持**：提供12+种语言界面，满足全球用户需求
- 🖼️ **批量转换**：支持多张PNG图片合并为单个PDF文档
- ⚙️ **自定义设置**：可选择纸张大小和页面边距

## ✨ 功能特性

- PNG图片转PDF文档
- 支持批量转换（最多30张图片）
- 可自定义纸张大小（A4、A1、A2等多种标准尺寸）
- 可调整页面边距
- 支持拖拽调整图片顺序
- 一键下载转换结果

## 🛠️ 技术栈

- Next.js 14.2.3
- React 18
- TypeScript
- jsPDF (用于PDF生成)
- @dnd-kit (拖拽排序功能)
- Tailwind CSS
- next-intl (国际化支持)

## 🚀 快速开始

1. 克隆仓库:
```bash
git clone https://github.com/yourusername/pngpdf.git
cd pngpdf
```

2. 安装依赖:
```bash
npm install
```

3. 运行开发服务器:
```bash
npm run dev
```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 📖 使用指南

1. 点击上传按钮或拖放PNG图片到指定区域
2. 选择纸张大小和边距设置（可选）
3. 单个图片：点击对应图片下的下载按钮
4. 多个图片：点击"合并"按钮将所有图片合并为一个PDF
5. 下载生成的PDF文件

## 🌐 国际化支持

本项目支持多种语言，满足全球用户的需求：

| 语言代码 | 语言名称 | 地区 |
|---------|---------|------|
| 🇨🇳 `zh` | 中文 | 中国大陆 |
| 🇺🇸 `en` | 英文 | 全球 |
| 🇯🇵 `ja` | 日文 | 日本 |
| 🇰🇷 `ko` | 韩文 | 韩国 |
| 🇫🇷 `fr` | 法文 | 法国 |
| 🇩🇪 `de` | 德文 | 德国 |
| 🇪🇸 `es` | 西班牙文 | 西班牙 |
| 🇷🇺 `ru` | 俄文 | 俄罗斯 |
| 🇵🇹 `pt` | 葡萄牙文 | 葡萄牙 |
| 🇹🇼 `tw` | 繁体中文 | 台湾地区 |
| 🇻🇳 `vi` | 越南文 | 越南 |
| 🇮🇩 `id` | 印尼文 | 印度尼西亚 |
| 🇮🇳 `hi` | 印地文 | 印度 |
| 🇵🇭 `fil` | 菲律宾文 | 菲律宾 |
| 🇹🇷 `tr` | 土耳其文 | 土耳其 |
| 🇲🇾 `ms` | 马来文 | 马来西亚 |
| 🇸🇦 `ar` | 阿拉伯文 | 阿拉伯国家 |

## 📂 项目结构

```
pngpdf/
├── content/                  # 博客内容目录，按语言分类
│   ├── zh/                   # 中文内容
│   ├── en/                   # 英文内容
│   ├── ...                   # 其他语言内容
│   └── *.json                # 导出的内容JSON文件
├── messages/                 # 国际化翻译文件
│   ├── zh.json               # 中文翻译
│   ├── en.json               # 英文翻译
│   └── ...                   # 其他语言翻译
├── public/                   # 静态资源文件
├── scripts/                  # 工具脚本
│   ├── exportPosts.js        # 导出内容脚本
│   ├── watchContent.js       # 内容监视脚本
│   ├── createMdx.js          # 创建MDX文件脚本
│   └── deleteMdx.js          # 删除MDX文件脚本
├── src/                      # 源代码目录
│   ├── app/                  # Next.js 应用目录
│   │   └── [locale]/         # 国际化路由
│   │       └── [slug]/       # 动态路由（博客文章）
│   ├── components/           # React组件
│   │   ├── PngToPdf.tsx      # PNG转PDF核心功能组件
│   │   ├── ui/               # UI组件
│   │   └── markdown/         # Markdown渲染组件
│   ├── configs/              # 配置文件
│   ├── lib/                  # 工具库
│   └── i18n.ts               # 国际化配置
├── .next/                    # Next.js 构建目录
├── node_modules/             # 依赖包
├── package.json              # 项目配置
└── README.md                 # 项目说明
```

### 目录说明

- **content/**: 按语言分类存储的博客内容，以及导出的JSON文件
- **messages/**: 存放各种语言的翻译文件，用于网站UI国际化
- **scripts/**: 包含内容管理相关的脚本工具
- **src/app/**: Next.js应用的主要结构，支持国际化路由
- **src/components/**: 各种React组件，包括核心的PngToPdf转换组件
- **public/**: 静态资源文件，如图片、图标等

## 📜 脚本使用说明

项目包含多个实用脚本，用于内容管理和国际化支持。这些脚本位于`scripts/`目录下：

### exportPosts.js
导出所有语言的内容文件为JSON格式，用于网站内容展示。

```bash
npm run export-posts
```

### watchContent.js
监视内容文件的变化，当内容发生修改时自动更新对应的JSON文件。

```bash
npm run content
```

### createMdx.js
创建新的多语言内容文件。执行脚本后输入关键词，将在所有语言目录下创建对应的MDX文件。

```bash
npm run mdx
```

### deleteMdx.js
删除指定关键词的多语言内容文件。执行脚本后输入关键词，将删除所有语言目录下对应的MDX文件。

```bash
npm run del
```

### 内容管理流程

1. 使用`npm run mdx`创建新的内容文件
2. 编辑`content/[语言]/[关键词].mdx`文件
3. 内容变更会自动通过`watchContent.js`更新到JSON文件
4. 需要删除内容时使用`npm run del`

## 🔜 未来计划

- 开发浏览器插件版本
- 添加更多自定义选项（背景、水印等）
- 支持更多图片格式（JPEG、GIF等）
- 优化移动端体验

## 👨‍💻 贡献

欢迎提交问题和PR来帮助改进这个项目！

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)
