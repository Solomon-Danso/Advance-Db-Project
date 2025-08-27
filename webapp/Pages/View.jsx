import { useState, useEffect } from 'react';
import apiClient from './Utils';
import { useRouter } from 'next/navigation';

export default function DataViewPage() {
  const [activeTab, setActiveTab] = useState('households');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({});

  const tabs = [
    { id: 'households', label: 'Households' },
    { id: 'persons', label: 'Persons' },
    { id: 'housing', label: 'Housing Conditions' },
    { id: 'education', label: 'Education' },
    { id: 'economic', label: 'Economic Activity' },
    { id: 'disability', label: 'Disability' },
    { id: 'fertility', label: 'Fertility' },
    { id: 'agriculture', label: 'Agriculture' },
  ];

  const columns = {
    households: [
      { header: 'HH ID', accessor: 'household_id' },
      { header: 'EA Code', accessor: 'ea_code' },
      { header: 'Structure No', accessor: 'structure_number' },
      { header: 'HH No', accessor: 'household_number' },
      { header: 'Type', accessor: 'type_of_residence' },
      { header: 'Address', accessor: 'detailed_address' }
    ],
    persons: [
      { header: 'Person ID', accessor: 'person_id' },
      { header: 'Name', accessor: 'full_name' },
      { header: 'Relationship', accessor: 'relationship_to_head' },
      { header: 'Sex', accessor: 'sex' },
      { header: 'Age', accessor: 'age' },
      { header: 'Nationality', accessor: 'nationality' }
    ],
    // Define columns for other tabs
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let endpoint = '';
        let params = {
          page: pagination.current,
          per_page: pagination.pageSize,
          ...filters
        };

        switch (activeTab) {
          case 'households':
            endpoint = '/households';
            break;
          case 'persons':
            endpoint = '/persons';
            break;
          case 'housing':
            endpoint = '/housing-conditions';
            break;
          // Add cases for other endpoints
          default:
            break;
        }

        const response = await apiClient.request('GET', endpoint, null, {
          params: new URLSearchParams(params).toString()
        });

        setData(response.data || response);
        setPagination(prev => ({
          ...prev,
          total: response.total || response.length
        }));
      } catch (error) {
        console.error(`Error fetching ${activeTab} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, pagination.current, filters]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPagination(prev => ({ ...prev, current: 1 }));
    setFilters({});
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const router = useRouter();


  return (
    <div className="data-view-container">
      <div className="sidebar">
        <h2>Census System</h2>
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
          <div onClick={()=>router.push("/GeoGraphy")}>Geographical</div>
        </div>
      </div>

      <div className="main-content">
        <div className="filters">
          {columns[activeTab]?.map(column => (
            <div key={column.accessor} className="filter-group">
              <label>{column.header}</label>
              <input
                type="text"
                placeholder={`Filter ${column.header}`}
                onChange={(e) => handleFilterChange(column.accessor, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="data-table-container">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : (
            <>
              <table className="data-table">
                <thead>
                  <tr>
                    {columns[activeTab]?.map(column => (
                      <th key={column.accessor}>{column.header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {columns[activeTab]?.map(column => (
                        <td key={`${index}-${column.accessor}`}>
                          {row[column.accessor]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {data.length === 0 && (
                <div className="no-data">
                  No {activeTab} data found
                </div>
              )}
            </>
          )}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.current - 1)}
            disabled={pagination.current === 1}
          >
            Previous
          </button>
          <span>
            Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
          </span>
          <button
            onClick={() => handlePageChange(pagination.current + 1)}
            disabled={pagination.current * pagination.pageSize >= pagination.total}
          >
            Next
          </button>
        </div>
      </div>

      <style jsx>{`
        .data-view-container {
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

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 150px;
        }

        .filter-group label {
          font-size: 0.75rem;
          color: #4a5568;
        }

        .filter-group input {
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }

        .data-table-container {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th,
        .data-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        .data-table th {
          background-color: #f7fafc;
          font-weight: 600;
          color: #4a5568;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .data-table tr:hover {
          background-color: #f7fafc;
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          gap: 1rem;
        }

        .spinner {
          width: 2.5rem;
          height: 2.5rem;
          border: 0.25rem solid rgba(66, 153, 225, 0.2);
          border-top-color: #4299e1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .no-data {
          padding: 2rem;
          text-align: center;
          color: #718096;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .pagination button {
          padding: 0.5rem 1rem;
          background-color: #edf2f7;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .pagination button:hover:not(:disabled) {
          background-color: #e2e8f0;
        }

        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .data-view-container {
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

          .data-table {
            font-size: 0.875rem;
          }

          .data-table th,
          .data-table td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}