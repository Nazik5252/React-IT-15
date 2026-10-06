import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticate, demoAccounts } from '../services/authService';

// Страница входа. При успешной авторизации отдаёт пользователя в state корневого компонента.
function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (field) => (event) => {
    setCredentials((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!credentials.login.trim() || !credentials.password) {
      setError('Введите логин и пароль.');
      return;
    }

    setIsSubmitting(true);
    let user;
    try {
      user = await authenticate(credentials.login, credentials.password);
    } catch (requestError) {
      setError(requestError.message);
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);

    if (!user) {
      setError('Неверный логин или пароль.');
      return;
    }

    onLogin(user);

    // Возвращаем пользователя на страницу, с которой его перенаправили (если такая есть).
    const redirectTo = location.state?.from ?? '/equipment';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Вход</h1>
        <p className="login-subtitle">Прокат оборудования</p>

        <div className="form-field">
          <label htmlFor="login">Логин</label>
          <input
            id="login"
            type="text"
            value={credentials.login}
            onChange={handleChange('login')}
            placeholder="admin"
            autoComplete="username"
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={credentials.password}
            onChange={handleChange('password')}
            placeholder="••••••"
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Проверка…' : 'Войти'}
        </button>

        <div className="login-hint">
          <p>Демо-аккаунты:</p>
          <ul>
            {demoAccounts.map((account) => (
              <li key={account.login}>
                <code>{account.login}</code> / <code>{account.password}</code>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
