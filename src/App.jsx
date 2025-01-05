import './App.css'
import Yummpy from './pages/Yummpy'
import Ifc_c from  './pages/Ifc_c'
import Kathijunction from './pages/Kathijunction'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Mycart from './components/Mycart'


function App() {

  return (
        <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/yummpy' element={<Yummpy/>}/>
          <Route exact path='/ifc_c' element={<Ifc_c/>}/>
          <Route exact path='/kathijunction' element={<Kathijunction/>}/>
          <Route exact path='/Mycart' element={<Mycart/>}/>
        </Routes>
      </div>
        </Router>
    
  )
}

export default App
