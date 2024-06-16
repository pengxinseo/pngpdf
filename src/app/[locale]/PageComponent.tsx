"use client";
import React, { ReactNode, useState } from 'react';
import jsPDF from 'jspdf';
import { SiYoutubekids } from "react-icons/si";
import ChangeLangs from "@/components/ChangeLang";
import { RiTwitterXFill, RiFileImageLine, RiInstagramFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiDeleteBack2Line } from "react-icons/ri";
import { TbFileDownload, TbDownload } from "react-icons/tb";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { BiSolidCloudUpload } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { languages } from "@/config";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8 } from "@/components/Icon"

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import DraggableItem from '@/components/DraggableItem';
import HeadInfo from "@/components/HeadInfo";
import AnimatedButton from '@/components/AnimatedButton';


const PageComponent = ({
  locale,
  indexLanguageText
}: { locale: any; indexLanguageText: any }) => {

  //基础的一些参数设置
  const [pageSizeValue, setPageSizeValue] = useState({ width: 0, height: 0 });    //默认是图片的大小
  const [marginSizeValue, setMarginSizeValue] = useState({ value: 0 });          //默认边距是0
  const config = {
    //纸张的常用大小
    pageSize: [
      { name: indexLanguageText.select_auto_str, width: 0, height: 0 },
      { name: 'A4', width: 210, height: 297 },
      { name: 'A1', width: 594, height: 841 },
      { name: 'A2', width: 420, height: 594 },
      { name: 'A3', width: 297, height: 420 },
      { name: 'B1', width: 707, height: 1000 },
      { name: 'B2', width: 500, height: 707 },
      { name: 'C1', width: 102, height: 165 },
      { name: 'C4', width: 229, height: 324 },
      { name: 'DL', width: 110, height: 220 },
      { name: '32K', width: 97, height: 151 }
    ],
    marginSize: [
      { name: indexLanguageText.select_margin_str, value: 0 },
      { name: indexLanguageText.select_xiao_str, value: 10 },
      { name: indexLanguageText.select_zhong_str, value: 30 },
      { name: indexLanguageText.select_da_str, value: 40 }
    ]
  };

  const { toast } = useToast()


  interface Photo { id: string; name: string; file: File; }
  const [photo, setPhoto] = useState<Photo[]>([]);
  const [hebingTag, setHebingTag] = useState(false);

  // 图片上传改渲染lsit
  const onChangephoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map((file) => ({
        id: file.name,
        name: file.name,
        file,
      }));
      if (photo.length + newPhotos.length > 30) {
        toast({
          title: indexLanguageText.upload_tips_title,
          description: indexLanguageText.upload_tips_p,
        })
        return;
      }
      setPhoto(prevPhotos => [...prevPhotos, ...newPhotos]);
    }
  };

  //点击单张下载图片
  const pdfGenerate = (index: number) => {
    if (index < 0 || index >= photo.length) return;

    const photoItem = photo[index].file;
    if (!photoItem) return; // 检查 photoItem 是否存在

    const reader = new FileReader();
    reader.readAsDataURL(photoItem);

    reader.onloadend = function () {
      const imgData = reader.result as string; // 读取文件的 Data URL

      const img = new Image();
      img.src = imgData;

      img.onload = function () {
        const targetWidth = pageSizeValue.width !== 0 ? pageSizeValue.width : img.width;
        const targetHeight = pageSizeValue.height !== 0 ? pageSizeValue.height : img.height;

        // 获取 marginSizeValue 的 value
        const marginValue = marginSizeValue.value;

        // 减去边距后的可用宽高
        const availableWidth = targetWidth - 2 * marginValue;
        const availableHeight = targetHeight - 2 * marginValue;

        const scale = Math.min(availableWidth / img.width, availableHeight / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        const offsetX = marginValue + (availableWidth - scaledWidth) / 2;
        const offsetY = marginValue + (availableHeight - scaledHeight) / 2;

        const doc = new jsPDF({
          orientation: targetWidth > targetHeight ? 'landscape' : 'portrait',
          unit: 'px',
          format: [targetWidth, targetHeight],
        });

        //获取文件不带后缀的名字
        const fileNameWithoutExtension = photoItem.name.replace(/\.[^/.]+$/, "");

        // 直接添加原始图片数据到 PDF 中
        doc.addImage(imgData, 'PNG', offsetX, offsetY, scaledWidth, scaledHeight, undefined, 'FAST');
        doc.save(`${fileNameWithoutExtension}.pdf`);
      };
    };
  };

  //多张png转换成一个PDF
  const mergePhotosToPdf = () => {
    if (photo.length === 0) return; // 如果没有图片，直接返回
    setHebingTag(true);

    const imgDataPromises = photo.map((photoItem) => {
      return new Promise<{ dataURL: string, width: number, height: number }>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(photoItem.file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            resolve({ dataURL: reader.result as string, width: img.width, height: img.height });
          };
        };
        reader.onerror = (error) => reject(error);
      });
    });

    // 等待所有图片加载完成
    Promise.all(imgDataPromises)
      .then((images) => {
        const pdf = new jsPDF(); // 创建一个新的 PDF 文档

        images.forEach(({ dataURL, width, height }, index) => {
          const targetWidth = pageSizeValue.width !== 0 ? pageSizeValue.width : width;
          const targetHeight = pageSizeValue.height !== 0 ? pageSizeValue.height : height;

          // 获取 marginSizeValue 的 value
          const marginValue = marginSizeValue.value;

          // 减去边距后的可用宽高
          const availableWidth = targetWidth - 2 * marginValue;
          const availableHeight = targetHeight - 2 * marginValue;

          const scale = Math.min(availableWidth / width, availableHeight / height);
          const scaledWidth = width * scale;
          const scaledHeight = height * scale;

          const offsetX = marginValue + (availableWidth - scaledWidth) / 2;
          const offsetY = marginValue + (availableHeight - scaledHeight) / 2;

          // 如果不是第一页，添加新页面
          if (index !== 0) {
            pdf.addPage([targetWidth, targetHeight]);
            pdf.internal.pageSize.width = targetWidth;
            pdf.internal.pageSize.height = targetHeight;
          } else {
            // 更新第一页的页面尺寸
            pdf.setPage(1);
            pdf.internal.pageSize.width = targetWidth;
            pdf.internal.pageSize.height = targetHeight;
          }

          pdf.addImage(dataURL, 'PNG', offsetX, offsetY, scaledWidth, scaledHeight);

          // Save the PDF after the last image is added
          if (index === images.length - 1) {
            pdf.save(`mergedPhotos_${new Date().toISOString()}.pdf`);
            setHebingTag(false);
          }
        });
      })
      .catch(error => {
        setHebingTag(false);
        console.error('Error merging photos to PDF:', error);
      });
  };

  //清除所有图片
  const resetPhotos = () => {
    setPhoto([]);
  };

  // 滑动切换位置的操作
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPhoto((photo) => {
        const oldIndex = photo.findIndex(item => item.id === active.id);
        const newIndex = photo.findIndex(item => item.id === over.id);
        return arrayMove(photo, oldIndex, newIndex);
      });
    }
  };

  //移除列表中的图片
  const handleDelete = (id: any) => {
    setPhoto((photo) => photo.filter(item => item.id !== id));
  };

  //下拉框选择页面大小的修改值
  const handleSelectChange = (selectedName: any) => {
    const selectedPageSize = config.pageSize.find(item => item.name === selectedName);
    if (selectedPageSize) {
      setPageSizeValue({ width: selectedPageSize.width, height: selectedPageSize.height });
    }

  };

  //下拉选择边距的值大小
  const handleMarginChange = (selectedName: any) => {
    const selectMargin = config.marginSize.find(item => item.name === selectedName);
    if (selectMargin) {
      setMarginSizeValue({ value: selectMargin.value });
    }
  }

  return (
    <>
      <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        locale={locale}
        page={""}
      />
      <div className="container-mt-5">
        {/* 上边的大标题和小标题 */}
        <div className='bg-[#f5f9fd]'>
          <div className='px-4 py-2 mx-auto  md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8'>
            <div className='flex flex-col sm:flex-col md:flex-row xl:flex-row lg:flex-row items-start sm:items-center md:items-center xl:items-center lg:items-center'>
              <h1 className='flex flex-1 text-3xl md:text-4xl lg:text-4xl xl:text-4xl py-4 font-semibold'>{indexLanguageText.h1_text}</h1>
              <div className='flex w-[134px]'>
                <ChangeLangs locale={locale} page={""} />
              </div>
            </div>
            <p className='text-base md:text-lg lg:text-lg xl:text-lg py-4'>{indexLanguageText.h1_p}</p>
          </div>
        </div>
        {/* 下边的上传处理操作 */}
        <div className='px-4 py-2 mt-2 mx-auto md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8'>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-9">
              {/* 选项工具 */}
              <div className='flex py-2 justify-end'>
                {/* 纸张大小 */}
                <div>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-[142px] h-[30px]">
                      <SelectValue placeholder={indexLanguageText.paperPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          config.pageSize.map((item, index) => (
                            <SelectItem key={index} value={item.name}>
                              <span className='font-semibold mr-1.5'>{item.name}</span>
                              {index !== 0 && (
                                <span className='text-gray-500'>{`(${item.width}×${item.height})`}</span>
                              )}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* 边距 */}
                <div className='ml-2'>
                  <Select onValueChange={handleMarginChange}>
                    <SelectTrigger className="w-[120px] h-[30px]">
                      <SelectValue placeholder={indexLanguageText.marginPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          config.marginSize.map((item, index) => (
                            <SelectItem key={index} value={item.name}><span className='mr-1.5 font-semibold'>{item.name}</span><span className='text-gray-500'>{`(${item.value})`}</span></SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

              </div>
              {/* 上传图片 */}
              <div className='border-2 border-dashed rounded-sm bg-white border-gray-300'>
                <div className="p-2">
                  {//如果存在图片就显示列表
                    photo.length > 0 && (
                      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={photo} strategy={verticalListSortingStrategy}>
                          {photo.map((p, index) => (
                            <DraggableItem key={p.id} id={p.id}>
                              <div key={index} className="py-1.5 photo-container grid grid-cols-3 items-center  gap-2 border-b cursor-move  border-gray-500">
                                <div className="flex items-center col-span-1 overflow-hidden whitespace-nowrap">
                                  <RiFileImageLine size={17} className="flex-shrink-0" />
                                  <span className="ml-2 overflow-hidden text-ellipsis">{p.name}</span>
                                </div>
                                <div className="flex justify-center col-span-1">
                                  <GiCheckMark />
                                </div>
                                <div className="flex items-center justify-end col-span-1">
                                  <Button className='text-sm bg-gray-500' size="dowloadBtn" onClick={() => pdfGenerate(index)}> <TbFileDownload size={16} />{indexLanguageText.download_one_str}</Button>
                                  <RiDeleteBack2Line size={22} className=' text-gray-700 hover:text-red-700 ml-2 cursor-pointer' onClick={() => handleDelete(p.id)} />
                                </div>
                              </div>
                            </DraggableItem>
                          ))}
                        </SortableContext>
                      </DndContext>
                    )
                  }

                  { //如果图片大于2张的时候 则显示合并按钮
                    photo.length > 1 && (
                      <div className='flex justify-end pt-3 pb-2'>
                        <div className='relative'>
                          <div className='rounded-full z-50 text-sm  text-center w-5 h-5 absolute -top-2 -right-2  bg-black text-white font-semibold'>{photo.length}</div>
                          <AnimatedButton bg={'bg-green-300'}  size={'sm'} disabled={hebingTag} onClick={mergePhotosToPdf}>
                            <TbDownload size={16} className='mr-2' />
                            {indexLanguageText.download_combine_str}
                          </AnimatedButton>
                        </div>
                        <AnimatedButton className="ml-4" bg={'bg-red-300'} size={'sm'} onClick={resetPhotos}>
                          <AiTwotoneDelete size={16} className='mr-2' />{indexLanguageText.reset_str}
                        </AnimatedButton>
                      </div>
                    )
                  }

                  { // 如果 photo 数组为空，则显示上传按钮
                    photo.length === 0 && (
                      <div className="col-lg-4 flex flex-col items-cente">
                        <div className="form-group">
                          <label className="file-input py-10  h-full w-full flex flex-col items-center cursor-pointer">
                            <BiSolidCloudUpload className=" text-gray-500 w-12 h-12 mb-2" />
                            <span className="text-gray-700">{indexLanguageText.uploadImgTips}</span>
                            <Input
                              type="file"
                              name="photo"
                              onChange={onChangephoto}
                              multiple
                              accept="image/png, image/jpeg, image/jpg"
                              className="shadcn-input hidden"
                            />
                          </label>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>

            <div className="md:col-span-3 p-4">
              <div className='text-black'>
                <span>{indexLanguageText.shareTips}</span>
              </div>
              <div className='mt-4'>
                <ul className='flex flex-row justify-between'>
                  <li>
                    <a href="https://www.youtube.com" target='_blank' rel="nofollow" aria-label='ユーチューブにジャンプ' className='text-gray-500 hover:text-[#FF0000]'>
                      <SiYoutubekids className='text-4xl' />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/intent/tweet?url=https://pngpdf.net&text=%E6%88%91%E3%81%AF%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%A7%E7%84%A1%E6%96%99%E3%81%99%E3%82%8BPNG%E3%82%92PDF%E3%81%AB%E5%A4%89%E6%8F%9B%E3%81%99%E3%82%8B%E3%82%A6%E3%82%A7%E3%83%96%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AB%E6%89%BF%E3%81%A3%E3%81%A6%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82%E5%A4%89%E6%8F%9B%E9%80%9F%E5%BA%A6%E3%81%AF%E9%9D%9E%E7%B5%84%E7%9A%84%E3%81%AB%E6%95%B7%E3%81%8F%E3%80%81%E3%81%A8%E3%81%BE%E3%81%8B%E3%81%A0%E3%81%8F%E9%87%91%E3%81%AE%E3%81%8D%E3%81%AE%E3%82%88%E3%82%8A%E3%81%8E%E3%81%8B%E3%81%8C%E3%81%84%E3%81%AE%E3%81%AE%E3%81%8C%E3%81%99%E3%81%AE%E3%81%8C%E3%80%81)" aria-label='ツイッターにジャンプ' target='_blank' rel="nofollow" className='text-gray-500 hover:text-black'>
                      <RiTwitterXFill className='text-4xl' />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" aria-label='インスタグラムにジャンプ' target='_blank' rel="nofollow" className='text-gray-500 hover:text-[#e93980]'>
                      <RiInstagramFill className='text-4xl' />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://pngpdf.net" aria-label='フェイスブックにジャンプ' target='_blank' rel="nofollow" className='text-gray-500 hover:text-[#4e8deb]'>
                      <FaFacebook className='text-4xl' />
                    </a>
                  </li>
                </ul>
              </div>
              <div className='flex justify-center mt-10'>
                <AnimatedButton isBorder bg={'bg-white'}   onClick={() => {
                  toast({
                    description: indexLanguageText.sharemodel_str,
                  })
                }}>
                  {indexLanguageText.shareButtonText}
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>

        {/* 下边的使用步骤 */}
        <div>
          <div className="px-4 py-0 mx-auto md:max-w-full sm:py-2 lg:max-w-screen-xl  md:px-12 lg:px-8 lg:pt-12">
            <div className='pb-6'>
              <h2 className="text-xl md:text-2xl xl:text-2xl lg:text-3xl  font-bold text-gray-900 sm:text-2xl md:mx-auto">{indexLanguageText.buzhou_text_h2}</h2>
              <p className="text-base text-gray-700 md:text-lg">
                {indexLanguageText.buzhou_text_p}
              </p>
            </div>
            <div className="grid gap-8 row-gap-5 md:row-gap-8 lg:grid-cols-3">
              <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
                <div className="flex items-center mb-2">
                  <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
                      <defs>
                        <style>
                          {`.cls-1{fill:#231f20;}`}
                        </style>
                      </defs>
                      <title>scribble final version</title>
                      <g id="Layer_1" data-name="Layer 1">
                        <path className="cls-1" d="M42.14,85.81a35.13,35.13,0,0,1-15.92-5.93A32.92,32.92,0,0,1,20,74.07,34.8,34.8,0,0,1,15.33,67a41.49,41.49,0,0,1-3.71-11.49,39.52,39.52,0,0,1,2-21,36,36,0,0,1,13-16.46A36.83,36.83,0,0,1,44.07,11.6a31.26,31.26,0,0,1,11.91,1,29.62,29.62,0,0,1,2.85.92l1.35.64c.45.22.87.48,1.31.72l1.28.74c.42.26.82.55,1.22.82l1.21.83c.39.29.77.6,1.15.9,1.87,1.55,1.25,1.81-.9,1.6-1-.14-2.56-.24-4.25-.4-.86,0-1.78-.07-2.71-.15-.48,0-.94-.06-1.44,0s-.92-.23-1.4-.31a32.06,32.06,0,0,0-5-.73l-1.25-.07c-.42,0-.84,0-1.26,0a23.15,23.15,0,0,0-2.5,0,29.23,29.23,0,0,0-9.75,2,31.13,31.13,0,0,0-4.54,2.2,31.55,31.55,0,0,0-4.12,3,30.3,30.3,0,0,0-6.64,7.89,29,29,0,0,0-3.8,12.21A41.42,41.42,0,0,0,18,58.51a33,33,0,0,0,2.51,6.76,26.2,26.2,0,0,0,4,5.93,26.91,26.91,0,0,0,12,7.52,35.29,35.29,0,0,0,17.83.42A45.35,45.35,0,0,0,67.19,74a32,32,0,0,0,5.47-4,18.33,18.33,0,0,0,2.22-2.45l1-1.31c.29-.46.54-1,.82-1.43a21.13,21.13,0,0,0,2.57-9.64,28.74,28.74,0,0,0-1.53-9.82c-.5-1.38-1-2.71-1.64-4-1.09-2.5-2-4-2.32-5.33a7.27,7.27,0,0,1-.22-1.75,5.31,5.31,0,0,1,.35-1.65,12.2,12.2,0,0,1,.57-1.55c.42-.74,1.25-.83,2.45-.26a11.12,11.12,0,0,1,4.17,3.85,33.49,33.49,0,0,1,4.81,10.16,32.55,32.55,0,0,1,.9,11.73A29.34,29.34,0,0,1,79.2,73.19L77,75.32a9.26,9.26,0,0,1-1.2,1l-1.23.9a35,35,0,0,1-3.66,2.34c-1.25.66-2.48,1.36-3.77,2a50.88,50.88,0,0,1-8,3,45,45,0,0,1-17,1.5Z" />
                        <text x="45" y="45" transform="rotate(12,-34,0)" fill="#231f20" fontSize="50" fontFamily="Arial" fontWeight="bold">1</text>
                      </g>
                    </svg>
                  </p>
                  <p className="text-lg font-bold leading-5">{indexLanguageText.buzhou_1_h3}</p>
                </div>
                <p className="text-sm text-gray-900">
                  {indexLanguageText.buzhou_1_p}
                </p>
              </div>
              <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
                <div className="flex items-center mb-2">
                  <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
                      <defs>
                        <style>
                          {`.cls-1{fill:#231f20;}`}
                        </style>
                      </defs>
                      <title>scribble final version</title>
                      <g id="Layer_1" data-name="Layer 1">
                        <path className="cls-1" d="M42.14,85.81a35.13,35.13,0,0,1-15.92-5.93A32.92,32.92,0,0,1,20,74.07,34.8,34.8,0,0,1,15.33,67a41.49,41.49,0,0,1-3.71-11.49,39.52,39.52,0,0,1,2-21,36,36,0,0,1,13-16.46A36.83,36.83,0,0,1,44.07,11.6a31.26,31.26,0,0,1,11.91,1,29.62,29.62,0,0,1,2.85.92l1.35.64c.45.22.87.48,1.31.72l1.28.74c.42.26.82.55,1.22.82l1.21.83c.39.29.77.6,1.15.9,1.87,1.55,1.25,1.81-.9,1.6-1-.14-2.56-.24-4.25-.4-.86,0-1.78-.07-2.71-.15-.48,0-.94-.06-1.44,0s-.92-.23-1.4-.31a32.06,32.06,0,0,0-5-.73l-1.25-.07c-.42,0-.84,0-1.26,0a23.15,23.15,0,0,0-2.5,0,29.23,29.23,0,0,0-9.75,2,31.13,31.13,0,0,0-4.54,2.2,31.55,31.55,0,0,0-4.12,3,30.3,30.3,0,0,0-6.64,7.89,29,29,0,0,0-3.8,12.21A41.42,41.42,0,0,0,18,58.51a33,33,0,0,0,2.51,6.76,26.2,26.2,0,0,0,4,5.93,26.91,26.91,0,0,0,12,7.52,35.29,35.29,0,0,0,17.83.42A45.35,45.35,0,0,0,67.19,74a32,32,0,0,0,5.47-4,18.33,18.33,0,0,0,2.22-2.45l1-1.31c.29-.46.54-1,.82-1.43a21.13,21.13,0,0,0,2.57-9.64,28.74,28.74,0,0,0-1.53-9.82c-.5-1.38-1-2.71-1.64-4-1.09-2.5-2-4-2.32-5.33a7.27,7.27,0,0,1-.22-1.75,5.31,5.31,0,0,1,.35-1.65,12.2,12.2,0,0,1,.57-1.55c.42-.74,1.25-.83,2.45-.26a11.12,11.12,0,0,1,4.17,3.85,33.49,33.49,0,0,1,4.81,10.16,32.55,32.55,0,0,1,.9,11.73A29.34,29.34,0,0,1,79.2,73.19L77,75.32a9.26,9.26,0,0,1-1.2,1l-1.23.9a35,35,0,0,1-3.66,2.34c-1.25.66-2.48,1.36-3.77,2a50.88,50.88,0,0,1-8,3,45,45,0,0,1-17,1.5Z" />
                        <text x="45" y="45" transform="rotate(12,-34,0)" fill="#231f20" fontSize="50" fontFamily="Arial" fontWeight="bold">2</text>
                      </g>
                    </svg>
                  </p>
                  <p className="text-lg font-bold leading-5">{indexLanguageText.buzhou_2_h3}</p>
                </div>
                <p className="text-sm text-gray-900">
                  {indexLanguageText.buzhou_2_p}
                </p>
              </div>
              <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
                <div className="flex items-center mb-2">
                  <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
                      <defs>
                        <style>
                          {`.cls-1{fill:#231f20;}`}
                        </style>
                      </defs>
                      <title>scribble final version</title>
                      <g id="Layer_1" data-name="Layer 1">
                        <path className="cls-1" d="M42.14,85.81a35.13,35.13,0,0,1-15.92-5.93A32.92,32.92,0,0,1,20,74.07,34.8,34.8,0,0,1,15.33,67a41.49,41.49,0,0,1-3.71-11.49,39.52,39.52,0,0,1,2-21,36,36,0,0,1,13-16.46A36.83,36.83,0,0,1,44.07,11.6a31.26,31.26,0,0,1,11.91,1,29.62,29.62,0,0,1,2.85.92l1.35.64c.45.22.87.48,1.31.72l1.28.74c.42.26.82.55,1.22.82l1.21.83c.39.29.77.6,1.15.9,1.87,1.55,1.25,1.81-.9,1.6-1-.14-2.56-.24-4.25-.4-.86,0-1.78-.07-2.71-.15-.48,0-.94-.06-1.44,0s-.92-.23-1.4-.31a32.06,32.06,0,0,0-5-.73l-1.25-.07c-.42,0-.84,0-1.26,0a23.15,23.15,0,0,0-2.5,0,29.23,29.23,0,0,0-9.75,2,31.13,31.13,0,0,0-4.54,2.2,31.55,31.55,0,0,0-4.12,3,30.3,30.3,0,0,0-6.64,7.89,29,29,0,0,0-3.8,12.21A41.42,41.42,0,0,0,18,58.51a33,33,0,0,0,2.51,6.76,26.2,26.2,0,0,0,4,5.93,26.91,26.91,0,0,0,12,7.52,35.29,35.29,0,0,0,17.83.42A45.35,45.35,0,0,0,67.19,74a32,32,0,0,0,5.47-4,18.33,18.33,0,0,0,2.22-2.45l1-1.31c.29-.46.54-1,.82-1.43a21.13,21.13,0,0,0,2.57-9.64,28.74,28.74,0,0,0-1.53-9.82c-.5-1.38-1-2.71-1.64-4-1.09-2.5-2-4-2.32-5.33a7.27,7.27,0,0,1-.22-1.75,5.31,5.31,0,0,1,.35-1.65,12.2,12.2,0,0,1,.57-1.55c.42-.74,1.25-.83,2.45-.26a11.12,11.12,0,0,1,4.17,3.85,33.49,33.49,0,0,1,4.81,10.16,32.55,32.55,0,0,1,.9,11.73A29.34,29.34,0,0,1,79.2,73.19L77,75.32a9.26,9.26,0,0,1-1.2,1l-1.23.9a35,35,0,0,1-3.66,2.34c-1.25.66-2.48,1.36-3.77,2a50.88,50.88,0,0,1-8,3,45,45,0,0,1-17,1.5Z" />
                        <text x="45" y="45" transform="rotate(12,-34,0)" fill="#231f20" fontSize="50" fontFamily="Arial" fontWeight="bold">3</text>
                      </g>
                    </svg>
                  </p>
                  <p className="text-lg font-bold leading-5">{indexLanguageText.buzhou_3_h3}</p>
                </div>
                <p className="text-sm text-gray-900">
                  {indexLanguageText.buzhou_3_p}
                </p>
              </div>
            </div>
          </div>



        </div>

        {/* 下边的核心功能 */}
        <div className="relative px-4 py-6 mx-auto md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8 lg:py-6">
          <div className='py-6'>
            <h2 className="text-xl md:text-2xl xl:text-2xl lg:text-3xl  font-bold text-gray-900 sm:text-2xl md:mx-auto">{indexLanguageText.gongneng_text_h2}</h2>
            <p className="text-base text-gray-700 md:text-lg">
              {indexLanguageText.gongneng_text_p}
            </p>
          </div>
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1 */}
            <div className="flex flex-col border justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-100">
                  <Icon1 />
                </div>
                <p className="mb-2 font-bold">{indexLanguageText.gongneng_h3_1}</p>
                <p className="text-sm leading-5 text-gray-900">
                  {indexLanguageText.gongneng_p_1}
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            {/* 2 */}
            <div className="flex flex-col border justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-100">
                  <Icon2 />
                </div>
                <p className="mb-2 font-bold">{indexLanguageText.gongneng_h3_2}</p>
                <p className="text-sm leading-5 text-gray-900">
                  {indexLanguageText.gongneng_p_2}
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            {/* 3 */}
            <div className="flex flex-col border justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-100">
                  <Icon3 />
                </div>
                <p className="mb-2 font-bold">{indexLanguageText.gongneng_h3_3}</p>
                <p className="text-sm leading-5 text-gray-900">
                  {indexLanguageText.gongneng_p_3}
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            {/* 4 */}
            <div className="flex flex-col border justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-100">
                  <Icon4 />
                </div>
                <p className="mb-2 font-bold">{indexLanguageText.gongneng_h3_4}</p>
                <p className="text-sm leading-5 text-gray-900">
                  {indexLanguageText.gongneng_p_4}
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            {/* 5 */}
            <div className="flex flex-col border justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-100">
                  <Icon5 />
                </div>
                <p className="mb-2 font-bold">{indexLanguageText.gongneng_h3_5}</p>
                <p className="text-sm leading-5 text-gray-900">
                  {indexLanguageText.gongneng_p_5}
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            {/* 6 */}
            <div className="flex flex-col border justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-100">
                  <Icon6 />
                </div>
                <p className="mb-2 font-bold">{indexLanguageText.gongneng_h3_6}</p>
                <p className="text-sm leading-5 text-gray-900">
                  {indexLanguageText.gongneng_p_6}
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            {/* 7 */}
            <div className="flex flex-col border justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-100">
                  <Icon7 />
                </div>
                <p className="mb-2 font-bold">{indexLanguageText.gongneng_h3_7}</p>
                <p className="text-sm leading-5 text-gray-900">
                  {indexLanguageText.gongneng_p_7}
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>
            {/* 8 */}
            <div className="flex flex-col border justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-100">
                  <Icon8 />
                </div>
                <p className="mb-2 font-bold">{indexLanguageText.gongneng_h3_8}</p>
                <p className="text-sm leading-5 text-gray-900">
                  {indexLanguageText.gongneng_p_8}
                </p>
              </div>
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            </div>

          </div>
        </div>

        {/* 下面FAQ板块 */}
        <div className='flex flex-col px-4 py-6 mx-auto  md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8 lg:py-6'>
          <div>
            <h2 className="text-xl md:text-2xl xl:text-2xl lg:text-3xl  font-bold text-gray-900 sm:text-2xl md:mx-auto">{indexLanguageText.faq_p_h2}</h2>
          </div>
          <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl">
              <div className="grid mt-8 text-left md:gap-16 dark:border-gray-700 md:grid-cols-3">
                {/* FAQ 1 */}
                <div className="mb-4 lg:mb-0 xl:mb-0 md:mb-0">
                  <h3 className="flex items-center mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {indexLanguageText.faq_h3_1}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{indexLanguageText.faq_p_1}</p>
                </div>
                {/* FAQ 2 */}
                <div className="mb-4 lg:mb-0 xl:mb-0 md:mb-0">
                  <h3 className="flex items-center mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {indexLanguageText.faq_h3_2}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{indexLanguageText.faq_p_2}</p>
                </div>
                {/* FAQ 3 */}
                <div className="mb-4 lg:mb-0 xl:mb-0 md:mb-0">
                  <h3 className="flex items-center mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {indexLanguageText.faq_h3_3}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{indexLanguageText.faq_p_3}</p>
                </div>
                {/* FAQ 4 */}
                <div className="mb-4 lg:mb-0 xl:mb-0 md:mb-0">
                  <h3 className="flex items-center mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {indexLanguageText.faq_h3_4}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{indexLanguageText.faq_p_4}</p>
                </div>
                {/* FAQ 5 */}
                <div className="mb-4 lg:mb-0 xl:mb-0 md:mb-0">
                  <h3 className="flex items-center mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {indexLanguageText.faq_h3_5}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{indexLanguageText.faq_p_5}</p>
                </div>
                {/* FAQ 6 */}
                <div className="mb-4 lg:mb-0 xl:mb-0 md:mb-0">
                  <h3 className="flex items-center mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {indexLanguageText.faq_h3_6}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{indexLanguageText.faq_p_6}</p>
                </div>
              </div>
            </div>

          </section>
        </div>
        <Toaster />
      </div >
      <footer className="flex flex-col px-4 py-0 mx-auto  md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8 lg:py-5">
        <div className='flex'>
          <ul className='flex flex-wrap text-gray-500 text-sm justify-between pb-3 pt-1'>
            {languages.map((item, index) => (
              <li key={index} className='mr-4 mt-2'>
                <a className=' hover:underline hover:text-gray-700' href={item.lang === 'ja' ? 'https://pngpdf.net' : `https://pngpdf.net/${item.lang}`}>
                  {item.language}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://pngpdf.net" className="hover:underline">pngpdf.net™</a>. {indexLanguageText.banquan_text}{indexLanguageText.lianxiyouxiang}: <a href="mailto:yijunpengxin@gamil.com">yijunpengxin@gamil.com</a>
          </span>
        </div>
      </footer>
    </>
  );
};


export default PageComponent;

