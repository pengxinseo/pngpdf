"use client";
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { SiYoutubekids } from "react-icons/si";
import { Button } from "@/components/ui/button"

const Home = () => {
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
      <div className='border border-b-purple-600 bg-[#f5f9fd] px-16 py-6'>
        <h1 className='text-4xl py-4 font-semibold'>PNG to PDF Converter</h1>
        <p className='text-lg py-4'>Convert your PNG images to PDF files in seconds. Fastest conversion with our free online PNG to PDF Converter.</p>
      </div>
      {/* 下边的上传处理操作 */}
      <div className='border border-red-950 px-16'>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-9 p-4">
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
              <span>Share PNG to PDF Converter</span>
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
              <Button variant="outline">Add to Bookmarks</Button>
            </div>
          </div>
        </div>
      </div>

      {/* 下边的howto */}
      <div className=''>




        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                Make history
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="84d09fa9-a544-44bd-88b2-08fdf4cddd38"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#84d09fa9-a544-44bd-88b2-08fdf4cddd38)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative">Let's</span>
              </span>
              launch a rocket into outer space
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque rem aperiam, eaque ipsa quae.
            </p>
          </div>
          <div className="grid gap-8 row-gap-5 md:row-gap-8 lg:grid-cols-3">
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
              <div className="flex items-center mb-2">
                <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-purple-800">
                  2
                </p>
                <p className="text-lg font-bold leading-5">Light it</p>
              </div>
              <p className="text-sm text-gray-900">
                Skate ipsum dolor sit amet, alley oop vert mute-air Colby Carter
                flail 180 berm.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
              <div className="flex items-center mb-2">
                <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-purple-800">
                  2
                </p>
                <p className="text-lg font-bold leading-5">Light it</p>
              </div>
              <p className="text-sm text-gray-900">
                Skate ipsum dolor sit amet, alley oop vert mute-air Colby Carter
                flail 180 berm.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
              <div className="flex items-center mb-2">
                <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-purple-800">
                  2
                </p>
                <p className="text-lg font-bold leading-5">Light it</p>
              </div>
              <p className="text-sm text-gray-900">
                Skate ipsum dolor sit amet, alley oop vert mute-air Colby Carter
                flail 180 berm.
              </p>
            </div>
          </div>
        </div>



      </div>

      {/* 下边的核心功能 */}
      <div className="bg-gray-100">
        <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
            <svg
              viewBox="0 0 88 88"
              className="w-full max-w-screen-xl text-indigo-100"
            >
              <circle fill="currentColor" cx="44" cy="44" r="15.5" />
              <circle
                fillOpacity="0.2"
                fill="currentColor"
                cx="44"
                cy="44"
                r="44"
              />
              <circle
                fillOpacity="0.2"
                fill="currentColor"
                cx="44"
                cy="44"
                r="37.5"
              />
              <circle
                fillOpacity="0.3"
                fill="currentColor"
                cx="44"
                cy="44"
                r="29.5"
              />
              <circle
                fillOpacity="0.3"
                fill="currentColor"
                cx="44"
                cy="44"
                r="22.5"
              />
            </svg>
          </div>
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <p className="mb-2 font-bold">Football Sports</p>
                <p className="text-sm leading-5 text-gray-900">
                  Sed ut perspiciatis unde omnis iste. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <p className="mb-2 font-bold">Bowling Sports</p>
                <p className="text-sm leading-5 text-gray-900">
                  Disrupt inspire and think tank, social entrepreneur but
                  preliminary thinking think tank compelling.
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <p className="mb-2 font-bold">Cycling Sports</p>
                <p className="text-sm leading-5 text-gray-900">
                  A slice of heaven. O for awesome, this chocka full cuzzie is as
                  rip-off as a cracker.
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <p className="mb-2 font-bold">Weight Lifting Sports</p>
                <p className="text-sm leading-5 text-gray-900">
                  Meanwhile, in behind the bicycle shed, Hercules Morse, as big as
                  a horse.
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <p className="mb-2 font-bold">Golf Sports</p>
                <p className="text-sm leading-5 text-gray-900">
                  Disrupt inspire and think tank, social entrepreneur but
                  preliminary thinking think tank compelling.
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <p className="mb-2 font-bold">Hockey Sports</p>
                <p className="text-sm leading-5 text-gray-900">
                  A business big enough that it could be listed on the NASDAQ goes
                  belly up.
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <p className="mb-2 font-bold">Shooting Sports</p>
                <p className="text-sm leading-5 text-gray-900">
                  Lookout flogging bilge rat main sheet bilge water nipper fluke
                  to go on account heave down clap of thunder.
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <p className="mb-2 font-bold">Martial Arts</p>
                <p className="text-sm leading-5 text-gray-900">
                  Webtwo ipsum orkut reddit meebo skype vimeo jajah spock empressr
                  zimbra, mobly napster.
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
