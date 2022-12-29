import React from 'react'
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material'
import {ExpandCircleDown} from '@mui/icons-material'
import logo from '../../assets/onboardittech_logo.png'

function AccordionComponent() {
  return (
    <div>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandCircleDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <img src={logo} style={{width:200}}/>
            </div>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandCircleDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <img src={logo} />
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default AccordionComponent