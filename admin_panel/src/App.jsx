import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import NavBar from './components/NavBar'
// import NavBar from './components/AdminNav'

import WelcomePage from './pages/WelcomePage/WelcomePage'
import BookList from './pages/books/BookList'
import AddBook from './pages/books/AddBook'
import BookPageForEdit from './pages/books/BookPageForEdit'
import AdminLogin from './pages/LoginSignupPages/AdminLogin'
import CreateDiscounts from './pages/Discount/CreateDiscount';
import DiscountList from './pages/Discount/Discountlist';
import DiscountForEdit from './pages/Discount/DiscountForEdit';
import BookDetail from './pages/books/BookDetail';
import UserList from './pages/users/UserList'
import "./App.css";
function App() {
  return (
    

     <BrowserRouter>

            <Routes>

                {/* Login Page */}
                <Route path="/" element={<AdminLogin />} />


                {/* Admin Pages */}
                <Route path="*" element={ <div className="d-flex"> 
                     <NavBar />
                    <Sidebar />
                   
                            <main style={{ flexGrow: 1, padding: "20px",}} className="mt-5">
                                
                                <Routes>
                                    
                                    <Route path="/admin/dashboard" element={<WelcomePage />} />

                                    <Route path="/books" element={<BookList />} />

                                    <Route path="/add/book" element={<AddBook />} />
                                    <Route path="/book/:id" element={<BookDetail />} />
                                    <Route path="/edit/book/:id" element={<BookPageForEdit />} />

                                    <Route path="/discounts" element={<DiscountList />} />
                                    <Route path="/add/discount" element={<CreateDiscounts />} />
                                    <Route path="/edit/discount/:id" element={<DiscountForEdit />} />
                                    <Route path="/users" element ={<UserList />}></Route>
                                </Routes>
                            </main>
                        </div>
                    }
                />

            </Routes>

        </BrowserRouter>
  )
}

export default App