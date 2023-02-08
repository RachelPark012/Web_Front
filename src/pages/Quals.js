import { Container } from '@mui/system'
import React from 'react'
import Voc from './VocQuals/Voc'

export default function Quals() {
  return (
    <>
        <Container maxWidth="sm">
          <div style={{ 
              display: 'flex', justifyContent: 'center', alignItems: 'center', 
              width: '100%', height: '70vh',}}>
                <Voc />
            </div>
        </Container>
    </>
  )
}
