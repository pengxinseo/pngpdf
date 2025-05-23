import { getTranslations } from "next-intl/server";

export const getIndexLanguageText = async () => {
  const tIndex = await getTranslations('IndexPage');
  return {
    title: tIndex('title'),
    description: tIndex('description'),
    h1_text:tIndex('h1_text'),
    h1_p:tIndex('h1_p'),
    paperPlaceholder:tIndex('paperPlaceholder'),
    marginPlaceholder:tIndex('marginPlaceholder'),
    select_auto_str:tIndex('select_auto_str'),
    uploadImgTips:tIndex('uploadImgTips'),
    shareTips:tIndex('shareTips'),
    shareButtonText:tIndex('shareButtonText'),
    buzhou_text_h2:tIndex('buzhou_text_h2'),
    buzhou_text_p:tIndex('buzhou_text_p'),
    buzhou_1_h3:tIndex('buzhou_1_h3'),
    buzhou_2_h3:tIndex('buzhou_2_h3'),
    buzhou_3_h3:tIndex('buzhou_3_h3'),
    buzhou_1_p:tIndex('buzhou_1_p'),
    buzhou_2_p:tIndex('buzhou_2_p'),
    buzhou_3_p:tIndex('buzhou_3_p'),
    gongneng_text_h2:tIndex('gongneng_text_h2'),
    gongneng_text_p:tIndex('gongneng_text_p'),
    gongneng_h3_1:tIndex('gongneng_h3_1'),
    gongneng_h3_2:tIndex('gongneng_h3_2'),
    gongneng_h3_3:tIndex('gongneng_h3_3'),
    gongneng_h3_4:tIndex('gongneng_h3_4'),
    gongneng_h3_5:tIndex('gongneng_h3_5'),
    gongneng_h3_6:tIndex('gongneng_h3_6'),
    gongneng_h3_7:tIndex('gongneng_h3_7'),
    gongneng_h3_8:tIndex('gongneng_h3_8'),
    gongneng_p_1:tIndex('gongneng_p_1'),
    gongneng_p_2:tIndex('gongneng_p_2'),
    gongneng_p_3:tIndex('gongneng_p_3'),
    gongneng_p_4:tIndex('gongneng_p_4'),
    gongneng_p_5:tIndex('gongneng_p_5'),
    gongneng_p_6:tIndex('gongneng_p_6'),
    gongneng_p_7:tIndex('gongneng_p_7'),
    gongneng_p_8:tIndex('gongneng_p_8'),
    faq_p_h2:tIndex('faq_p_h2'),
    faq_h3_1:tIndex('faq_h3_1'),
    faq_h3_2:tIndex('faq_h3_2'),
    faq_h3_3:tIndex('faq_h3_3'),
    faq_h3_4:tIndex('faq_h3_4'),
    faq_h3_5:tIndex('faq_h3_5'),
    faq_h3_6:tIndex('faq_h3_6'),
    faq_p_1:tIndex('faq_p_1'),
    faq_p_2:tIndex('faq_p_2'),
    faq_p_3:tIndex('faq_p_3'),
    faq_p_4:tIndex('faq_p_4'),
    faq_p_5:tIndex('faq_p_5'),
    faq_p_6:tIndex('faq_p_6'),
    select_margin_str:tIndex('select_margin_str'),
    select_xiao_str:tIndex('select_xiao_str'),
    select_zhong_str:tIndex('select_zhong_str'),
    select_da_str:tIndex('select_da_str'),
    sharemodel_str:tIndex('sharemodel_str'),
    download_one_str:tIndex('download_one_str'),
    download_combine_str:tIndex('download_combine_str'),
    reset_str:tIndex('reset_str'),
    upload_tips_title:tIndex('upload_tips_title'),
    upload_tips_p:tIndex('upload_tips_p')
  };
}

export const getFooterLanguageText = async () => {
  const tFooter = await getTranslations('Footer')
  return {
    banquan_text:tFooter('banquan_text'),
    lianxiyouxiang:tFooter('lianxiyouxiang'),
  }
}

export const getBlogLanguageText = async () => {
  const tBlog = await getTranslations('Blog');
  return {
    mulu_str: tBlog('mulu_str'),
    back_str: tBlog('back_str')
  }
}