import React,{useState} from 'react'
import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import * as htmlToImage from 'html-to-image';
import * as download from 'downloadjs';
const DEFAULT_OPTIONS = [
  {
    name:'Brightness',
    property:'brightness',
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:'%'
  },
  {
    name:'Contrast',
    property:'contrast',
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:'%'
  },

]


const DEFAULT_OPTIONS2 = 
  {
    name:'Border',
    property:'borderRadius',
    value:0,
    range:{
      min:0,
      max:200
    },
    unit:'px'
  }


const App = () => {

  const [image,setImage] = useState(null)
  const [options,setOptions] = useState(DEFAULT_OPTIONS)
  const [selectOptionsIndex,setSelectOptionsIndex] = useState(0)
  
  const[borderRadius,setBorderRadius]= useState(0)
  const[border,setBorder]= useState(0)

  const handelChangeBorder = (e) => {
    setBorderRadius(e.target.value)
  }
  const handelChangeBorderPx = (e) => {
    setBorder(e.target.value)
  }

  const handleFileChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
  }
  // console.log(image)
  const selectedOptions = options[selectOptionsIndex]

  const handelSliderChange = ({target}) => {
    setOptions(prev=>{
      // console.log(prev)
      return prev.map((option,index)=>{
        if(index !==selectOptionsIndex) return option
        return {...option,value:target.value}
      })
    })
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

const getImageStyle = () => {
  const filters = options.map(item=>{
    return `${item.property}(${item.value}${item.unit})`
  })
  const filters2 = borderRadius
  const filters3 = border
  return {
    filter:filters.join(' '),
    borderRadius:filters2,
    border:`${filters3}px solid red`
  }
}

const downloadImage = () => {
  htmlToImage.toPng(document.getElementById('image1')).then((dataUrl)=>{
    download(dataUrl,`${Date.now()}.png`)
  })
}

  return (
    <Container className='App'>
    <div className="slider">
    {
      options.map((item,i)=>(
        <div key={i} 
        className={i===selectOptionsIndex ? 'active':''} 
        onClick={()=>setSelectOptionsIndex(i)}>{item.name}</div>
      ))
    }
    <button onClick={downloadImage}>SaveImage</button>
    <Slider
    onChange={handelSliderChange}
      valueLabelDisplay="on"
      value={selectedOptions.value}
      marks={marks}
      min={selectedOptions.range.min}
      max={selectedOptions.range.max}
     defaultValue={selectedOptions.value} aria-label="Default" />

<Slider
    onChange={handelChangeBorder}
      valueLabelDisplay="on"
      value={borderRadius.value}
      min={DEFAULT_OPTIONS2.range.min}
      max={DEFAULT_OPTIONS2.range.max}
     defaultValue={borderRadius.value} aria-label="Default" />
     <Slider
    onChange={handelChangeBorderPx}
      valueLabelDisplay="on"
      value={border}
      min={DEFAULT_OPTIONS2.range.min}
      max={DEFAULT_OPTIONS2.range.max}
     defaultValue={border} aria-label="Default" />
    </div>
    
   
        <input type="file" onChange={handleFileChange}  />
        <img src={image} id='image1' alt="" style={getImageStyle()} />
        {/* {
          image && (
            <a  download href={image}>Скачать</a>
          )
        } */}
    </Container>
  )
}

export default App