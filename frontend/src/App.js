import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartContext } from "./components/contextReducer";

function App() {
  return (
    <div>
      <CartContext>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </CartContext>
    </div>
  );
}

export default App;
