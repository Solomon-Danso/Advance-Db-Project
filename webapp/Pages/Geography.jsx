import { useState, useEffect } from 'react';
import apiClient from './Utils';
import { useRouter } from 'next/navigation';

export default function GeographicDataEntry() {
  const [activeTab, setActiveTab] = useState('region');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Data states
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [enumerationAreas, setEnumerationAreas] = useState([]);

  // Form data states
  const [formData, setFormData] = useState({
    region: {
      region_code: '',
      region_name: ''
    },
    district: {
      district_code: '',
      region_code: '',
      district_name: '',
      district_type: ''
    },
    subDistrict: {
      sub_district_code: '',
      district_code: '',
      sub_district_name: ''
    },
    locality: {
      locality_code: '',
      sub_district_code: '',
      locality_name: ''
    },
    enumerationArea: {
      ea_code: '',
      locality_code: '',
      ea_type: '',
      ea_number: ''
    }
  });

useEffect(() => {
  // Load initial data for the first tab
  loadTabData(activeTab);
}, []);

const loadTabData = async (tab) => {
  try {
    setLoading(true);
    
    switch (tab) {
      case 'region':
        const regionsData = await apiClient.request('GET', '/geographic/regions');
        setRegions(regionsData.data || []);
        break;
        
      case 'district':
        const districtsData = await apiClient.request('GET', '/geographic/districts');
        setDistricts(districtsData.data || []);
        break;
        
      case 'subDistrict':
        const subDistrictsData = await apiClient.request('GET', '/geographic/subdistricts');
        setSubDistricts(subDistrictsData.data || []);
        break;
        
      case 'locality':
        const localitiesData = await apiClient.request('GET', '/geographic/localities');
        setLocalities(localitiesData.data || []);
        break;
        
      case 'enumerationArea':
        const easData = await apiClient.request('GET', '/geographic/enumeration-areas');
        setEnumerationAreas(easData.data || []);
        break;
        
      default:
        break;
    }
    
  } catch (error) {
    console.error(`Failed to load data for ${tab}:`, error);
    showToast(`Failed to load ${tab} data`, 'error');
  } finally {
    setLoading(false);
  }
};

const handleTabChange = (tab) => {
  setActiveTab(tab);
  loadTabData(tab); // Load data when tab changes
};


  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };


  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

