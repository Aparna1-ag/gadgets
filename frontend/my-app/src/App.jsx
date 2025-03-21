
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MyForm from './Myform';
import {BrowserRouter as Router, Routes, Route} from "react-router"
import AllGadgets from './AllGadgets';
import Home from './Home';
import GadgetDetails from './GadgetDetails';
import Demo from './demoCloud';
import AddNewGadget from './AddNewGadget';



function App() {

  return (
    <div>

<Router>
  
  <Routes>
  {/* <Route path='/' element={<Home />}  /> */}
  <Route path='/' element={<AllGadgets />}  />


    <Route path='/register' element={<MyForm />}  />
    {/* <Route path='/allgadgets' element={<AllGadgets />} /> */}
    
    <Route path='/gadgetdetails/:id' element={<GadgetDetails />} />
    <Route path='/demo'  element={<Demo/>} />
    <Route path='/postnewgadget' element={<AddNewGadget />} />
  </Routes>




</Router>

    
      </div>
  )
}

export default App
