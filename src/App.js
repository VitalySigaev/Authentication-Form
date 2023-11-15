import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setEmail('');
    setPassword('');
    try {
      if (!password.length) {
        setError('Введите корректный пароль');
        return;
      }
      if (!email.includes('@')) {
        setError('Введите корректный адрес электронной почты.');
        return;
      }

      setLoading(true);

      const response = await fetch('https://64f05e768a8b66ecf77988dd.mockapi.io/api/gallery/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Аутентификация успешна:', data);
      } else {
        throw new Error('Ошибка аутентификации');
      }

      setTimeout(async () => {
        console.log('Аутентификация успешна:', { email, password });
        setLoading(false);
        setError('');
      }, 2000);
    } catch (error) {
      console.error('Ошибка:', error.message);
      setLoading(false);
      setError('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Вход</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`} onClick={togglePasswordVisibility}>
              {showPassword ? 'Скрыть' : 'Показать'}
            </i>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="button" className="btn-login" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Аутентификация...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default App;
