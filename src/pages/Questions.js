import { Container } from '@mui/system'
import React from 'react'
import Voc3 from './VocQuestions/Voc3'

export default function Questions() {
  return (
    <>
        <Container maxWidth="sm">
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '90vh',}}>
              <Voc3 />
          </div>
        </Container>
    </>
  )
}