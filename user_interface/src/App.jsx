
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import AllBooks from "./pages/AllBooks/AllBooks";
import { Provider } from  'react-redux';
import store from './app/store.js';
import Cart from './pages/Cart/Cart.jsx'
import CheckOut from './pages/CheckOut/CheckOut.jsx'
import PaymentSuccess from './pages/CheckOut/PaymentSuccess.jsx'
import PaymentFailure from './pages/CheckOut/PaymentFailure.jsx'


function App() {
  return (
     <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/Cart" element={<Cart/>}></Route>
          <Route path='/CheckOut' element={<CheckOut></CheckOut>} ></Route>
          <Route path='/payment/success' element={<PaymentSuccess></PaymentSuccess>}></Route>
          <Route path='/Payment/failed' element={<PaymentFailure></PaymentFailure>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
