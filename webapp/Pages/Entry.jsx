import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from './Utils';
import './Champion.css';

export default function DataEntryPage() {
  const [activeTab, setActiveTab] = useState('household');

const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [localities, setLocalities] = useState([]);

 


  const [formData, setFormData] = useState({
    // Household Data
    household: {
      ea_code: '',
      structure_number: '',
      household_number: '',
      type_of_residence: 'Occupied',
      detailed_address: '',
      contact_phone1: '',
      contact_phone2: '',
      nhis_ecg_vra_number: '',
      date_started: '',
      date_completed: '',
      total_visits: 1,
      form_number: ''
    },
    // Person Data
    person: {
      full_name: '',
      relationship_to_head: 'Head',
      sex: 'Male',
      date_of_birth: '',
      age: '',
      nationality: 'Ghanaian by birth',
      ethnicity_code: '',
      ethnicity_name: '',
      born_in_locality: false,
      birth_region_country_code: '',
      birth_region_country_name: '',
      lived_in_locality_since_birth: false,
      years_lived_in_locality: '',
      religion: 'Christian',
      marital_status: 'Never married',
      present_on_census_night: true,
      status: 'Usual member present'
    },
    // Housing Condition
    housing: {
      dwelling_type: 'Separate house',
      outer_wall_material: 'Cement blocks/concrete',
      floor_material: 'Cement/Concrete',
      roof_material: 'Metal sheet',
      tenure_arrangement: 'Owner occupied',
      ownership_type: 'Owned by household member',
      total_rooms: 1,
      sleeping_rooms: 1,
      shared_sleeping_rooms: false,
      households_sharing_sleeping_rooms: 0,
      lighting_source: 'Electricity (main)',
      drinking_water_source: 'Pipe-borne inside dwelling',
      other_water_source: 'Pipe-borne inside dwelling',
      cooking_fuel: 'Gas',
      cooking_space: 'Separate room for exclusive use of household',
      bathing_facility: 'Own bathroom for exclusive use',
      toilet_facility: 'WC',
      shared_toilet: false,
      households_sharing_toilet: 0,
      solid_waste_disposal: 'Collected',
      liquid_waste_disposal: 'Through the sewage system'
    },
    // Education
    education: {
      literacy_language: '',
      ever_attended_school: true,
      highest_level_schooling: 'Primary',
      highest_grade_completed: 1
    },
    // Economic Activity
    economic_activity: {
      engaged_in_activity: true,
      engagement_status: 'Employee',
      reason_not_seeking_work: '',
      occupation_code: '',
      occupation_description: '',
      industry_establishment_name: '',
      industry_establishment_location: '',
      industry_product_service: '',
      employment_status: 'Employee',
      employment_sector: 'Private Formal'
    },
    // Disability
    disability: {
      has_disability: false,
      sight_disability: false,
      hearing_disability: false,
      speech_disability: false,
      physical_disability: false,
      intellectual_disability: false,
      emotional_disability: false,
      other_disability: false,
      other_disability_description: '',
      owns_mobile_phone: false,
      uses_internet: false
    },
    // Fertility
    fertility: {
      children_ever_born_male: 0,
      children_ever_born_female: 0,
      children_surviving_male: 0,
      children_surviving_female: 0,
      children_born_past_12_months_male: 0,
      children_born_past_12_months_female: 0
    },
    // Agricultural Activity
    agriculture: {
      engaged_in_agriculture: false,
      crop_farming: false,
      tree_growing: false,
      livestock_rearing: false,
      fish_farming: false,
      male_engaged: 0,
      female_engaged: 0
    }
  });
  const [enumerationAreas, setEnumerationAreas] = useState([]);
  const [households, setHouseholds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     try {
  //       setLoading(true);
  //       const [eas, hhs] = await Promise.all([
  //         apiClient.request('GET', '/enumeration-areas'),
  //         apiClient.request('GET', '/households?per_page=100')
  //       ]);
  //       setEnumerationAreas(eas);
  //       setHouseholds(hhs.data);
  //     } catch (error) {
  //       showToast('Failed to load initial data', 'error');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchInitialData();
  // }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };



  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleNumberChange = (e, section) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value === '' ? '' : Number(value)
      }
    }));
  };

