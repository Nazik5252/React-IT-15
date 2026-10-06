import { useCallback, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import EquipmentPage from './pages/EquipmentPage';
import LoginPage from './pages/LoginPage';
import { logout } from './services/authService';
import './App.css';

// Защищённый маршрут: без авторизованного пользователя отправляет на страницу входа.
function ProtectedRoute({ user, children }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

function App() {
  // Информация об авторизовавшемся пользователе хранится в state корневого компонента.
  const [user, setUser] = useState(null);

  // Стабильная ссылка нужна, т.к. функция используется в зависимостях useEffect страницы.
  const handleLogout = useCallback(() => {
    logout();
    setUser(null);
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/equipment" replace /> : <LoginPage onLogin={setUser} />}
        />

        <Route
          path="/equipment"
          element={
            <ProtectedRoute user={user}>
              <EquipmentPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/equipment" replace />} />
        <Route path="*" element={<Navigate to="/equipment" replace />} />
      </Routes>
    </div>
  );
}

export default App;
