# PNG에서 PDF로 온라인 변환 도구

간단하고, 빠르며, 무료인 온라인 PNG에서 PDF로 변환 도구입니다.

## 📝 프로젝트 소개

PNG에서 PDF로는 Next.js로 개발된 웹 애플리케이션으로, 사용자가 PNG 이미지를 PDF 문서로 빠르고 편리하게 변환할 수 있습니다. 소프트웨어를 다운로드할 필요 없이 브라우저에서 직접 변환이 완료됩니다.

### 주요 특징

- 🚀 **완전 무료**: 모든 기능이 제한 없이 무료로 제공
- 🔒 **안전하고 신뢰할 수 있음**: 모든 변환은 브라우저에서 이루어지며 서버에 업로드되지 않아 개인 정보 보호
- 📱 **크로스 플랫폼 지원**: 컴퓨터, 태블릿 및 모바일 폰에서 사용 가능
- 🌐 **다국어 지원**: 12개 이상의 언어 인터페이스를 제공하여 전 세계 사용자의 요구 충족
- 🖼️ **일괄 변환**: 여러 PNG 이미지를 하나의 PDF 문서로 결합하는 기능 지원
- ⚙️ **사용자 정의 옵션**: 용지 크기 및 페이지 여백 선택 가능

## ✨ 기능

- PNG 이미지를 PDF 문서로 변환
- 일괄 변환 지원(최대 30개 이미지)
- 사용자 정의 가능한 용지 크기(A4, A1, A2 및 기타 많은 표준 크기)
- 조정 가능한 페이지 여백
- 드래그 앤 드롭으로 이미지 순서 변경
- 원클릭으로 변환 결과 다운로드

## 🛠️ 기술 스택

- Next.js 14.2.3
- React 18
- TypeScript
- jsPDF (PDF 생성용)
- @dnd-kit (드래그 앤 드롭 기능용)
- Tailwind CSS
- next-intl (국제화 지원)

## 🚀 빠른 시작

1. 저장소 복제:
```bash
git clone https://github.com/yourusername/pngpdf.git
cd pngpdf
```

2. 의존성 설치:
```bash
npm install
```

