import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from "@mui/material";
import './VocView3';
import { Button, FormControl } from '@mui/material';
import CateComboBox from '../CateComboBox';
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import DepComboBox from '../DepComboBox';

const HandleQuestionSubmit = async({body}) => {
  const headers = {
    'Content-Type' : 'application/json',
    'Authorization' : "Bearer cognito access token"
  }

  const response = await axios.post('http://localhost:5050/questions', body, {headers: headers}).then((response) => {
    console.log('status : '+response.status);
  }).catch((error) => {
    console.log('error임 : '+error);
  });
}

function VocQuestion3() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mainDept, setMainDept] = useState('');
  const [subDept, setSubDept] = useState('');

  const body = {
      title: title,
      content: content,
      mainDept: mainDept,
      subDept: subDept
    }

  return (<>
    <Container maxWidth="sm" style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '5vh',  
            }}>
        <form style={{ display: 'flex', flexDirection: 'column'}}>
            <h2 >게시글 작성 - 질문게시판</h2>
            <div className="voc-view-row">
                <label>제목</label>
                <TextField size="small" onChange={(event) => setTitle(event.target.value)}></TextField>
            </div>           
            <FormControl sx={{ m: 1, width: '60ch' }} variant="filled">
                <TextField 
                    id="outlined-multiline-static" label="내용" multiline rows={5}
                    onChange={(event) => setContent(event.target.value)}
                />
            </FormControl>
            <Button variant="contained" endIcon={<SendIcon />}onClick={() => HandleQuestionSubmit({body})}>등록</Button>
        </form>
    </Container>
    </>);
}
  
export default VocQuestion3;