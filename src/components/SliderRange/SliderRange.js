import React from 'react'
import Slider from '@mui/material/Slider';

const SliderRange = ({handelSliderChange,value,min,max,marks}) => {
  return (
    <Slider 
    className='slider'
     onChange={handelSliderChange}
      valueLabelDisplay="on"
      value={value}
      marks={marks}
      min={min}
      max={max}
     defaultValue={value}
      
       />
  )
}

export default SliderRange