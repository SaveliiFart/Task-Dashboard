import Overview from "./pages/Overview";
import Settings from "./pages/Settings";
import Tasks from "./pages/Tasks";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./componets/ProtectedRoute";
import Layout from "./componets/Layout";
import useTheme from "./hooks/useTheme";

function App() {
  useTheme()
  return (
    <Router>
      <Routes>

        {/* публичные страницы */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/overview" element={<Overview />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;