const handleSubmit = async (e, section) => {
  e.preventDefault();
  setLoading(true);

  try {
    let endpoint = '';
    let data = {};

    switch (section) {
      case 'region':
        endpoint = '/geographic/regions';
        data = formData.region;
        break;
      case 'district':
        endpoint = '/geographic/districts';
        data = formData.district;
        break;
      case 'subDistrict':
        endpoint = '/geographic/subdistricts';
        data = formData.subDistrict;
        break;
      case 'locality':
        endpoint = '/geographic/localities';
        data = formData.locality;
        break;
      case 'enumerationArea':
        endpoint = '/geographic/enumeration-areas';
        data = formData.enumerationArea;
        break;
      default:
        break;
    }

    await apiClient.request('POST', endpoint, data);
    showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} created successfully!`);

    // Reset form
    setFormData(prev => ({
      ...prev,
      [section]: Object.keys(prev[section]).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {})
    }));

    loadTabData(activeTab);
  } catch (error) {
    console.error('Error saving data:', error);

    let errorMessage = 'Failed to save data';

    if (error.response) {
      try {
        const errorData = await error.response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
      }
    }

    showToast(errorMessage, 'error');
  } finally {
    setLoading(false);
  }
};


  const handleDelete1 = async (section, code) => {
    if (!confirm(`Are you sure you want to delete this ${section}?`)) return;

    try {
      setLoading(true);
      let endpoint = '';
      
      switch (section) {
        case 'region':
          endpoint = `/geographic/regions/${code}`;
          break;
        case 'district':
          endpoint = `/geographic/districts/${code}`;
          break;
        case 'subDistrict':
          endpoint = `/geographic/subdistricts/${code}`;
          break;
        case 'locality':
          endpoint = `/geographic/localities/${code}`;
          break;
        case 'enumerationArea':
          endpoint = `/geographic/enumeration-areas/${code}`;
          break;
        default:
          break;
      }

      await apiClient.request('DELETE', endpoint);
      showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} deleted successfully!`);
      loadTabData(activeTab);
    } catch (error) {
      console.error('Error deleting data:', error);
      showToast(error.response?.data?.message || 'Failed to delete data', 'error');
    } finally {
      setLoading(false);
    }
  };

    const handleDelete = async (section, code) => {
    if (!confirm(`Are you sure you want to delete this ${section}?`)) return;

    try {
      setLoading(true);
      let endpoint = '';
      
      
      switch (section) {
        case 'region':
          endpoint = `/geographic/regions/${code}`;
          break;
        case 'district':
          endpoint = `/geographic/districts/${code}`;
          break;
        case 'subDistrict':
          endpoint = `/geographic/subdistricts/${code}`;
          break;
        case 'locality':
          endpoint = `/geographic/localities/${code}`;
          break;
        case 'enumerationArea':
          endpoint = `/geographic/enumeration-areas/${code}`;
          break;
        default:
          break;
      }


      await apiClient.request('DELETE', endpoint);
      showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} deleted successfully!`);
      
    } catch (error) {
      console.error('Error deleting data:', error);
      showToast(error.response?.data?.message || 'Failed to delete data', 'error');
    } finally {
      householdData()
      setLoading(false);
      
    }
  };

  const tabs = [
    { id: 'region', label: 'Regions' },
    { id: 'district', label: 'Districts' },
    { id: 'subDistrict', label: 'Sub-Districts' },
    { id: 'locality', label: 'Localities' },
    { id: 'enumerationArea', label: 'Enumeration Areas' }
  ];


    const router = useRouter();


  return (
    <div className="geographic-container">
      <div className="sidebar">
        <h2>Geographic Data Management</h2>
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        <div onClick={()=>router.push("/Admin")}>Admin Portal</div>
         
        </div>
      </div>

      <div className="main-content">
        {/* Region Tab */}
        {activeTab === 'region' && (
          <div className="tab-content">
            <h3>Manage Regions</h3>
            <form onSubmit={(e) => handleSubmit(e, 'region')} className="data-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Region Code</label>
                  <input
                    type="text"
                    name="region_code"
                    value={formData.region.region_code}
                    onChange={(e) => handleChange(e, 'region')}
                    required
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <label>Region Name</label>
                  <input
                    type="text"
                    name="region_name"
                    value={formData.region.region_name}
                    onChange={(e) => handleChange(e, 'region')}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create Region'}
              </button>
            </form>

            <div className="data-table">
              <h4>Existing Regions</h4>
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {regions.map(region => (
                    <tr key={region.region_code}>
                      <td>{region.region_code}</td>
                      <td>{region.region_name}</td>
                      <td>
                        <button
                          onClick={() => handleDelete('region', region.region_code)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* District Tab */}
        {activeTab === 'district' && (
          <div className="tab-content">
            <h3>Manage Districts</h3>
            <form onSubmit={(e) => handleSubmit(e, 'district')} className="data-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>District Code</label>
                  <input
                    type="text"
                    name="district_code"
                    value={formData.district.district_code}
                    onChange={(e) => handleChange(e, 'district')}
                    required
                    maxLength="10"
                  />
                </div>
                <div className="form-group">
                  <label>Region</label>
                  <select
                    name="region_code"
                    value={formData.district.region_code}
                    onChange={(e) => handleChange(e, 'district')}
                    required
                    onClick={(e)=>loadTabData('region')}
                  >
                    <option value="">Select Region</option>
                    {regions.map(region => (
                      <option key={region.region_code} value={region.region_code}>
                        {region.region_code} - {region.region_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>District Name</label>
                  <input
                    type="text"
                    name="district_name"
                    value={formData.district.district_name}
                    onChange={(e) => handleChange(e, 'district')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>District Type</label>
                  <input
                    type="text"
                    name="district_type"
                    value={formData.district.district_type}
                    onChange={(e) => handleChange(e, 'district')}
                  />
                </div>
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create District'}
              </button>
            </form>

            <div className="data-table">
              <h4>Existing Districts</h4>
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Region</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {districts.map(district => (
                    <tr key={district.district_code}>
                      <td>{district.district_code}</td>
                      <td>{district.district_name}</td>
                      <td>{district.district_type}</td>
                      <td>{district.region_name}</td>
                      <td>
                        <button
                          onClick={() => handleDelete('district', district.district_code)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sub-District Tab */}
        {activeTab === 'subDistrict' && (
          <div className="tab-content">
            <h3>Manage Sub-Districts</h3>
            <form onSubmit={(e) => handleSubmit(e, 'subDistrict')} className="data-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Sub-District Code</label>
                  <input
                    type="text"
                    name="sub_district_code"
                    value={formData.subDistrict.sub_district_code}
                    onChange={(e) => handleChange(e, 'subDistrict')}
                    required
                    maxLength="10"
                  />
                </div>
                <div className="form-group">
                  <label>District</label>
                  <select
                    name="district_code"
                    value={formData.subDistrict.district_code}
                    onChange={(e) => handleChange(e, 'subDistrict')}
                    required
                    onClick={(e)=>loadTabData('district')}
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district.district_code} value={district.district_code}>
                        {district.district_code} - {district.district_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sub-District Name</label>
                  <input
                    type="text"
                    name="sub_district_name"
                    value={formData.subDistrict.sub_district_name}
                    onChange={(e) => handleChange(e, 'subDistrict')}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create Sub-District'}
              </button>
            </form>

            <div className="data-table">
              <h4>Existing Sub-Districts</h4>
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>District</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subDistricts.map(subDistrict => (
                    <tr key={subDistrict.sub_district_code}>
                      <td>{subDistrict.sub_district_code}</td>
                      <td>{subDistrict.sub_district_name}</td>
                      <td>{subDistrict.district_name}</td>
                      <td>
                        <button
                          onClick={() => handleDelete('subDistrict', subDistrict.sub_district_code)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Locality Tab */}
        {activeTab === 'locality' && (
          <div className="tab-content">
            <h3>Manage Localities</h3>
            <form onSubmit={(e) => handleSubmit(e, 'locality')} className="data-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Locality Code</label>
                  <input
                    type="text"
                    name="locality_code"
                    value={formData.locality.locality_code}
                    onChange={(e) => handleChange(e, 'locality')}
                    required
                    maxLength="10"
                  />
                </div>
                <div className="form-group">
                  <label>Sub-District</label>
                  <select
                    name="sub_district_code"
                    value={formData.locality.sub_district_code}
                    onChange={(e) => handleChange(e, 'locality')}
                    onClick={(e)=>loadTabData('subDistrict')}
                    required
                  >
                    <option value="">Select Sub-District</option>
                    {subDistricts.map(subDistrict => (
                      <option key={subDistrict.sub_district_code} value={subDistrict.sub_district_code}>
                        {subDistrict.sub_district_code} - {subDistrict.sub_district_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Locality Name</label>
                  <input
                    type="text"
                    name="locality_name"
                    value={formData.locality.locality_name}
                    onChange={(e) => handleChange(e, 'locality')}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create Locality'}
              </button>
            </form>

            <div className="data-table">
              <h4>Existing Localities</h4>
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Sub-District</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {localities.map(locality => (
                    <tr key={locality.locality_code}>
                      <td>{locality.locality_code}</td>
                      <td>{locality.locality_name}</td>
                      <td>{locality.sub_district_code}</td>
                      <td>
                        <button
                          onClick={() => handleDelete('locality', locality.locality_code)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Enumeration Area Tab */}
        {activeTab === 'enumerationArea' && (
          <div className="tab-content">
            <h3>Manage Enumeration Areas</h3>
            <form onSubmit={(e) => handleSubmit(e, 'enumerationArea')} className="data-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>EA Code</label>
                  <input
                    type="text"
                    name="ea_code"
                    value={formData.enumerationArea.ea_code}
                    onChange={(e) => handleChange(e, 'enumerationArea')}
                    required
                    maxLength="10"
                  />
                </div>
                <div className="form-group">
                  <label>Locality</label>
                  <select
                    name="locality_code"
                    value={formData.enumerationArea.locality_code}
                    onChange={(e) => handleChange(e, 'enumerationArea')}
                    required
                    onClick={(e)=>loadTabData('locality')}
                  >
                    <option value="">Select Locality</option>
                    {localities.map(locality => (
                      <option key={locality.locality_code} value={locality.locality_code}>
                        {locality.locality_code} - {locality.locality_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>EA Type</label>
                  <input
                    type="text"
                    name="ea_type"
                    value={formData.enumerationArea.ea_type}
                    onChange={(e) => handleChange(e, 'enumerationArea')}
                  />
                </div>
                <div className="form-group">
                  <label>EA Number</label>
                  <input
                    type="text"
                    name="ea_number"
                    value={formData.enumerationArea.ea_number}
                    onChange={(e) => handleChange(e, 'enumerationArea')}
                    maxLength="10"
                  />
                </div>
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create Enumeration Area'}
              </button>
            </form>

            <div className="data-table">
              <h4>Existing Enumeration Areas</h4>
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Number</th>
                    <th>Locality</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enumerationAreas.map(ea => (
                    <tr key={ea.ea_code}>
                      <td>{ea.ea_code}</td>
                      <td>{ea.ea_type}</td>
                      <td>{ea.ea_number}</td>
                      <td>{ea.locality_code}</td>
                      <td>
                        <button
                          onClick={() => handleDelete('enumerationArea', ea.ea_code)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <style jsx>{`
        .geographic-container {
          display: flex;
          min-height: 100vh;
          background-color: #f5f7fa;
        }

        .sidebar {
          width: 250px;
          background-color: #2d3748;
          color: white;
          padding: 1.5rem;
          position: fixed;
          height: 100vh;
        }

        .sidebar h2 {
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }

        .tabs {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tab-button {
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          color: white;
          text-align: left;
          cursor: pointer;
          border-radius: 0.25rem;
          transition: background-color 0.2s;
        }

        .tab-button:hover {
          background-color: #4a5568;
        }

        .tab-button.active {
          background-color: #4299e1;
          font-weight: 500;
        }

        .main-content {
          margin-left: 250px;
          flex: 1;
          padding: 2rem;
        }

        .tab-content {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .tab-content h3 {
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          color: #2d3748;
        }

        .data-form {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          color: #4a5568;
          font-weight: 500;
        }

        .form-group input,
        .form-group select {
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
        }

        .submit-button {
          background-color: #4299e1;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.375rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #3182ce;
        }

        .submit-button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
        }

        .data-table {
          overflow-x: auto;
        }

        .data-table h4 {
          margin-bottom: 1rem;
          font-size: 1.125rem;
          color: #2d3748;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background-color: white;
        }

        th,
        td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        th {
          background-color: #f7fafc;
          font-weight: 600;
          color: #4a5568;
        }

        .delete-button {
          background-color: #f56565;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .delete-button:hover {
          background-color: #e53e3e;
        }

        .toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          padding: 1rem 1.5rem;
          border-radius: 0.375rem;
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out;
        }

        .toast.success {
          background-color: #48bb78;
        }

        .toast.error {
          background-color: #f56565;
        }

        @keyframes slideIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .geographic-container {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            height: auto;
            position: static;
          }

          .main-content {
            margin-left: 0;
          }

          .tabs {
            flex-direction: row;
            overflow-x: auto;
          }

          .tab-button {
            white-space: nowrap;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}