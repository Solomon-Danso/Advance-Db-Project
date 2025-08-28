import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import "./Champion.css";





ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    households: 0,
    persons: 0,
    housing: 0,
    education: 0,
    economic: 0,
    disability: 0,
    fertility: 0,
    agricultural: 0
  });

  const [chartData, setChartData] = useState({
    gender: { male: 0, female: 0 },
    education: {},
    housing: {},
    economic: {}
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Fetch counts from your API endpoints
      const endpoints = [
        '/api/households',
        '/api/persons',
        '/api/housing-conditions',
        '/api/educations',
        '/api/economic-activities',
        '/api/disabilities',
        '/api/fertilities',
        '/api/agricultural-activities'
      ];

      const responses = await Promise.all(
        endpoints.map(endpoint => 
          fetch(endpoint)
            .then(res => res.json())
            .catch(error => {
              console.error(`Error fetching ${endpoint}:`, error);
              return [];
            })
        )
      );

      // Update basic counts
      setStats({
        households: responses[0].length,
        persons: responses[1].length,
        housing: responses[2].length,
        education: responses[3].length,
        economic: responses[4].length,
        disability: responses[5].length,
        fertility: responses[6].length,
        agricultural: responses[7].length
      });

      // Process data for charts
      processChartData(responses);
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const processChartData = (responses) => {
    const persons = responses[1];
    const housing = responses[2];
    const education = responses[3];
    const economic = responses[4];

    // Gender distribution
    const maleCount = persons.filter(p => p.sex === 'Male').length;
    const femaleCount = persons.filter(p => p.sex === 'Female').length;

    // Education levels
    const educationLevels = education.reduce((acc, curr) => {
      const level = curr.highest_level_schooling;
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    // Housing types
    const housingTypes = housing.reduce((acc, curr) => {
      const type = curr.dwelling_type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Economic activities
    const employmentStatus = economic.reduce((acc, curr) => {
      const status = curr.employment_status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    setChartData({
      gender: { male: maleCount, female: femaleCount },
      education: educationLevels,
      housing: housingTypes,
      economic: employmentStatus
    });
  };

  // Chart data configurations
  const genderChartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [chartData.gender.male, chartData.gender.female],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

  const educationChartData = {
    labels: Object.keys(chartData.education),
    datasets: [
      {
        label: 'Education Levels',
        data: Object.values(chartData.education),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const housingChartData = {
    labels: Object.keys(chartData.housing),
    datasets: [
      {
        label: 'Dwelling Types',
        data: Object.values(chartData.housing),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ]
      }
    ]
  };

  const economicChartData = {
    labels: Object.keys(chartData.economic),
    datasets: [
      {
        label: 'Employment Status',
        data: Object.values(chartData.economic),
        backgroundColor: [
          '#FF9F40', '#FF6384', '#36A2EB', '#4BC0C0',
          '#9966FF', '#FF6384', '#C9CBCF', '#FFCE56'
        ]
      }
    ]
  };

  const StatCard = ({ title, value, icon, color, endpoint }) => (
    <div 
      className="stat-card" 
      style={{ borderLeft: `4px solid ${color}` }}
      onClick={() => window.location.hash = endpoint}
    >
      <div className="stat-content">
        <h3>{title}</h3>
        <h2>{loading ? 'Loading...' : value.toLocaleString()}</h2>
      </div>
      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Census Data Analytics Dashboard</h1>
        <p>Real-time overview of collected census data</p>
        <button onClick={loadDashboardData} className="refresh-btn">
          🔄 Refresh Data
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Households"
          value={stats.households}
          icon="🏠"
          color="#36A2EB"
          endpoint="household"
        />
        <StatCard
          title="Total Persons"
          value={stats.persons}
          icon="👥"
          color="#FF6384"
          endpoint="person"
        />
        <StatCard
          title="Housing Records"
          value={stats.housing}
          icon="🏡"
          color="#FFCE56"
          endpoint="housing"
        />
        <StatCard
          title="Education Records"
          value={stats.education}
          icon="🎓"
          color="#4BC0C0"
          endpoint="education"
        />
        <StatCard
          title="Economic Activities"
          value={stats.economic}
          icon="💼"
          color="#9966FF"
          endpoint="economic"
        />
        <StatCard
          title="Disability Records"
          value={stats.disability}
          icon="♿"
          color="#FF9F40"
          endpoint="disability"
        />
        <StatCard
          title="Fertility Records"
          value={stats.fertility}
          icon="👶"
          color="#FF6384"
          endpoint="fertility"
        />
        <StatCard
          title="Agricultural Activities"
          value={stats.agricultural}
          icon="🌾"
          color="#2ecc71"
          endpoint="agricultural"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Gender Distribution ({stats.persons} persons)</h3>
          <div className="chart-container">
            {stats.persons > 0 ? (
              <Doughnut data={genderChartData} />
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>Education Levels ({stats.education} records)</h3>
          <div className="chart-container">
            {stats.education > 0 ? (
              <Bar data={educationChartData} options={{ responsive: true }} />
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>Housing Types ({stats.housing} records)</h3>
          <div className="chart-container">
            {stats.housing > 0 ? (
              <Pie data={housingChartData} />
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>Employment Status ({stats.economic} records)</h3>
          <div className="chart-container">
            {stats.economic > 0 ? (
              <Pie data={economicChartData} />
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>
      </div>

      <div className="data-summary">
        <h2>Data Collection Progress</h2>
        <div className="progress-grid">
          <div className="progress-item">
            <span className="progress-label">Households</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(stats.households / Math.max(stats.households, 1)) * 100}%` }}
              ></div>
            </div>
            <span className="progress-value">{stats.households}</span>
          </div>
          <div className="progress-item">
            <span className="progress-label">Persons</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(stats.persons / Math.max(stats.households * 5, 1)) * 100}%` }}
              ></div>
            </div>
            <span className="progress-value">{stats.persons}</span>
          </div>
          <div className="progress-item">
            <span className="progress-label">Completed Profiles</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(stats.housing / Math.max(stats.households, 1)) * 100}%` }}
              ></div>
            </div>
            <span className="progress-value">{stats.housing}/{stats.households}</span>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button onClick={() => window.location.hash = 'household'} className="action-btn">
            ➕ Add Household
          </button>
          <button onClick={() => window.location.hash = 'person'} className="action-btn">
            👥 Add Person
          </button>
          <button onClick={() => window.location.hash = 'housing'} className="action-btn">
            🏡 Add Housing Data
          </button>
          <button onClick={() => window.location.hash = 'education'} className="action-btn">
            🎓 Add Education Data
          </button>
          <button onClick={() => window.location.hash = 'economic'} className="action-btn">
            💼 Add Economic Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;