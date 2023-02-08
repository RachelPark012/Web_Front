import { Container } from '@mui/system'
import React from 'react'
import Voc2 from './VocReview/Voc2'

export default function Reviews() {
  return (
    <>
        <Container maxWidth="sm">
          <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '40vh',}}>
              <Voc2 />
          </div>
        </Container>
    </>
  )
}