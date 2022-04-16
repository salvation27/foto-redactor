import React, { useState } from "react";
// import Container from "@mui/material/Container";
// import SidebarItem from "./components/SidebarItem/SidebarItem";


import * as htmlToImage from 'html-to-image';
import * as download from 'downloadjs';


import './App.css'
import { defaultBtn,defaultBtn2 } from "./constants"; 
import Button1 from "./components/Button1/Button1";
import UploadBtn from './components/UploadBtn/UploadBtn'
import SliderRange from './components/SliderRange/SliderRange'
import SaveImg from './components/SaveImg/SaveImg'

const App3 = () => {

  const [image,setImage]= useState(null)
  const [options,setOptions]= useState(defaultBtn)
  const [selectedInd,setSelectedInd]= useState(0)


  const [borderOptions,setBorderOptions]= useState(defaultBtn2)
  const [selectedIndBorder,setSelectedIndBorder]= useState(0)



  // активніе опции

  const selectedOptions = options[selectedInd]
  const selectedOptions2 = borderOptions[selectedIndBorder]


  const handelChangeSelectedIndex = (i) => {
    setSelectedInd(i)
  }

  const handelChangeSelectedIndex2 = (i) => {
    setSelectedIndBorder(i)
  }

  const marks = [
    {
      value: selectedOptions.range.min,
      label: String(selectedOptions.range.min)+'%',
    },
    {
      value: selectedOptions.range.max,
      label: String(selectedOptions.range.max)+'%',
    },
  ];



  // добавили в переменную ссілку на загруженную картинку

const handelChangeAddFoto= (e) => {
  const objUrl = URL.createObjectURL(e.target.files[0])
  setImage(objUrl)
}

const getImageStyle = () => {
  const filters = options.map(item=>{
    return `${item.property}(${item.value}${item.unit})`
  })
 
  const filters2 = borderOptions[0].value
  const filters3 = borderOptions[1].value
  return {
    filter:filters.join(' '),
    borderRadius:filters2,
    border:`${filters3}px solid #ccc`,
  }
}

const sliderChange = (e) => {
  setOptions((prev)=>{
    return prev.map((item,i)=>{
      if(i !== selectedInd) return item

      return {...item,value:e.target.value}
    })
  })
}
// для кнопок бордера

const sliderChange2 = (e) => {
  setBorderOptions((prev)=>{
    return prev.map((item,i)=>{
      if(i !== selectedIndBorder) return item
      return {...item,value:e.target.value}
    })
  })
}

// для скачивания картинки в нужном формате и задания имени
const downloadImage = () => {
  htmlToImage.toPng(document.getElementById('image1')).then((dataUrl)=>{
    download(dataUrl,`${Date.now()}.png`)
  })
}

  return (
    <div className="App">
      <div className="app_tools_wrap">
          <div className="app_tools_title">Инструменты</div>
          <div className="app_tools_download_img_btn">
              {/* <label for="file-upload" class="custom-file-upload">
               <i class="fa fa-cloud-upload"></i> Download Image
            </label>
             <input id="file-upload" type="file"/> */}
             <UploadBtn handelChangeAddFoto={handelChangeAddFoto}  />
          </div>
          <div className="app_tools_btn">
            <Button1 selectedInd={selectedInd}  handelChangeSelectedIndex={handelChangeSelectedIndex} options={options} />
            <SliderRange 
            handelSliderChange={sliderChange} 
            value={selectedOptions.value}
            min={selectedOptions.range.min}
            max={selectedOptions.range.max}
            marks={marks}
               />
          </div>
          <div className="app_tools_btn">
            <Button1 selectedInd={selectedIndBorder}  handelChangeSelectedIndex={handelChangeSelectedIndex2} options={borderOptions} />
            <SliderRange 
            handelSliderChange={sliderChange2} 
            value={selectedOptions2.value}
            min={selectedOptions2.range.min}
            max={selectedOptions2.range.max}
               />
          </div>
        
        {
          image && (
            <div className="app_tools_download_img_btn">
             <SaveImg  downloadImage={downloadImage}  />
          </div>
          )
        }

      </div>
      <div className="app_target_wrap">
      <img src={image} id='image1' alt="" style={getImageStyle()} />
        </div>
    </div>
  );
};

export default App3;
