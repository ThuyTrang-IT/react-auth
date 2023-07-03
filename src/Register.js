import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from './utils/SignupApi';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const data = await register(email, password);
      setSuccessMessage(data.message);
      setEmail('');
      setPassword('');
      history.push('/todo'); // Chuyển hướng đến trang To do
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-4 mt-5">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Register</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </form>
              {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;