import { Link, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import './index.css'

const Header = props => {
  const [location, setLocation] = useState('📍 Detecting location...')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('')

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setRole(decoded.role)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Invalid token:', error)
        Cookies.remove('jwt_token')
      }
    }
  }, [])

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    props.history.replace('/signup')
    setIsLoggedIn(false)
  }

  const goToProfile = () => {
    props.history.push('/profile')
  }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">
          Just<span>Dial</span>
        </h1>
        <select className="location-select" onChange={e => setLocation(e.target.value)} value={location}>
          <option value="Mumbai">Mumbai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Delhi">Delhi</option>
        </select>
        <input
          type="text"
          className="search-bar"
          placeholder="Search for restaurants, services..."
        />
      </div>

      <nav className="header-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <button className="nav-link" onClick={goToProfile}>
              {role.charAt(0).toUpperCase() + role.slice(1)} Profile
            </button>
            <button className="logout-btn" onClick={onClickLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

export default withRouter(Header)
