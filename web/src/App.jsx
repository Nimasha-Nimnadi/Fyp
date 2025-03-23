import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HowItWork from "./pages/HowItWork";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Chat from "./pages/chat";

function AppContent() {
  const location = useLocation(); // Now using useLocation inside BrowserRouter

  return (
    <>
      {/* Conditionally render Header (Navbar) based on current route */}
      {location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && <Header />}

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/how-it-work" element={<HowItWork />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent /> {/* Move the logic for the header rendering inside BrowserRouter */}
    </BrowserRouter>
  );
}
