import { Component } from "react"; 
import Cookies from "js-cookie" 
import "./index.css"
class AdminDashboard extends Component{
    state = {
        adminData : [] , 
        errMsg:""
    }
    componentDidMount(){
        const apiUrl = "https://store-rating-backend-rojx.onrender.com/dashboard/admin"  
        const token = Cookies.get("jwt_token") 
        const options = {
            method : "GET",
            headers : { 
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`,
            },
            credentials: "include",
        }
        fetch(apiUrl , options) 
        .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data)
            this.setState({adminData : data})}) 

          .catch((error) => {
            this.setState({errMsg : error})
          });
    }
    render(){ 
       const {adminData} = this.state
        return(
            <div className="admin-bg-container"> 
              <div className="admin-db-card-container">
                <h1>AdminDashboard</h1> 
                <div className="data-container">
                    <div className="total-data-con"> 
                        <p>TOTAL USERS</p>
                        <span>{adminData.dbCountUser?.totalUsers}</span>
                    </div> 
                    <div className="total-data-con"> 
                        <p>TOTAL STORES</p>
                        <span>{adminData.dbCountStores?.totalStores}</span>
                    </div> 
                    <div className="total-data-con"> 
                        <p>TOTAL Ratings</p>
                        <span>{adminData.dbRating?.totalratings}</span>
                    </div>
                </div>
                {/* User Table */}
                <h2 className="section-title">Users</h2>
                <table className="data-table">
                <thead>
                    <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {adminData.dbUser?.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                    ))}
                </tbody>
                </table>

                {/* Store Table */}
                <h2 className="section-title">Stores</h2>
                <table className="data-table">
                <thead>
                    <tr>
                    <th>Store ID</th>
                    <th>Store_Name</th>
                    <th>Address</th>
                    <th>Rating</th> 
                    <th>Owner_Id</th>  
                    <th>Owner_Name</th> 
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {adminData.dbStore?.map(store => (
                    <tr key={store.id}>
                        <td>{store.id}</td>
                        <td>{store.name}</td>
                        <td>{store.address}</td> 
                        <td>{store.average_rating || "N/A"}</td>
                        <td>{store.owner_id}</td> 
                        <td>{store.owner_name}</td>
                        <td>{store.email}</td>
                    </tr>
                    ))}
                </tbody>
                </table>

              </div>
            </div>
        )
    }
}
export default AdminDashboard