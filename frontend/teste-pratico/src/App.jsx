import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import Home from './scenes/Home';
import ViewSchool from './scenes/schools/ViewSchool';
import AddSchool from './scenes/schools/AddSchool';
import Import from './scenes/Import';
import EditSchool from './scenes/schools/EditSchool';
import AddDependency from './scenes/dependencies/AddDependency';
import EditDependency from './scenes/dependencies/EditDependency';
import Login from './scenes/Login';
import Register from './scenes/Register';
import PrivateRoute from './components/PrivateRoute'

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AuthLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
          </Route>
          <Route element={<MainLayout />}>
            {/* Rotas protegidas */}
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/home" 
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/escola/:id" 
              element={
                <PrivateRoute>
                  <ViewSchool />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/escola/adicionar" 
              element={
                <PrivateRoute>
                  <AddSchool />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/escola/editar/:id" 
              element={
                <PrivateRoute>
                  <EditSchool />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/importar" 
              element={
                <PrivateRoute>
                  <Import />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/dependencia/adicionar/:schoolId" 
              element={
                <PrivateRoute>
                  <AddDependency />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/dependencia/editar/:id" 
              element={
                <PrivateRoute>
                  <EditDependency />
                </PrivateRoute>
              } 
            />
          </Route>          
        </Routes>
      </Router>

    </div>
  )
}

export default App
