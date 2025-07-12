import Headers from '../Headers'
import './index.css'

const NotFound = () => (
  <>
    <Headers />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/doyaebals/image/upload/v1744556029/Not_FOund_i4p8ez.jpg"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">We are sorry, the page you requested could not be found</p>
    </div>
  </>
)
export default NotFound