useEffect(() => {
  // Load initial data for the first tab
  loadTabData(activeTab);
}, []);

useEffect(() => {

householdData()
}, []);

const [bulkHousehold, setBulkHousehold] = useState([]);
const [bulkHousing, setBulkHousing] = useState([]);

const householdData = async () => {
 const regionsData = await apiClient.request('GET', '/households');
 setBulkHousehold(regionsData || []);

}


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




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First create household if we're on that tab
      if (activeTab === 'household') {
        const household = await apiClient.request('POST', '/households', formData.household);
        showToast('Household created successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

      // For person-related data, we need a household ID
      if (!formData.household.household_id && activeTab !== 'household') {
        showToast('Please select a household first', 'error');
        setActiveTab('household');
        return;
      }

      // Submit data based on active tab
      let endpoint = '';
      let data = {};

      switch (activeTab) {
        case 'person':
          endpoint = '/persons';
          data = { ...formData.person, household_id: formData.household.household_id };
          break;
        case 'housing':
          endpoint = `/households/${formData.household.household_id}/housing-condition`;
          data = formData.housing;
          break;
        case 'education':
          endpoint = `/persons/${formData.person.person_id}/education`;
          data = formData.education;
          break;
        // Add cases for other tabs
        default:
          break;
      }

      const response = await apiClient.request('POST', endpoint, data);

      
      showToast(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} data saved successfully!`);
    
   
      // If we just created a person, store the ID for related records
      if (activeTab === 'person' && !formData.person.person_id) {
        setFormData(prev => ({
          ...prev,
          person: { ...prev.person, person_id: response.id }
        }));
      }
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
        window.location.reload();
    }
  };

  const tabs = [
    { id: 'household', label: 'Household' },
     { id: 'housing', label: 'Housing Condition' },
    { id: 'person', label: 'Person' },
    { id: 'education', label: 'Education' },
    { id: 'economic_activity', label: 'Economic Activity' },
    { id: 'disability', label: 'Disability' },
    { id: 'fertility', label: 'Fertility' },
    { id: 'agriculture', label: 'Agriculture' }
  ];


  const handleDelete = async (section, code) => {
    if (!confirm(`Are you sure you want to delete this ${section}?`)) return;

    try {
      setLoading(true);
      let endpoint = '';
      
      switch (section) {
        case 'household':
          endpoint = `/deletehouseholds/${code}`;
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
      setLoading(false);
      window.location.reload();
    }
  };


  return (
    <div className="data-entry-container">
      <div className="sidebar">
        <h2>Census Data Entry</h2>
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
        </div>
      </div>

      <div className="main-content">
        <form onSubmit={handleSubmit} className="data-entry-form">
          {/* Household Tab */}
          {activeTab === 'household' && (
            <div className="form-section">
              <h3>Household Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>EA Code</label>
                  <select
                    name="ea_code"
                    value={formData.household.ea_code}
                    onChange={(e) => handleChange(e, 'household')}
                    required
                    onClick={(e)=>loadTabData('enumerationArea')}
                  >
                    <option value="1">Select EA</option>
                    {enumerationAreas.map(ea => (
                      <option key={ea.ea_code} value={ea.ea_code}>
                        {ea.ea_code} - {ea.ea_type}
                      </option>
                    ))}


                  </select>
                </div>

                <div className="form-group">
                  <label>Structure Number</label>
                  <input
                    type="text"
                    name="structure_number"
                    value={formData.household.structure_number}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>

                  <div className="form-group">
                  <label>Household Number</label>
                  <input
                    type="text"
                    name="household_number"
                    value={formData.household.household_number}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>

                 <div className="form-group">
                  <label>Type of residence</label>
                  <input
                    type="text"
                    name="type_of_residence"
                    value={formData.household.type_of_residence}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>

                <div className="form-group">
                  <label>Detailed Address</label>
                  <input
                    type="text"
                    name="detailed_address"
                    value={formData.household.detailed_address}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>

                 <div className="form-group">
                  <label>Contact Phone1</label>
                  <input
                    type="text"
                    name="contact_phone1"
                    value={formData.household.contact_phone1}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>

                <div className="form-group">
                  <label>Contact Phone2</label>
                  <input
                    type="text"
                    name="contact_phone2"
                    value={formData.household.contact_phone2}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>

                <div className="form-group">
                  <label>Date Started</label>
                  <input
                    type="date"
                    name="date_started"
                    value={formData.household.date_started}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>

                 <div className="form-group">
                  <label>Date Completed</label>
                  <input
                    type="date"
                    name="date_completed"
                    value={formData.household.date_completed}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>

                 <div className="form-group">
                  <label>Total Visits</label>
                  <input
                    type="number"
                    name="total_visits"
                    value={formData.household.total_visits}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>

                <div className="form-group">
                  <label>Form number</label>
                  <input
                    type="number"
                    name="form_number"
                    value={formData.household.form_number}
                    onChange={(e) => handleChange(e, 'household')}
                  />
                </div>


                {/* Add all other household fields following the same pattern */}
              </div>



            </div>
          )}



          {activeTab === 'housing' && (
  <div className="form-section">
    <h3>Housing Condition Information</h3>
    <div className="form-grid">
      {/* Household ID */}
      <div className="form-group">
        <label>Household ID</label>
        <select
          name="household_id"
          value={formData.housing.household_id}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Household</option>
          {bulkHousehold.map(household => (
            <option key={household.household_id} value={household.household_id}>
              {household.household_id} - {household.detailed_address}
            </option>
          ))}
        </select>
      </div>

      {/* Dwelling Type */}
      <div className="form-group">
        <label>Dwelling Type</label>
        <select
          name="dwelling_type"
          value={formData.housing.dwelling_type}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Dwelling Type</option>
          <option value="Separate house">Separate house</option>
          <option value="Semi-detached house">Semi-detached house</option>
          <option value="Flat/Apartment">Flat/Apartment</option>
          <option value="Compound house">Compound house</option>
          <option value="Huts/Buildings (same compound)">Huts/Buildings (same compound)</option>
          <option value="Huts/Buildings (different compounds)">Huts/Buildings (different compounds)</option>
          <option value="Tent">Tent</option>
          <option value="Improvised home">Improvised home</option>
          <option value="Living quarters attached to office/shop">Living quarters attached to office/shop</option>
          <option value="Uncompleted building">Uncompleted building</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Outer Wall Material */}
      <div className="form-group">
        <label>Outer Wall Material</label>
        <select
          name="outer_wall_material"
          value={formData.housing.outer_wall_material}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Outer Wall Material</option>
          <option value="Mud bricks/earth">Mud bricks/earth</option>
          <option value="Wood">Wood</option>
          <option value="Metal sheet/slate/asbestos">Metal sheet/slate/asbestos</option>
          <option value="Stone">Stone</option>
          <option value="Burnt bricks">Burnt bricks</option>
          <option value="Cement blocks/concrete">Cement blocks/concrete</option>
          <option value="Landcrete">Landcrete</option>
          <option value="Bamboo">Bamboo</option>
          <option value="Palm leaves/Thatch (grass)/Raffia">Palm leaves/Thatch (grass)/Raffia</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Floor Material */}
      <div className="form-group">
        <label>Floor Material</label>
        <select
          name="floor_material"
          value={formData.housing.floor_material}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Floor Material</option>
          <option value="Earth/Mud">Earth/Mud</option>
          <option value="Cement/Concrete">Cement/Concrete</option>
          <option value="Stone">Stone</option>
          <option value="Burnt bricks">Burnt bricks</option>
          <option value="Wood">Wood</option>
          <option value="Vinyl tiles">Vinyl tiles</option>
          <option value="Ceramic/Porcelain/Granite/Marble tiles">Ceramic/Porcelain/Granite/Marble tiles</option>
          <option value="Terrazzo/Terrazzo tiles">Terrazzo/Terrazzo tiles</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Roof Material */}
      <div className="form-group">
        <label>Roof Material</label>
        <select
          name="roof_material"
          value={formData.housing.roof_material}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Roof Material</option>
          <option value="Mud/Mud bricks/Earth">Mud/Mud bricks/Earth</option>
          <option value="Wood">Wood</option>
          <option value="Metal sheet">Metal sheet</option>
          <option value="Slate/Asbestos">Slate/Asbestos</option>
          <option value="Cement/Concrete">Cement/Concrete</option>
          <option value="Roofing Tiles">Roofing Tiles</option>
          <option value="Bamboo">Bamboo</option>
          <option value="Thatch/Palm leaves or Raffia">Thatch/Palm leaves or Raffia</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Tenure Arrangement */}
      <div className="form-group">
        <label>Tenure Arrangement</label>
        <select
          name="tenure_arrangement"
          value={formData.housing.tenure_arrangement}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Tenure Arrangement</option>
          <option value="Owner occupied">Owner occupied</option>
          <option value="Rent free">Rent free</option>
          <option value="Perching">Perching</option>
          <option value="Squatting">Squatting</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Ownership Type */}
      <div className="form-group">
        <label>Ownership Type</label>
        <select
          name="ownership_type"
          value={formData.housing.ownership_type}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Ownership Type</option>
          <option value="Owned by household member">Owned by household member</option>
          <option value="Being purchased">Being purchased</option>
          <option value="Relative not household member">Relative not household member</option>
          <option value="Other private individual">Other private individual</option>
          <option value="Private employer">Private employer</option>
          <option value="Other private agency">Other private agency</option>
          <option value="Public/Government ownership">Public/Government ownership</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Total Rooms */}
      <div className="form-group">
        <label>Total Rooms</label>
        <input
          type="number"
          name="total_rooms"
          value={formData.housing.total_rooms}
          onChange={(e) => handleChange(e, 'housing')}
          min="0"
        />
      </div>

      {/* Sleeping Rooms */}
      <div className="form-group">
        <label>Sleeping Rooms</label>
        <input
          type="number"
          name="sleeping_rooms"
          value={formData.housing.sleeping_rooms}
          onChange={(e) => handleChange(e, 'housing')}
          min="0"
        />
      </div>

      {/* Shared Sleeping Rooms */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="shared_sleeping_rooms"
            checked={formData.housing.shared_sleeping_rooms || false}
            onChange={(e) => handleChange(e, 'housing')}
          />
          Shared Sleeping Rooms
        </label>
      </div>

      {/* Households Sharing Sleeping Rooms */}
      <div className="form-group">
        <label>Households Sharing Sleeping Rooms</label>
        <input
          type="number"
          name="households_sharing_sleeping_rooms"
          value={formData.housing.households_sharing_sleeping_rooms}
          onChange={(e) => handleChange(e, 'housing')}
          min="0"
        />
      </div>

      {/* Lighting Source */}
      <div className="form-group">
        <label>Lighting Source</label>
        <select
          name="lighting_source"
          value={formData.housing.lighting_source}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Lighting Source</option>
          <option value="Electricity (main)">Electricity (main)</option>
          <option value="Electricity (private generator)">Electricity (private generator)</option>
          <option value="Kerosene lamp">Kerosene lamp</option>
          <option value="Gas lamp">Gas lamp</option>
          <option value="Solar energy">Solar energy</option>
          <option value="Candle">Candle</option>
          <option value="Flashlight/Torch">Flashlight/Torch</option>
          <option value="Firewood">Firewood</option>
          <option value="Crop residue">Crop residue</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Drinking Water Source */}
      <div className="form-group">
        <label>Drinking Water Source</label>
        <select
          name="drinking_water_source"
          value={formData.housing.drinking_water_source}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Drinking Water Source</option>
          <option value="Pipe-borne inside dwelling">Pipe-borne inside dwelling</option>
          <option value="Pipe-borne outside dwelling">Pipe-borne outside dwelling</option>
          <option value="Public tap/Standpipe">Public tap/Standpipe</option>
          <option value="Borehole/Pump/Tube well">Borehole/Pump/Tube well</option>
          <option value="Protected well">Protected well</option>
          <option value="Rain water">Rain water</option>
          <option value="Protected spring">Protected spring</option>
          <option value="Bottled water">Bottled water</option>
          <option value="Sachet water">Sachet water</option>
          <option value="Tanker supply/Vendor provided">Tanker supply/Vendor provided</option>
          <option value="Unprotected well">Unprotected well</option>
          <option value="Unprotected spring">Unprotected spring</option>
          <option value="River/Stream">River/Stream</option>
          <option value="Dugout/Pond/Lake/Dam/Canal">Dugout/Pond/Lake/Dam/Canal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Other Water Source */}
      <div className="form-group">
        <label>Other Water Source</label>
        <select
          name="other_water_source"
          value={formData.housing.other_water_source}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Other Water Source</option>
          <option value="Pipe-borne inside dwelling">Pipe-borne inside dwelling</option>
          <option value="Pipe-borne outside dwelling">Pipe-borne outside dwelling</option>
          <option value="Public tap/Standpipe">Public tap/Standpipe</option>
          <option value="Borehole/Pump/Tube well">Borehole/Pump/Tube well</option>
          <option value="Protected well">Protected well</option>
          <option value="Rain water">Rain water</option>
          <option value="Protected spring">Protected spring</option>
          <option value="Tanker supply/Vendor provided">Tanker supply/Vendor provided</option>
          <option value="Unprotected well">Unprotected well</option>
          <option value="Unprotected spring">Unprotected spring</option>
          <option value="River/Stream">River/Stream</option>
          <option value="Dugout/Pond/Lake/Dam/Canal">Dugout/Pond/Lake/Dam/Canal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Cooking Fuel */}
      <div className="form-group">
        <label>Cooking Fuel</label>
        <select
          name="cooking_fuel"
          value={formData.housing.cooking_fuel}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Cooking Fuel</option>
          <option value="None, no cooking">None, no cooking</option>
          <option value="Wood">Wood</option>
          <option value="Gas">Gas</option>
          <option value="Electricity">Electricity</option>
          <option value="Kerosene">Kerosene</option>
          <option value="Charcoal">Charcoal</option>
          <option value="Crop residue">Crop residue</option>
          <option value="Saw dust">Saw dust</option>
          <option value="Animal waste">Animal waste</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Cooking Space */}
      <div className="form-group">
        <label>Cooking Space</label>
        <select
          name="cooking_space"
          value={formData.housing.cooking_space}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Cooking Space</option>
          <option value="No cooking">No cooking</option>
          <option value="Separate room for exclusive use of household">Separate room for exclusive use of household</option>
          <option value="Separate room shared with other household(s)">Separate room shared with other household(s)</option>
          <option value="Enclosure without roof">Enclosure without roof</option>
          <option value="Structure with roof but without walls">Structure with roof but without walls</option>
          <option value="Bedroom/Hall/Living room">Bedroom/Hall/Living room</option>
          <option value="Veranda">Veranda</option>
          <option value="Open space in compound">Open space in compound</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Bathing Facility */}
      <div className="form-group">
        <label>Bathing Facility</label>
        <select
          name="bathing_facility"
          value={formData.housing.bathing_facility}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Bathing Facility</option>
          <option value="Own bathroom for exclusive use">Own bathroom for exclusive use</option>
          <option value="Shared separate bathroom in same house">Shared separate bathroom in same house</option>
          <option value="Private open cubicle">Private open cubicle</option>
          <option value="Shared open cubicle">Shared open cubicle</option>
          <option value="Public bath house">Public bath house</option>
          <option value="Bathroom in another house">Bathroom in another house</option>
          <option value="Open space around house">Open space around house</option>
          <option value="In a river, pond, lake or dam">In a river, pond, lake or dam</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Toilet Facility */}
      <div className="form-group">
        <label>Toilet Facility</label>
        <select
          name="toilet_facility"
          value={formData.housing.toilet_facility}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Toilet Facility</option>
          <option value="No facility">No facility</option>
          <option value="WC">WC</option>
          <option value="Pit latrine">Pit latrine</option>
          <option value="KVIP">KVIP</option>
          <option value="Bucket/Pan">Bucket/Pan</option>
          <option value="Public toilet">Public toilet</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Shared Toilet */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="shared_toilet"
            checked={formData.housing.shared_toilet || false}
            onChange={(e) => handleChange(e, 'housing')}
          />
          Shared Toilet
        </label>
      </div>

      {/* Households Sharing Toilet */}
      <div className="form-group">
        <label>Households Sharing Toilet</label>
        <input
          type="number"
          name="households_sharing_toilet"
          value={formData.housing.households_sharing_toilet}
          onChange={(e) => handleChange(e, 'housing')}
          min="0"
        />
      </div>

      {/* Solid Waste Disposal */}
      <div className="form-group">
        <label>Solid Waste Disposal</label>
        <select
          name="solid_waste_disposal"
          value={formData.housing.solid_waste_disposal}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Solid Waste Disposal</option>
          <option value="Collected">Collected</option>
          <option value="Burned by household">Burned by household</option>
          <option value="Public dump (Container)">Public dump (Container)</option>
          <option value="Public dump (Open space)">Public dump (Open space)</option>
          <option value="Dumped indiscriminately">Dumped indiscriminately</option>
          <option value="Buried by household">Buried by household</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Liquid Waste Disposal */}
      <div className="form-group">
        <label>Liquid Waste Disposal</label>
        <select
          name="liquid_waste_disposal"
          value={formData.housing.liquid_waste_disposal}
          onChange={(e) => handleChange(e, 'housing')}
          required
        >
          <option value="">Select Liquid Waste Disposal</option>
          <option value="Through the sewage system">Through the sewage system</option>
          <option value="Through drainage system into a gutter">Through drainage system into a gutter</option>
          <option value="Through drainage into a pit (soak away)">Through drainage into a pit (soak away)</option>
          <option value="Thrown onto the street/outside">Thrown onto the street/outside</option>
          <option value="Thrown into gutter">Thrown into gutter</option>
          <option value="Thrown onto compound">Thrown onto compound</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  </div>
            )}




 

          {/* Person Tab */}
          {activeTab === 'person' && (
            <div className="form-section">
              <h3>Person Information</h3>
              
              <div className="form-group">
                <label>Household</label>
                <select
                  name="household_id"
                  value={formData.household.household_id}
                  onChange={(e) => handleChange(e, 'household')}
                  required
                >
                  <option value="">Select Household</option>
                  {households.map(hh => (
                    <option key={hh.household_id} value={hh.household_id}>
                      {hh.structure_number}/{hh.household_number} - {hh.ea_code}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.person.full_name}
                    onChange={(e) => handleChange(e, 'person')}
                    required
                  />
                </div>

                {/* Add all other person fields following the same pattern */}
              </div>
            </div>
          )}

          {/* Add similar sections for other tabs */}

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Data'}
            </button>
          </div>
        </form>

        {activeTab === 'household' && (
          <>
        
        <div className="data-table">
          <h4>Existing Household Information</h4>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Form Number</th>
                  <th>Ea Code</th>
                  <th>Structure Number</th>
                  <th>Household Number</th>
                  <th>Contact Phone1</th>
                  <th>Detailed Address</th>
                  <th>Total Visits</th>
                  <th>Type of residence</th>
                  <th>Date Started</th>
                  <th>Date Completed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bulkHousehold.map(region => (
                  <tr key={region.household_id}>
                    <td>{region.form_number}</td>
                    <td>{region.ea_code}</td>
                    <td>{region.structure_number}</td>
                    <td>{region.household_number}</td>
                    <td>{region.contact_phone1}</td>
                    <td>{region.detailed_address}</td>
                    <td>{region.total_visits}</td>
                    <td>{region.type_of_residence}</td>
                    <td>{region.date_started}</td>
                    <td>{region.date_completed}</td>
                    <td>
                      <button
                        onClick={() => handleDelete('household', region.household_id)}
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

        
        </>)}

        {activeTab === 'housing' && (
  <>
    <div className="data-table">
      <h4>Existing Housing Conditions</h4>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Household ID</th>
              <th>Dwelling Type</th>
              <th>Roof Material</th>
              <th>Wall Material</th>
              <th>Floor Material</th>
              <th>Toilet Facility</th>
              <th>Water Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bulkHousing.map(housing => (
              <tr key={housing.housing_id}>
                <td>{housing.household_id}</td>
                <td>{housing.dwelling_type}</td>
                <td>{housing.roof_material}</td>
                <td>{housing.outer_wall_material}</td>
                <td>{housing.floor_material}</td>
                <td>{housing.toilet_facility}</td>
                <td>{housing.drinking_water_source}</td>
                <td>
                  <button
                    onClick={() => handleDelete('housing', housing.housing_id)}
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
  </>
          )}





      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

     
    </div>
  );
}