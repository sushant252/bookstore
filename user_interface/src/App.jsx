import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage/HomePage';
import AllBooks from './pages/AllBooks/AllBooks';
function App() {

  return (
    <BrowserRouter>
         <Routes>
          <Route path="*" element={ <div className="d-flex">
            <Navbar />   
              <main style={{ flexGrow: 1, padding: "20px",}} className="mt-5"> 
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/books" element={<AllBooks />} />
                                    
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
