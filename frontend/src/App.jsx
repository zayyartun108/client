
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./components/Home"
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import AdminRoute from "./components/AdminRoute";
import Homesection from "./sidebar/Homesection"
import Projectlist from "./sidebar/Projectlist"
import Servicelist from "./sidebar/Servicelist"
import Skilllist from "./sidebar/Skilllist"
import Test from "./sidebar/Test"
import Sociallist from "./sidebar/Sociallist"
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route path="/admin/homesection" element={
          <AdminRoute>
            <Homesection />
          </AdminRoute>
        } />
        <Route path="/admin/projectlist" element={
          <AdminRoute>
            <Projectlist />
          </AdminRoute>
        } />
        <Route path="/admin/servicelist" element={
          <AdminRoute>
            <Servicelist />
          </AdminRoute>
        } />
        <Route path="/admin/skilllist" element={
          <AdminRoute>
            <Skilllist />
          </AdminRoute>
        } />
        <Route path="/admin/sociallist" element={
          <AdminRoute>
            <Sociallist />
          </AdminRoute>
        } />

        <Route path="/pregress" element={
          <Test />
        }/>






      </Routes>
    </Router>
  )
}

export default App
