import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/navbar'
import Home from './scenes/Home';
import ViewSchool from './scenes/schools/ViewSchool';
import AddSchool from './scenes/schools/AddSchool';
//import EditSchool from './scenes/schools/EditSchool';
import Import from './scenes/Import';
import EditSchool from './scenes/schools/EditSchool';
import AddDependency from './scenes/dependencies/AddDependency';
import EditDependency from './scenes/dependencies/EditDependency';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/escola/:id" element={<ViewSchool />} />
          <Route path="/escola/adicionar" element={<AddSchool/>} />
          <Route path="/escola/editar/:id" element={<EditSchool/>} />
          <Route path="/importar" element={<Import />} />
          <Route path="/dependencia/adicionar/:schoolId" element={<AddDependency/>} />
          <Route path="/dependencia/editar/:id" element={<EditDependency/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
