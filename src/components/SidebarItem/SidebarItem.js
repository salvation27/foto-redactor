import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
const SidebarItem = ({defaultBtn,handelChangeSelectedIndex,selectedInd}) => {
  return (
    
<ButtonGroup variant="contained" size="large" aria-label="outlined primary button group">
    {
    defaultBtn.map((item,i)=><Button color="secondary" className={selectedInd===i ? 'active': ''}   key={i} onClick={()=>handelChangeSelectedIndex(i)}>{item.name}</Button>)
    }
</ButtonGroup>

  )
}

export default SidebarItem