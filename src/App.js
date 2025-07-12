import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUpPage from './SignUpPage'
import LoginPage from './LoginPage'
import Headers from './Headers'
import AdminDashboard from './AdminDashboard'
import StoreOwnerDashboard from './StoreOwnerDashboard'
import UserDashboard from './UserDashboard'
import ProtectedRoute from './ProtectedRoute' // ✅
import ProfilePage from './ProfilePage' // 
import Home from './HomePage'
function App() {
  return (
    <Router>
      <Headers />
      <Switch>
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/"  component={Home} />
        
        <ProtectedRoute path="/admin-dashboard" component={AdminDashboard} />
        <ProtectedRoute path="/store-owner-dashboard" component={StoreOwnerDashboard} />
        <ProtectedRoute path="/user-dashboard" component={UserDashboard} />
        <ProtectedRoute path="/profile" component={ProfilePage} /> 
      </Switch>
    </Router>
  )
}

export default App
