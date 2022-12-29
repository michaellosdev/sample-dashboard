import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, usePDF} from '@react-pdf/renderer'
import { BlackColor_75, BlueColor_100, TextColor_100 } from '../../../styles/_variables';

const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      textColor: "black",
      marginTop: '30px',
      paddingBottom:'50px'
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: '87%', //the pdf viewer will take up all of the width and height
      height: '100vh',
      marginLeft:'13%'
    },
  });

function PdfRenderTech({item}) {
    console.log(item.customItems)

    // let whatever = item.customItems.map((im ,index) => {

    //   return console.log('hi')
    // })

    // console.log(whatever)

  return (
    <PDFViewer style={styles.viewer}>
        <Document style={styles.viewer}>
            <Page size="A4" style={styles.page}>
                <View  style={{margin: '20px', textAlign:'right'}}>
                    <Text style={{textAlign:'right',marginBottom:'px', fontSize:'40px' }}>{!item.estimate ? `INVOICE` : `ESTIMATE`}</Text>
                    <Text style={{textAlign:'right',marginBottom:'20px' }}>{!item.estimate ? `INV-${item.invoice}` : `EST-${item.estimate}`}</Text>
                    <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'20px'}}>
                        <View style={{width:'50%', textAlign:'center'}}>
                        <Text style={{margin:"5px", textAlign:'left' }}>{!item.estimate ? `INVOICE FROM` : `ESTIMATE FROM`}</Text>
                            <Text style={{margin:"5px", textAlign:'left', fontSize:'12px', fontWeight:'bold'}}>ONBOARD IT TECH INC</Text>
                            <Text style={{margin:"5px", textAlign:'left', fontSize:'12px'}}>Lic#1039864</Text>
                            <Text style={{margin:"5px", textAlign:'left', fontSize:'12px'}}>14431 Ventura Blvd #257</Text>
                            <Text style={{margin:"5px",textAlign:'left', fontSize:'12px'}}>Sherman Oaks, California 91423</Text>
                        </View>
                        <View style={{width:'50%'}}>
                            <Text style={{margin:"5px", textAlign:'left'}}>{!item.estimate ? `INVOICE TO` : `ESTIMATE TO`}</Text>
                            <Text style={{margin:"5px", textAlign:'left', fontSize:'12px'}}>{item.customer?.firstName + ' ' + item.customer?.lastName}</Text>
                            <Text style={{margin:"5px", textAlign:'left', fontSize:'12px'}}>{item.customer?.state + ',' + item.customer?.city}</Text>
                            <Text style={{margin:"5px", textAlign:'left', fontSize:'12px'}}>{item.customer?.street}</Text>
                            <Text style={{margin:"5px",textAlign:'left', fontSize:'12px'}}>{item.customer?.primaryPhoneNumber}</Text>
                        </View>
                    </View>
                        <View><Text style={{margin:"5px", textAlign:'right', fontSize:'10px', marginBottom:'20px' }}>Invoice Date: {new Date(item.createdAt).toDateString()}</Text></View>
                    <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:'20px', backgroundColor:BlueColor_100, color:TextColor_100, padding:'0 10px 0 10px'}}>
                            <Text style={{width: '5px', textAlign:'left', fontSize:'12px'}}>#</Text>
                            <Text style={{width: '40%', textAlign:'left', fontSize:'12px'}}>Item</Text>
                            <Text style={{margin:"5px",fontSize:'12px'}}>Qty</Text>
                
                    </View>

                {item.customItems ?
                    item.customItems.map((a, index) => {
                        return(
                            <View key={index} style={{display:'flex', flexDirection:'row',textAlign:'left',
                            marginBottom:'10px', marginTop:'10px', borderBottom:`2px solid ${BlueColor_100}`}}>
                                <Text style={{width:'40%', textAlign:'left', paddingLeft:'10px', fontSize:'12px'}}>{index + 1}</Text>
                                <Text style={{width:'40%', textAlign:'left', paddingLeft:'10px', fontSize:'12px'}}>{a.name + '\n' + a.itemType}</Text>
                                <Text style={{width:'20%', textAlign:'center', fontSize:'12px'}}>{a.qty}</Text>
                               
                            </View>
                        )
                    })
                : ''}
                <View style={{marginTop:'20px' }}>
                </View>
                  
                
                   
               
        
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
            <View style={{width:'100%'}}>
                            <Text style={{margin:"10px 100px", textAlign:'center', fontSize:'12px'}}>Notes: 
We are so grateful for the pleasure of serving you and hope we meet your expectations.
All Prices quoted are valid for 30 days from the date of stated on the Estimate

</Text>
<Text style={{margin:"10px 100px", textAlign:'center', fontSize:'12px'}}>
Warranty:
3 Years Warranty on Turing/ 2 Years Warranty on Doorbird/ 3 Months Warranty on Labor
AI Features will be charged $150 per camera per year.
</Text>
                          
                        </View>
            </Page>
        </Document>
    </PDFViewer>
  )
}

export default PdfRenderTech