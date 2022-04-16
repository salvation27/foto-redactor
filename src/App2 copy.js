import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Container from "@mui/material/Container";
import SidebarItem from "./components/SidebarItem/SidebarItem";
import { defaultBtn } from "./constants"; 
import * as htmlToImage from 'html-to-image';
import * as download from 'downloadjs';

const App2 = () => {

  const [image,setImage]= useState(null)
  const [options,setOptions]= useState(defaultBtn)
  const [selectedInd,setSelectedInd]= useState(0)


  // активніе опции

  const selectedOptions = options[selectedInd]

  const handelChangeSelectedIndex = (i) => {
    setSelectedInd(i)
  }



  // добавили в переменную ссілку на загруженную картинку
const handelChangeAddFoto= (e) => {
  console.log(e.target.files[0])
  const objUrl = URL.createObjectURL(e.target.files[0])
  setImage(objUrl)
}

const applyFilters = () => {
  const filters = options.map(item=>{
    return `${item.property}(${item.value}${item.unit})`
  })
  return {
    filter:filters.join(' '),
    backgroundImage: `url(${image})`,
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

// для скачивания картинки в нужном формате и задания имени
const downloadImage = () => {
  htmlToImage.toPng(document.getElementById('image')).then((dataUrl)=>{
    download(dataUrl,`${Date.now()}.png`)
  })
}


  return (
    <Container className="App">
      <div className="redactor_wrap">
        <div className="redactor_btn">
          <SidebarItem selectedInd={selectedInd} handelChangeSelectedIndex={handelChangeSelectedIndex}   defaultBtn={options} />
        </div>
        <button onClick={downloadImage}>Download</button>
        <div className="redactor_range">
         <Slider
           min={selectedOptions.range.min} 
           max={selectedOptions.range.max}
           value={selectedOptions.value}
           onChange={sliderChange}
            />
        </div>
        <div className="redactor_img">
        <input type="file" accept="image/*" onChange={handelChangeAddFoto} />
        <div id="image" style={applyFilters()}></div>
        </div>
      </div>
    </Container>
  );
};

export default App2;
