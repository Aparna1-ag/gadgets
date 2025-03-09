
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MyForm from './Myform';
import {BrowserRouter as Router, Routes, Route} from "react-router"
import AllGadgets from './AllGadgets';
import Home from './Home';



function App() {

  return (
    <div>

<Router>
  
  <Routes>
  <Route path='/' element={<Home />}  />

    <Route path='/register' element={<MyForm />}  />
    <Route path='/allgadgets' element={<AllGadgets />} />
  </Routes>




</Router>

    
      </div>
  )
}

export default App
