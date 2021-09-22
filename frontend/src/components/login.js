import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

const Login = props => {
  const initialUserState = {
    name:"",
    id:"",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log("USER: " + user.name + user.value);
    setUser({...user, [name]: value});
  };

  const login = async(event) => {
    event.preventDefault();
    await props.login(user);
    props.history.push('/');
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="user">Username</Form.Label>
        <Form.Control as="input" type="text" 
        id="name" required value={user.name} 
        onChange={handleInputChange} name="name"/>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="id">ID</Form.Label>
        <Form.Control as="input" type="text" 
        id="id" required value={user.id} 
        onChange={handleInputChange} name="id"/>
      </Form.Group>
      <Button type="submit" variant="success" onClick={login}>
        Login
      </Button>
    </Form>

  );
}

export default Login;