import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoutes from "./routes/PrivateRoutes";
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Private Routes, Guard Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/me" element={<ProfilePage />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
