import React from 'react'
import {Box} from '@mui/material'
import ButtonOutlined from './ButtonOutlined'
import ButtonText from './ButtonText'
import ButtonFilled from './ButtonFilled'
import {ArrowForward, Add, Check} from '@mui/icons-material'
import { BlackColor_100, BlueColor_100, BlueColor_50, TextColor_100, BlackColor_25 } from '../../styles/_variables'


function ButtonsTest() {
  return (
    <>
    <Box sx={{display:'flex', flexDirection:'column'}}>
      <ButtonText value='See All' color = {`${BlueColor_100}`} color__hover = {`${BlackColor_100}`} icon={<ArrowForward />} />
      <ButtonFilled value='Add new' color = {`${TextColor_100}`} backgroundColor={`${BlueColor_100}`} color__hover = {`${BlackColor_100}`} backgroundColor__hover = {`${BlueColor_50}`} icon={<Add />}/>
      <ButtonOutlined value='Mark as paid' color = {`${BlackColor_100}`}  color__hover = {`${BlackColor_100}`} backgroundColor__hover = {`${BlackColor_25}`} borderColor={`${BlackColor_100}`} icon={<Check />} />
    </Box>
    </>
  )
}

export default ButtonsTest
{/* <AssignTechnitianButton_filled />
<AttachBlueprintButton_filled/>
<MarkAsPaidButton_outlined/>
<NewEstimateButton_filled />
<NewInvoiceButton_filled />
<NewTaskButton_filled />
<SeeAllButton_text />
<SaveAsDraftButton_filled /> */}