"use client";
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { SiYoutubekids } from "react-icons/si";
import { Button } from "@/components/ui/button"

const Home = () => {
  const functionsArr = [
    {
      "title": "PNGを無料でPDFに変換",
      "content": "pngpdf.netは便利なオンラインツールを提供し、PNGをPDFドキュメントに迅速かつ無料で変換できます！"
    },
    {
      "title": "ファイル保存の問題",
      "content": "当プログラムは前端でのアップロードに直接対応し、ブラウザベースの操作なので、ファイルを保存することはありません。安心してご利用ください！"
    },
    {
      "title": "ソフトウェアのインストール不要",
      "content": "現在のバージョンはウェブ版ですが、今後Googleプラグインを追加予定です。スマートフォン、PC、タブレットで制限なく、迅速にアップロード・ダウンロードできます。"
    },
    {
      "title": "シンプルで使いやすいインターフェース",
      "content": "最新のフロントエンド技術を使用し、クリーンでシンプルなインターフェースを提供。いつでもどこでも簡単にPNGをPDFに変換できます。"
    },
    {
      "title": "オンラインで複数のPNGをPDFに一括変換",
      "content": "コア機能は単一のPNG画像をPDFに変換することですが、複数のPNG画像を1つのPDFに変換することもできます。完全無料で数量制限はありません！"
    },
    {
      "title": "多機能の高度な設定",
      "content": "今後、A4サイズのカスタム用紙、カスタム枠線、カスタム背景など、ドキュメントの美化操作を追加予定です！"
    },
    {
      "title": "ブラウザプラグインについて",
      "content": "作者はより便利で迅速なPNGからPDFへの変換操作のために、ブラウザプラグインを開発中です。ご期待ください！"
    },
    {
      "title": "多言語対応サイト",
      "content": "全世界のユーザーに対応するため、12以上の言語を追加しました。PNGからPDFへの変換ニーズに応えます。更新を続けているので、ぜひシェアしてください！"
    }
  ];

  const [photo, setPhoto] = useState<File | null>(null);

  const onChangephoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const pdfGenerate = () => {
    if (!photo) return;

    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = function (e) {
      if (!e.target || !e.target.result) return;

      const img = new Image();
      img.src = e.target.result as string;
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imgWidth = img.width;
        const imgHeight = img.height;

        canvas.width = imgWidth;
        canvas.height = imgHeight;
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

        const imgData = canvas.toDataURL('image/jpeg', 0.80);

        // Create a PDF page with the same dimensions as the image
        const doc = new jsPDF({
          orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
          unit: 'px',
          format: [imgWidth, imgHeight],
        });

        // Add image to PDF
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save(`${photo.name}.pdf`);
      };
    };
  };

  return (
    <div className="container-mt-5">
      {/* 上边的大标题和小标题 */}
      <div className='bg-[#f5f9fd]'>
        <div className='px-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8'>
          <h1 className='text-4xl py-4 font-semibold'>PNGからPDFへのコンバーター</h1>
          <p className='text-lg py-4'>無料のオンラインPNGからPDFへのコンバーターを使用して、数秒でPNG画像をPDFファイルに変換し、最速の変換を体験してください。</p>
        </div>
      </div>
      {/* 下边的上传处理操作 */}
      <div className='px-4 py-2 mt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8'>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-9">
            {/* 处理的盒子 */}
            <div className='border bg-white drop-shadow-md border-gray-400 h-52'>
              <div className="row-mt-5">
                <div className="col-lg-3">
                  {photo && (
                    <div className="image-container">
                      <img alt="not found" className="image-fit result" width="200" height="230" src={URL.createObjectURL(photo)} />
                    </div>
                  )}
                </div>

                <div className="col-lg-4">
                  <div className="form-group-mt-5">
                    <label className="file-input">
                      Upload Image
                      <input
                        type="file"
                        name="photo"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={onChangephoto}
                      />
                    </label>
                  </div>
                </div>

                <div className="col-lg">
                  <button className="btn-pdf" onClick={pdfGenerate} disabled={!photo}>
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 p-4">
            <div className='text-gray-400'>
              <span>PNGからPDFへのコンバーターを共有する</span>
            </div>
            <div className='mt-4'>
              <ul className='flex flex-row justify-between'>
                <li><SiYoutubekids className='text-4xl' /></li>
                <li><SiYoutubekids className='text-4xl' /></li>
                <li><SiYoutubekids className='text-4xl' /></li>
                <li><SiYoutubekids className='text-4xl' /></li>
              </ul>
            </div>
            <div className='flex justify-center mt-10'>
              <Button variant="outline">ブックマークに追加</Button>
            </div>
          </div>
        </div>
      </div>

      {/* 下边的howto */}
      <div className=''>
        <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8 lg:py-2">
          <div className='py-6'>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-2xl md:mx-auto">PNGをPDFに変換する方法</h2>
            <p className="text-base text-gray-700 md:text-lg">
              PNGをPDFに変換する方法を知りたいですか？簡単な手順を紹介します！以下のステップに従って、数分でPNGファイルをPDFに変換できます。
            </p>
          </div>
          <div className="grid gap-8 row-gap-5 md:row-gap-8 lg:grid-cols-3">
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
              <div className="flex items-center mb-2">
                <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-purple-800">
                  1
                </p>
                <p className="text-lg font-bold leading-5">ファイルをアップロードする</p>
              </div>
              <p className="text-sm text-gray-900">
                ボタンを押して、PC、クラウド、またはURLからPNGファイルをアップロードします。
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
              <div className="flex items-center mb-2">
                <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-purple-800">
                  2
                </p>
                <p className="text-lg font-bold leading-5">変換に進む</p>
              </div>
              <p className="text-sm text-gray-900">
                アップロードが完了するまで待ちます。「変換」ボタンをクリックします。
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
              <div className="flex items-center mb-2">
                <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-purple-800">
                  2
                </p>
                <p className="text-lg font-bold leading-5">新しいファイルをダウンロード</p>
              </div>
              <p className="text-sm text-gray-900">
                変換されたPDF文書をデバイスにダウンロードします
              </p>
            </div>
          </div>
        </div>



      </div>

      {/* 下边的核心功能 */}
      <div className="relative px-4 py-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8 lg:py-6">
        <div className='py-6'>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-2xl md:mx-auto">PNG から PDF コンバーターの主な機能</h2>
          <p className="text-base text-gray-700 md:text-lg">
            高速・無料のPNGからPDF変換、多機能で使いやすいオンラインコンバーター。安全かつ迅速な操作で、誰でも簡単に利用可能。
          </p>
        </div>
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {
            functionsArr.map((item, index) => (
              <div key={index} className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div className="p-5">
                  <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-100">
                    <img src={`/img/${index + 1}.svg`} alt={`SVG ${index + 1}`} />
                  </div>
                  <p className="mb-2 font-bold">{item.title}</p>
                  <p className="text-sm leading-5 text-gray-900">
                    {item.content}
                  </p>
                </div>
                <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
