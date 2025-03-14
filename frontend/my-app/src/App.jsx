
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MyForm from './Myform';
import {BrowserRouter as Router, Routes, Route} from "react-router"
import AllGadgets from './AllGadgets';
import Home from './Home';
import GadgetDetails from './GadgetDetails';
import Demo from './demoCloud';



function App() {

  return (
    <div>

<Router>
  
  <Routes>
  <Route path='/' element={<Home />}  />

    <Route path='/register' element={<MyForm />}  />
    <Route path='/allgadgets' element={<AllGadgets />} />
    <Route path='/gadgetdetails/:id' element={<GadgetDetails />} />
    <Route path='/demo'  element={<Demo/>} />
  </Routes>




</Router>

    
      </div>
  )
}

export default App
