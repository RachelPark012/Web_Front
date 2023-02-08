import { Container } from '@mui/material';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Profile() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [classof, setClassOf] = useState('');
  const [dep, setDep] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5050/auth').then((response)=> {  
      setId(response.data._id);
      console.log(id, "id값");  //user값이 있으면
      setPassword(response.data.password);  
      setName(response.data.name);  
      setClassOf(response.data.classof);  
      setDep(response.data.dep);  
    })
  }, []);
  return (
    <>
        <Container maxWidth="sm">
            <h1>Profile</h1>
            <dt>ID</dt>
            <dd>{id}</dd>
            <dt>Password</dt>
            <dd>{password}</dd>
            <dt>NickName</dt>
            <dd>{name}</dd>
            <dt>Number</dt>
            <dd>{classof}</dd>
            <dt>Name</dt>
            <dd>{name}</dd>
            <dt>Major</dt>
            <dd>{dep}</dd>
        </Container>
    </>
  );
}

export default Profile;