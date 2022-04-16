import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
const Button1 = ({options,selectedInd,handelChangeSelectedIndex}) => {
  return (
    <div className='button_wrap'>
        <ButtonGroup size="small" variant="contained" aria-label="outlined primary button group">
        {
            options.map((item,i)=><Button  key={i} onClick={()=>handelChangeSelectedIndex(i)} className={selectedInd===i ? 'active': ''}>{item.name}</Button>)
        }
        </ButtonGroup>
    </div>
  )
}

export default Button1