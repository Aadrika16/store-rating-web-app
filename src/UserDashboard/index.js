import { Component } from 'react';
import Cookies from 'js-cookie';
import './index.css';

class UserDashboard extends Component {
  state = {
    stores: [],
    searchQuery: '',
    userRating: 0,
    editableRating: null,
    selectedStoreId: null,
    errMsg: null,
    isLoading: true,
  };

  componentDidMount() {
    this.fetchStores();
  }

  fetchStores = () => {
    const token = Cookies.get('jwt_token');
    const apiUrl = 'https://store-rating-backend-rojx.onrender.com/dashboard/user';

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch stores');
        return response.json();
      })
      .then((data) => {
        this.setState({ stores: data, isLoading: false });
      })
      .catch((error) => {
        console.error(error.message);
        this.setState({ errMsg: error.message, isLoading: false });
      });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleRatingChange = (storeId, rating) => {
    this.setState({ editableRating: rating, selectedStoreId: storeId });
  };

  handleSubmitRating = () => {
    const { editableRating, selectedStoreId, stores } = this.state;
    const token = Cookies.get('jwt_token');
    const apiUrl = 'https://store-rating-backend-rojx.onrender.com/dashboard/user/rating';

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ storeId: selectedStoreId, rating: editableRating }),
    };

    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to update rating');
        return response.json();
      })
      .then((data) => {
        const updatedStores = stores.map((store) =>
          store.id === selectedStoreId
            ? {
                ...store,
                rating_value: data.average_rating,
                user_rating: data.user_rating,
              }
            : store
        );

        this.setState({
          stores: updatedStores,
          editableRating: null,
          selectedStoreId: null,
        });
      })
      .catch((error) => {
        this.setState({ errMsg: error.message });
      });
  };

  render() {
    const {
      stores,
      searchQuery,
      editableRating,
      selectedStoreId,
      errMsg,
      isLoading,
    } = this.state;

    const filteredStores = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="user-dashboard">
        <h1>User Dashboard</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search stores by name or address"
          value={searchQuery}
          onChange={this.handleSearchChange}
          className="search-input"
        />

        {isLoading ? (
          <p>Loading...</p>
        ) : errMsg ? (
          <p style={{ color: 'red' }}>{errMsg}</p>
        ) : filteredStores.length === 0 ? (
          <p>No stores found.</p>
        ) : (
          <div className="store-list">
            {filteredStores.map((store) => (
              <div className="store-card" key={store.id}>
                <div className="store-info">
                  <h2>{store.name}</h2>
                  <p><strong>Address:</strong> {store.address}</p>
                  <p><strong>Owner:</strong> {store.owner_name}</p>
                  <p><strong>Rating:</strong> {store.rating_value || 'No ratings yet'}</p>
                  <p><strong>Your Rating:</strong> {store.user_rating || 'N/A'}</p>
                  <button
                    onClick={() =>
                      this.handleRatingChange(store.id, store.user_rating || 0)
                    }
                  >
                    Modify Rating
                  </button>

                  {editableRating !== null &&
                    store.id === selectedStoreId && (
                      <div className="rating-form">
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={editableRating}
                          onChange={(e) =>
                            this.setState({
                              editableRating: parseInt(e.target.value),
                            })
                          }
                        />
                        <button onClick={this.handleSubmitRating}>Submit</button>
                      </div>
                    )}
                </div>
                {store.image && (
                  <img
                    src={store.image}
                    alt={store.name}
                    className="store-image"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default UserDashboard;
