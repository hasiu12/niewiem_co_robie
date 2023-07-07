import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset the error message on each submit

    try {
      const response = await axios.post('http://localhost:4000/login', {
        username,
        password
      }, { withCredentials: true });

      if (response.data) {
        // Użytkownik zalogowany pomyślnie
        setIsLoggedIn(true);
      } else {
        // Nieprawidłowe dane logowania
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      setError('An error occurred while logging in');
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome, {username}!</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Log in</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
