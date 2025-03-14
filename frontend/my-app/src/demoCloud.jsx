import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const Demo = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'djm2auk8o' } });
  
  // Use this sample image or upload your own via the Media Explorer
  // const img = cld
  //       .image('cld-sample-5')
  //       .format('auto') // Optimize delivery by resizing and Demolying auto-format and auto-quality
  //       .quality('auto')
  //       .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio


  const img = "https://i.ytimg.com/vi/t0Q2otsqC4I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBgbkdHwq9v7C3DObsH54uBSf8hiw"

  return (



  <AdvancedImage cldImg={img}  />

);
};

export default Demo