3. 개발 서버 실행:
```bash
npm run dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📖 사용 가이드

1. 업로드 버튼을 클릭하거나 PNG 이미지를 지정된 영역으로 드래그 앤 드롭
2. 용지 크기 및 여백 설정 선택(선택 사항)
3. 단일 이미지의 경우: 해당 이미지 아래의 다운로드 버튼 클릭
4. 여러 이미지의 경우: "병합" 버튼을 클릭하여 모든 이미지를 하나의 PDF로 결합
5. 생성된 PDF 파일 다운로드

## 🌐 국제화 지원

이 프로젝트는 전 세계 사용자의 요구를 충족하기 위해 여러 언어를 지원합니다:

| 언어 코드 | 언어 이름 | 지역 |
|----------|----------|------|
| 🇨🇳 `zh` | 중국어 | 중국 본토 |
| 🇺🇸 `en` | 영어 | 전 세계 |
| 🇯🇵 `ja` | 일본어 | 일본 |
| 🇰🇷 `ko` | 한국어 | 한국 |
| 🇫🇷 `fr` | 프랑스어 | 프랑스 |
| 🇩🇪 `de` | 독일어 | 독일 |
| 🇪🇸 `es` | 스페인어 | 스페인 |
| 🇷🇺 `ru` | 러시아어 | 러시아 |
| 🇵🇹 `pt` | 포르투갈어 | 포르투갈 |
| 🇹🇼 `tw` | 번체 중국어 | 대만 지역 |
| 🇻🇳 `vi` | 베트남어 | 베트남 |
| 🇮🇩 `id` | 인도네시아어 | 인도네시아 |
| 🇮🇳 `hi` | 힌디어 | 인도 |
| 🇵🇭 `fil` | 필리핀어 | 필리핀 |
| 🇹🇷 `tr` | 터키어 | 터키 |
| 🇲🇾 `ms` | 말레이어 | 말레이시아 |
| 🇸🇦 `ar` | 아랍어 | 아랍 국가 |

## 📂 프로젝트 구조

```
pngpdf/
├── content/                  # 언어별로 구성된 블로그 콘텐츠 디렉토리
│   ├── zh/                   # 중국어 콘텐츠
│   ├── en/                   # 영어 콘텐츠
│   ├── ...                   # 기타 언어 콘텐츠
│   └── *.json                # 내보낸 콘텐츠 JSON 파일
├── messages/                 # 국제화 번역 파일
│   ├── zh.json               # 중국어 번역
│   ├── en.json               # 영어 번역
│   └── ...                   # 기타 언어 번역
├── public/                   # 정적 자원
├── scripts/                  # 유틸리티 스크립트
│   ├── exportPosts.js        # 콘텐츠 내보내기 스크립트
│   ├── watchContent.js       # 콘텐츠 모니터링 스크립트
│   ├── createMdx.js          # MDX 파일 생성 스크립트
│   └── deleteMdx.js          # MDX 파일 삭제 스크립트
├── src/                      # 소스 코드 디렉토리
│   ├── app/                  # Next.js 애플리케이션 디렉토리
│   │   └── [locale]/         # 국제화된 경로
│   │       └── [slug]/       # 동적 경로(블로그 게시물)
│   ├── components/           # React 컴포넌트
│   │   ├── PngToPdf.tsx      # PNG에서 PDF로 변환하는 핵심 컴포넌트
│   │   ├── ui/               # UI 컴포넌트
│   │   └── markdown/         # 마크다운 렌더링 컴포넌트
│   ├── configs/              # 구성 파일
│   ├── lib/                  # 유틸리티 라이브러리
│   └── i18n.ts               # 국제화 구성
├── .next/                    # Next.js 빌드 디렉토리
├── node_modules/             # 의존성
├── package.json              # 프로젝트 구성
└── README.md                 # 프로젝트 문서
```

### 디렉토리 설명

- **content/**: 언어별로 저장된 블로그 콘텐츠와 내보낸 JSON 파일
- **messages/**: UI 국제화에 사용되는 다양한 언어의 번역 파일
- **scripts/**: 콘텐츠 관리와 관련된 스크립트
- **src/app/**: 국제화된 경로를 지원하는 Next.js 애플리케이션의 주요 구조
- **src/components/**: PngToPdf 변환 컴포넌트를 포함한 다양한 React 컴포넌트
- **public/**: 이미지와 아이콘과 같은 정적 자산

## 📜 스크립트 사용 가이드

이 프로젝트에는 콘텐츠 관리 및 국제화 지원을 위한 여러 유틸리티 스크립트가 포함되어 있습니다. 이 스크립트들은 `scripts/` 디렉토리에 위치합니다:

### exportPosts.js
웹사이트 콘텐츠 표시를 위해 모든 언어의 콘텐츠 파일을 JSON 형식으로 내보냅니다.

```bash
npm run export-posts
```

### watchContent.js
콘텐츠 파일의 변경을 모니터링하고 콘텐츠가 수정될 때 해당 JSON 파일을 자동으로 업데이트합니다.

```bash
npm run content
```

### createMdx.js
새로운 다국어 콘텐츠 파일을 생성합니다. 스크립트를 실행한 후 키워드를 입력하면 모든 언어 디렉토리에 해당 MDX 파일이 생성됩니다.

```bash
npm run mdx
```

### deleteMdx.js
지정된 키워드의 다국어 콘텐츠 파일을 삭제합니다. 스크립트를 실행한 후 키워드를 입력하면 모든 언어 디렉토리의 해당 MDX 파일이 삭제됩니다.

```bash
npm run del
```

### 콘텐츠 관리 워크플로우

1. `npm run mdx`를 사용하여 새 콘텐츠 파일 생성
2. `content/[언어]/[키워드].mdx` 파일 편집
3. 콘텐츠 변경은 `watchContent.js`를 통해 자동으로 JSON 파일에 업데이트됩니다
4. 콘텐츠를 삭제해야 할 때는 `npm run del` 사용

## 🔜 향후 계획

- 브라우저 플러그인 버전 개발
- 더 많은 사용자 정의 옵션(배경, 워터마크 등) 추가
- 더 많은 이미지 형식(JPEG, GIF 등) 지원
- 모바일 경험 최적화

## 👨‍💻 기여

이 프로젝트를 개선하기 위한 이슈와 PR을 환영합니다!

## 📄 라이센스

이 프로젝트는 [MIT 라이센스](LICENSE) 하에 라이센스가 부여됩니다.

## 📝 저작권 및 인용

© 2023-2024 PngPDF.net

### 이 프로젝트를 인용하는 방법

자신의 프로젝트나 글에서 이 프로젝트를 사용하거나 참조할 경우, 다음 형식으로 인용해 주세요:

```
PNG to PDF 변환기 - PngPDF.net에서 개발
프로젝트 URL: https://github.com/yourusername/pngpdf
```

### 라이센스 성명

이 프로젝트 코드는 [MIT 라이센스](LICENSE) 하에 오픈 소스로 제공됩니다. 자유롭게 사용, 수정 및 배포할 수 있지만, 원본 저작권 고지와 라이센스 정보를 유지해야 합니다. 전체 조건은 [LICENSE](LICENSE) 파일을 참조하십시오. 