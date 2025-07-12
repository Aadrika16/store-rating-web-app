import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './index.css';

ChartJS.register(BarElement, CategoryScale, LinearScale);

class StoreOwnerDashboard extends Component {
  state = {
    ratings: [],
    averageRating: 0,
    storeExists: true,
    storeName: '',
    storeAddress: '',
    message: '',
    loading: false,
    editing: false,
  };

  componentDidMount() {
    this.fetchDashboardData();
  }

  fetchDashboardData = async () => {
    const token = Cookies.get('jwt_token');
    this.setState({ loading: true });

    try {
      const res = await fetch('https://store-rating-backend-rojx.onrender.com/dashboard/owner', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.status === 404) {
        this.setState({ storeExists: false, loading: false });
      } else if (res.ok) {
        this.setState({
          ratings: data.ratings,
          averageRating: data.averageRating,
          storeExists: true,
          loading: false,
          message: '',
        });
      } else {
        this.setState({ loading: false, message: data.error || 'Failed to fetch data' });
      }
    } catch (error) {
      this.setState({ loading: false, message: 'Network error' });
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleStoreSubmit = async e => {
    e.preventDefault();
    const { storeName, storeAddress, storeExists } = this.state;
    const token = Cookies.get('jwt_token');
    const url = storeExists ? 'https://store-rating-backend-rojx.onrender.com/stores/update' : 'https://store-rating-backend-rojx.onrender.com/stores/add';
    const method = storeExists ? 'PUT' : 'POST';

    this.setState({ loading: true });

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: storeName, address: storeAddress }),
    });

    const data = await res.json();
    if (res.ok) {
      this.setState({
        message: data.message,
        editing: false,
        storeExists: true,
        storeName: '',
        storeAddress: '',
        loading: false,
      });
      this.fetchDashboardData();
    } else {
      this.setState({ loading: false, message: data.error || 'Error submitting form' });
    }
  };

  toggleEdit = () => {
    this.setState(prev => ({ editing: !prev.editing }));
  };

  renderStars = rating => [...Array(5)].map((_, i) => (i < Math.floor(rating) ? '★' : '☆')).join('');

  getRatingsChartData = () => {
    const counts = [0, 0, 0, 0, 0];
    this.state.ratings.forEach(r => {
      const val = Math.round(r.rating);
      if (val >= 1 && val <= 5) counts[val - 1]++;
    });

    return {
      labels: ['1★', '2★', '3★', '4★', '5★'],
      datasets: [
        {
          label: 'Ratings Distribution',
          data: counts,
          backgroundColor: '#4a90e2',
        },
      ],
    };
  };

  render() {
    const {
      ratings,
      averageRating,
      storeExists,
      storeName,
      storeAddress,
      message,
      loading,
      editing,
    } = this.state;

    return (
      <div className="owner-dashboard">
        <h1>🏪 Store Owner Dashboard</h1>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            {storeExists ? (
              <>
                <div className="info">
                  <p><strong>Average Rating:</strong> {averageRating || 'N/A'}</p>
                  <button onClick={this.toggleEdit}>
                    {editing ? 'Cancel' : 'Edit Store Info'}
                  </button>
                </div>

                {editing && (
                  <form onSubmit={this.handleStoreSubmit} className="store-form">
                    <input
                      type="text"
                      name="storeName"
                      value={storeName}
                      onChange={this.handleInputChange}
                      placeholder="Store Name"
                      required
                    />
                    <input
                      type="text"
                      name="storeAddress"
                      value={storeAddress}
                      onChange={this.handleInputChange}
                      placeholder="Store Address"
                      required
                    />
                    <button type="submit">Update Store</button>
                  </form>
                )}

                <h2>📝 User Ratings</h2>
                <table className="ratings-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ratings.map(r => (
                      <tr key={r.userId}>
                        <td>{r.userId}</td>
                        <td>{r.username}</td>
                        <td>{this.renderStars(r.rating)} ({r.rating})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {ratings.length > 0 && (
                  <div className="chart-container">
                    <h3>📊 Rating Distribution</h3>
                    <Bar data={this.getRatingsChartData()} />
                  </div>
                )}
              </>
            ) : (
              <div>
                <h2>Add Your Business</h2>
                <form onSubmit={this.handleStoreSubmit} className="store-form">
                  <input
                    type="text"
                    name="storeName"
                    value={storeName}
                    onChange={this.handleInputChange}
                    placeholder="Store Name"
                    required
                  />
                  <input
                    type="text"
                    name="storeAddress"
                    value={storeAddress}
                    onChange={this.handleInputChange}
                    placeholder="Store Address"
                    required
                  />
                  <button type="submit">Add Store</button>
                </form>
              </div>
            )}

            {message && <p className="status-message">{message}</p>}
          </>
        )}
      </div>
    );
  }
}

export default StoreOwnerDashboard;
