import React, { useState } from 'react';
import { login } from './utils/LoginApi';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await login(email, password);
      if (data) { // Kiểm tra xem biến data có giá trị hay không
        localStorage.setItem('access_token', data.access_token);
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setRedirect(true);
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };
  

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
        
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
        {isLoading && <div>Loading...</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && (
          <div className="alert alert-success mt-3">
            Login success. Redirecting to Todo page...
          </div>
          
        )}
      
        {redirect && history.push('/todo')}
      </div>
    </div>
  );
}

export default LoginPage;