import React, { useState } from 'react';
import { login } from './utils/LoginApi';
import { Form, Button } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading
  const [success, setSuccess] = useState(false); // Thêm state success
  const [redirect, setRedirect] = useState(false); // Thêm state redirect
  const history = useHistory(); // Hook để chuyển hướng đến trang to do sau khi đăng nhập thành công

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Bắt đầu đăng nhập và đang tải
    try {
      const data = await login(email, password);
      localStorage.setItem('access_token', data.access_token);
      setIsLoading(false); // Kết thúc đăng nhập và đang tải
      setSuccess(true); // Đăng nhập thành công
      setRedirect(true); // Thiết lập redirect thành true
    } catch (error) {
      setIsLoading(false); // Kết thúc đăng nhập và đang tải
      setError(error.response.data.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-6">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">Login success. Redirecting to Todo page...</div>} // Hiển thị thông báo đăng nhập thành công và chuyển hướng
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'} // Hiển thị trạng thái đang tải khi đăng nhập
          </Button>
        </Form>
        {redirect && <Redirect to="/todo" />} // Sử dụng Redirect để chuyển hướng đến trang to do khi redirect là true
      </div>
    </div>
  );
}

export default LoginPage;