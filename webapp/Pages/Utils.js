const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiClient = {
  async request(method, endpoint, data = null, headers = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers
      },
      // credentials: 'include'
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.response = response;
      console.log('Fetch error:', error);
      throw error;
    

    }

    return response.json();
  },

  // Authentication
  login(credentials) {
    return this.request('POST', '/login', credentials);
  },

  logout() {
    return this.request('POST', '/logout');
  },

  // Households
  getHouseholds(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request('GET', `/households?${query}`);
  },

  getHousehold(id) {
    return this.request('GET', `/households/${id}`);
  },

  createHousehold(data) {
    return this.request('POST', '/households', data);
  },

  // Persons
  getPersons(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request('GET', `/persons?${query}`);
  },

  getPerson(id) {
    return this.request('GET', `/persons/${id}`);
  },

  // Add all other API methods following the same pattern
};

export default apiClient;