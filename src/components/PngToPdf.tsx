"use client";
import React, { ReactNode, useState } from 'react';
import jsPDF from 'jspdf';
import { RiFileImageLine } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiDeleteBack2Line } from "react-icons/ri";
import { TbFileDownload, TbDownload } from "react-icons/tb";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { BiSolidCloudUpload } from "react-icons/bi";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import DraggableItem from '@/components/DraggableItem';
import AnimatedButton from '@/components/AnimatedButton';


export default function PngToPdf({ locale, indexLanguageText }:{locale:any, indexLanguageText:any}) {

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
        <div className="useBox mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-12">
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
                                                            <Button className='text-sm bg-gray-500' aria-labelledby={indexLanguageText.download_one_str} size="dowloadBtn" onClick={() => pdfGenerate(index)}> <TbFileDownload size={16} />{indexLanguageText.download_one_str}</Button>
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
                                            <AnimatedButton arialabel={indexLanguageText.download_combine_str} bg={'bg-green-300'} size={'sm'} disabled={hebingTag} onClick={mergePhotosToPdf}>
                                                <TbDownload size={16} className='mr-2' />
                                                {indexLanguageText.download_combine_str}
                                            </AnimatedButton>
                                        </div>
                                        <AnimatedButton arialabel={indexLanguageText.reset_str} className="ml-4" bg={'bg-red-300'} size={'sm'} onClick={resetPhotos}>
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
                                                    id='uploadImg'
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

            </div>
            <Toaster />
        </div>
    )
}