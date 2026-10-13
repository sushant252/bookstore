
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import AllBooks from "./pages/AllBooks/AllBooks";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<AllBooks />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
