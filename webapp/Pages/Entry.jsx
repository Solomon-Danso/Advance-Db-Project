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
      religion: 'Other Christian',
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
    economic: {
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

 
useEffect(() => {
  // Load initial data for the first tab
  loadTabData(activeTab);
}, []);

useEffect(() => {

householdData()
}, []);

const [bulkHousehold, setBulkHousehold] = useState([]);
const [bulkHousing, setBulkHousing] = useState([]);
const [bulkPerson, setBulkPerson] = useState([]);
const [bulkEducation, setbulkEducation] = useState([]);
const [bulkEconomic, setbulkEconomic] = useState([]);
const [bulkDisability, setbulkDisability] = useState([]);
const [bulkFertility, setbulkFertility] = useState([]);
const [bulkAgricultural, setbulkAgricultural] = useState([]);




const householdData = async () => {
 const regionsData = await apiClient.request('GET', '/households');
 setBulkHousehold(regionsData || []);

 const housingData = await apiClient.request('GET', '/housing-conditions');
 setBulkHousing(housingData || []);

 const personData = await apiClient.request('GET', '/persons');
 setBulkPerson(personData || []);

const educationData = await apiClient.request('GET', '/education');
 setbulkEducation(educationData || []);

const economicData = await apiClient.request('GET', '/economic-activities');
 setbulkEconomic(economicData || []);

const disabilityData = await apiClient.request('GET', '/disabilities');
 setbulkDisability(disabilityData || []);

const fertilityData = await apiClient.request('GET', '/fertilities');
 setbulkFertility(fertilityData || []);

const agricultureData = await apiClient.request('GET', '/agricultural-activities');
 setbulkAgricultural(agricultureData || []);





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

      if (activeTab === 'housing') {
        const household = await apiClient.request('POST', '/housing-conditions', formData.housing);
        showToast('Housing created successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

      if (activeTab === 'person') {
        const household = await apiClient.request('POST', '/persons', formData.person);
        showToast('Person created successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

      if (activeTab === 'education') {
        const household = await apiClient.request('POST', '/education', formData.education);
        showToast('Education created successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

       if (activeTab === 'economic') {
        const household = await apiClient.request('POST', '/economic-activities', formData.economic);
        showToast('Economic created successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

       if (activeTab === 'disability') {
        const household = await apiClient.request('POST', '/disabilities', formData.disability);
        showToast('Disability created successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }


       if (activeTab === 'fertility') {
        const household = await apiClient.request('POST', '/fertilities', formData.fertility);
        showToast('Fertility created successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

       if (activeTab === 'agriculture') {
        const household = await apiClient.request('POST', '/agricultural-activities', formData.agriculture);
        showToast('Agriculture created successfully!');
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
    householdData()
      setLoading(false);
      
    }
  };

    const handleUpdate = async (code) => {
   
    setLoading(true);

    try {
      // First create household if we're on that tab
      if (activeTab === 'household') {
        const household = await apiClient.request('PUT', `/households/${code}`, formData.household);
        showToast('Household updated successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

      if (activeTab === 'housing') {
        const household = await apiClient.request('PUT', `/housing-conditions/${code}`, formData.housing);
        showToast('Housing updated successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

      if (activeTab === 'person') {
        const household = await apiClient.request('PUT', `/persons/${code}`, formData.person);
        showToast('Person updated successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

      if (activeTab === 'education') {
        const household = await apiClient.request('PUT', `/education/${code}`, formData.education);
        showToast('Education updated successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

      if (activeTab === 'economic') {
        const household = await apiClient.request('PUT', `/economic-activities/${code}`, formData.economic);
        showToast('Economic updated successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

       if (activeTab === 'disability') {
        const household = await apiClient.request('PUT', `/disabilities/${code}`, formData.disability);
        showToast('Economic updated successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }

       if (activeTab === 'fertility') {
        const household = await apiClient.request('PUT', `/fertilities/${code}`, formData.fertility);
        showToast('Fertility updated successfully!');
        setHouseholds(prev => [...prev, household]);
        return;
      }


       if (activeTab === 'agriculture') {
        const household = await apiClient.request('PUT', `/agricultural-activities/${code}`, formData.agriculture);
        showToast('Agriculture updated successfully!');
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
    householdData()
      setLoading(false);
      
    }
  };

  const tabs = [
    { id: 'household', label: 'Household' },
    { id: 'housing', label: 'Housing Condition' },
    { id: 'person', label: 'Person' },
    { id: 'education', label: 'Education' },
    { id: 'economic', label: 'Economic Activity' },
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
        case 'housing':
          endpoint = `/housing-conditions/${code}`;
          break;
        case 'person':
          endpoint = `/persons/${code}`;
          break;
        case 'locality':
          endpoint = `/geographic/localities/${code}`;
          break;
        case 'enumerationArea':
          endpoint = `/geographic/enumeration-areas/${code}`;
          break;

        case 'education':
          endpoint = `/education/${code}`;
          break;

        case 'economic':
          endpoint = `/economic-activities/${code}`;
          break;

         case 'disability':
          endpoint = `/disabilities/${code}`;
          break;

        case 'fertility':
          endpoint = `/fertilities/${code}`;
          break;

           case 'agriculture':
          endpoint = `/agricultural-activities/${code}`;
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
        <div onClick={()=>{router.push("/GeoData")}}>Enter Geographic Data</div>
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
              {household.household_number} - {household.structure_number}
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



          {activeTab === 'person' && (
            <div className="form-section">
              <h3>Person Information</h3>
              <div className="form-grid">
                {/* Household ID */}
                <div className="form-group">
                  <label>Household</label>
                  <select
                    name="household_id"
                    value={formData.person.household_id}
                    onChange={(e) => handleChange(e, 'person')}
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

                {/* Full Name */}
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

                {/* Relationship to Head */}
                <div className="form-group">
                  <label>Relationship to Head</label>
                  <select
                    name="relationship_to_head"
                    value={formData.person.relationship_to_head}
                    onChange={(e) => handleChange(e, 'person')}
                    required
                  >
                    <option value="">Select Relationship</option>
                    <option value="Head">Head</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent/Parent in-law">Parent/Parent in-law</option>
                    <option value="Son/Daughter in-law">Son/Daughter in-law</option>
                    <option value="Grandchild">Grandchild</option>
                    <option value="Brother/Sister">Brother/Sister</option>
                    <option value="Step child">Step child</option>
                    <option value="Foster child">Foster child</option>
                    <option value="Other relative">Other relative</option>
                    <option value="Non-relative">Non-relative</option>
                  </select>
                </div>

                {/* Sex */}
                <div className="form-group">
                  <label>Sex</label>
                  <select
                    name="sex"
                    value={formData.person.sex}
                    onChange={(e) => handleChange(e, 'person')}
                    required
                  >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.person.date_of_birth}
                    onChange={(e) => handleChange(e, 'person')}
                  />
                </div>

                {/* Age */}
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.person.age}
                    onChange={(e) => handleChange(e, 'person')}
                    min="0"
                    max="120"
                  />
                </div>

                {/* Nationality */}
                <div className="form-group">
                  <label>Nationality</label>
                  <select
                    name="nationality"
                    value={formData.person.nationality}
                    onChange={(e) => handleChange(e, 'person')}
                    required
                  >
                    <option value="">Select Nationality</option>
                    <option value="Ghanaian by birth">Ghanaian by birth</option>
                    <option value="Dual Nationality">Dual Nationality</option>
                    <option value="Ghanaian by naturalization">Ghanaian by naturalization</option>
                    <option value="Nigerian">Nigerian</option>
                    <option value="Liberian">Liberian</option>
                    <option value="Sierra Leonean">Sierra Leonean</option>
                    <option value="Gambian">Gambian</option>
                    <option value="Togolese">Togolese</option>
                    <option value="Burkinabe">Burkinabe</option>
                    <option value="Ivorian">Ivorian</option>
                    <option value="Other ECOWAS National">Other ECOWAS National</option>
                    <option value="African, other than ECOWAS">African, other than ECOWAS</option>
                    <option value="European">European</option>
                    <option value="American">American</option>
                    <option value="Asian">Asian</option>
                    <option value="Oceanian">Oceanian</option>
                  </select>
                </div>

                {/* Ethnicity Code */}
                <div className="form-group">
                  <label>Ethnicity Code</label>
                  <input
                    type="text"
                    name="ethnicity_code"
                    value={formData.person.ethnicity_code}
                    onChange={(e) => handleChange(e, 'person')}
                    maxLength="10"
                  />
                </div>

                {/* Ethnicity Name */}
                <div className="form-group">
                  <label>Ethnicity Name</label>
                  <input
                    type="text"
                    name="ethnicity_name"
                    value={formData.person.ethnicity_name}
                    onChange={(e) => handleChange(e, 'person')}
                    maxLength="50"
                  />
                </div>

                {/* Born in Locality */}
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="born_in_locality"
                      checked={formData.person.born_in_locality || false}
                      onChange={(e) => handleChange(e, 'person')}
                    />
                    Born in Locality
                  </label>
                </div>

                {/* Birth Region Country Code */}
                <div className="form-group">
                  <label>Birth Region Country Code</label>
                  <input
                    type="text"
                    name="birth_region_country_code"
                    value={formData.person.birth_region_country_code}
                    onChange={(e) => handleChange(e, 'person')}
                    maxLength="10"
                  />
                </div>

                {/* Birth Region Country Name */}
                <div className="form-group">
                  <label>Birth Region Country Name</label>
                  <input
                    type="text"
                    name="birth_region_country_name"
                    value={formData.person.birth_region_country_name}
                    onChange={(e) => handleChange(e, 'person')}
                    maxLength="50"
                  />
                </div>

                {/* Lived in Locality Since Birth */}
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="lived_in_locality_since_birth"
                      checked={formData.person.lived_in_locality_since_birth || false}
                      onChange={(e) => handleChange(e, 'person')}
                    />
                    Lived in Locality Since Birth
                  </label>
                </div>

                {/* Years Lived in Locality */}
                <div className="form-group">
                  <label>Years Lived in Locality</label>
                  <input
                    type="number"
                    name="years_lived_in_locality"
                    value={formData.person.years_lived_in_locality}
                    onChange={(e) => handleChange(e, 'person')}
                    min="0"
                  />
                </div>

                {/* Religion */}
                <div className="form-group">
                  <label>Religion</label>
                  <select
                    name="religion"
                    value={formData.person.religion}
                    onChange={(e) => handleChange(e, 'person')}
                    required
                  >
                    <option value="">Select Religion</option>
                    <option value="No Religion">No Religion</option>
                    <option value="Catholic">Catholic</option>
                    <option value="Protestant">Protestant</option>
                    <option value="Pentecostal/Charismatic">Pentecostal/Charismatic</option>
                    <option value="Other Christian">Other Christian</option>
                    <option value="Islam">Islam</option>
                    <option value="Ahmadi">Ahmadi</option>
                    <option value="Traditionalist">Traditionalist</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Marital Status */}
                <div className="form-group">
                  <label>Marital Status</label>
                  <select
                    name="marital_status"
                    value={formData.person.marital_status}
                    onChange={(e) => handleChange(e, 'person')}
                    required
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Never married">Never married</option>
                    <option value="Informal/consensual union/living together">Informal/consensual union/living together</option>
                    <option value="Married">Married</option>
                    <option value="Separated">Separated</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                {/* Present on Census Night */}
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="present_on_census_night"
                      checked={formData.person.present_on_census_night || false}
                      onChange={(e) => handleChange(e, 'person')}
                    />
                    Present on Census Night
                  </label>
                </div>

                {/* Status */}
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.person.status}
                    onChange={(e) => handleChange(e, 'person')}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Usual member present">Usual member present</option>
                    <option value="Visitor present">Visitor present</option>
                    <option value="Usual member absent">Usual member absent</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
  <div className="form-section">
    <h3>Education Information</h3>
    <div className="form-grid">
      {/* Person ID */}
      <div className="form-group">
        <label>Person</label>
        <select
          name="person_id"
          value={formData.education.person_id}
          onChange={(e) => handleChange(e, 'education')}
          required
        >
          <option value="">Select Person</option>
          {bulkPerson.map(person => (
            <option key={person.person_id} value={person.person_id}>
              {person.full_name} (HH: {person.household_id})
            </option>
          ))}
        </select>
      </div>

      {/* Literacy Language */}
      <div className="form-group">
        <label>Literacy Language</label>
        <input
          type="text"
          name="literacy_language"
          value={formData.education.literacy_language}
          onChange={(e) => handleChange(e, 'education')}
          maxLength="50"
        />
      </div>

      {/* Ever Attended School */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="ever_attended_school"
            checked={formData.education.ever_attended_school || false}
            onChange={(e) => handleChange(e, 'education')}
          />
          Ever Attended School
        </label>
      </div>

      {/* Highest Level of Schooling */}
      <div className="form-group">
        <label>Highest Level of Schooling</label>
        <select
          name="highest_level_schooling"
          value={formData.education.highest_level_schooling}
          onChange={(e) => handleChange(e, 'education')}
          required
        >
          <option value="">Select Level</option>
          <option value="Nursery">Nursery</option>
          <option value="Kindergarten">Kindergarten</option>
          <option value="Primary">Primary</option>
          <option value="JSS/JHS">JSS/JHS</option>
          <option value="Middle">Middle</option>
          <option value="SSS/SHS">SSS/SHS</option>
          <option value="Secondary">Secondary</option>
          <option value="Voc/technical/commercial">Voc/technical/commercial</option>
          <option value="Post middle/secondary certificate">Post middle/secondary certificate</option>
          <option value="Post secondary Diploma">Post secondary Diploma</option>
          <option value="Bachelor degree">Bachelor degree</option>
          <option value="Post graduate">Post graduate</option>
        </select>
      </div>

      {/* Highest Grade Completed */}
      <div className="form-group">
        <label>Highest Grade Completed</label>
        <input
          type="number"
          name="highest_grade_completed"
          value={formData.education.highest_grade_completed}
          onChange={(e) => handleChange(e, 'education')}
          min="0"
          max="20"
        />
      </div>
    </div>


  </div>
          )}

          {activeTab === 'economic' && (
  <div className="form-section">
    <h3>Economic Activity Information</h3>
    <div className="form-grid">
      {/* Person ID */}
      <div className="form-group">
        <label>Person</label>
        <select
          name="person_id"
          value={formData.economic.person_id}
          onChange={(e) => handleChange(e, 'economic')}
          required
        >
          <option value="">Select Person</option>
          {bulkPerson.map(person => (
            <option key={person.person_id} value={person.person_id}>
              {person.full_name} (HH: {person.household_id})
            </option>
          ))}
        </select>
      </div>

      {/* Engaged in Activity */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="engaged_in_activity"
            checked={formData.economic.engaged_in_activity || false}
            onChange={(e) => handleChange(e, 'economic')}
          />
          Engaged in Economic Activity
        </label>
      </div>

      {/* Engagement Status */}
      <div className="form-group">
        <label>Engagement Status</label>
        <select
          name="engagement_status"
          value={formData.economic.engagement_status}
          onChange={(e) => handleChange(e, 'economic')}
          required
        >
          <option value="">Select Engagement Status</option>
          <option value="Did not work but had job to go back to">Did not work but had job to go back to</option>
          <option value="Seeking work for the first time and available">Seeking work for the first time and available</option>
          <option value="Did voluntary work without pay">Did voluntary work without pay</option>
          <option value="Did not work and not seeking work">Did not work and not seeking work</option>
        </select>
      </div>

      {/* Reason Not Seeking Work */}
      <div className="form-group">
        <label>Reason Not Seeking Work</label>
        <select
          name="reason_not_seeking_work"
          value={formData.economic.reason_not_seeking_work}
          onChange={(e) => handleChange(e, 'economic')}
        >
          <option value="">Select Reason</option>
          <option value="Did home duties">Did home duties</option>
          <option value="In full time education">In full time education</option>
          <option value="Pensioner/Retiree">Pensioner/Retiree</option>
          <option value="Disabled/sick to work">Disabled/sick to work</option>
          <option value="Too old/too young">Too old/too young</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Occupation Code */}
      <div className="form-group">
        <label>Occupation Code</label>
        <input
          type="text"
          name="occupation_code"
          value={formData.economic.occupation_code}
          onChange={(e) => handleChange(e, 'economic')}
          maxLength="10"
        />
      </div>

      {/* Occupation Description */}
      <div className="form-group">
        <label>Occupation Description</label>
        <input
          type="text"
          name="occupation_description"
          value={formData.economic.occupation_description}
          onChange={(e) => handleChange(e, 'economic')}
          maxLength="100"
        />
      </div>

      {/* Industry/Establishment Name */}
      <div className="form-group">
        <label>Industry/Establishment Name</label>
        <input
          type="text"
          name="industry_establishment_name"
          value={formData.economic.industry_establishment_name}
          onChange={(e) => handleChange(e, 'economic')}
          maxLength="100"
        />
      </div>

      {/* Industry/Establishment Location */}
      <div className="form-group">
        <label>Industry/Establishment Location</label>
        <input
          type="text"
          name="industry_establishment_location"
          value={formData.economic.industry_establishment_location}
          onChange={(e) => handleChange(e, 'economic')}
          maxLength="100"
        />
      </div>

      {/* Industry Product/Service */}
      <div className="form-group">
        <label>Industry Product/Service</label>
        <input
          type="text"
          name="industry_product_service"
          value={formData.economic.industry_product_service}
          onChange={(e) => handleChange(e, 'economic')}
          maxLength="100"
        />
      </div>

      {/* Employment Status */}
      <div className="form-group">
        <label>Employment Status</label>
        <select
          name="employment_status"
          value={formData.economic.employment_status}
          onChange={(e) => handleChange(e, 'economic')}
          required
        >
          <option value="">Select Employment Status</option>
          <option value="Employee">Employee</option>
          <option value="Self employed without employees">Self employed without employees</option>
          <option value="Self employed with employees">Self employed with employees</option>
          <option value="Casual worker">Casual worker</option>
          <option value="Contributing family worker">Contributing family worker</option>
          <option value="Apprentice">Apprentice</option>
          <option value="Domestic employee">Domestic employee</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Employment Sector */}
      <div className="form-group">
        <label>Employment Sector</label>
        <select
          name="employment_sector"
          value={formData.economic.employment_sector}
          onChange={(e) => handleChange(e, 'economic')}
          required
        >
          <option value="">Select Employment Sector</option>
          <option value="Public (Government)">Public (Government)</option>
          <option value="Private Formal">Private Formal</option>
          <option value="Private Informal">Private Informal</option>
          <option value="Semi-Public/Parastatal">Semi-Public/Parastatal</option>
          <option value="NGO/Local and International">NGO/Local and International</option>
          <option value="International Organisation">International Organisation</option>
        </select>
      </div>
    </div>

    
  </div>
          )}


          {activeTab === 'disability' && (
            <div className="form-section">
              <h3>Disability Information</h3>
              <div className="form-grid">
                {/* Person ID */}
                <div className="form-group">
                  <label>Person</label>
                  <select
                    name="person_id"
                    value={formData.disability.person_id}
                    onChange={(e) => handleChange(e, 'disability')}
                    required
                  >
                    <option value="">Select Person</option>
                    {bulkPerson.map(person => (
                      <option key={person.person_id} value={person.person_id}>
                        {person.full_name} (HH: {person.household_id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Has Disability */}
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="has_disability"
                      checked={formData.disability.has_disability || false}
                      onChange={(e) => handleChange(e, 'disability')}
                    />
                    Has Disability
                  </label>
                </div>

                {/* Disability Types */}
                <div className="form-group checkbox-group">
                  <label>Disability Types:</label>
                  <div className="checkbox-grid">
                    <label>
                      <input
                        type="checkbox"
                        name="sight_disability"
                        checked={formData.disability.sight_disability || false}
                        onChange={(e) => handleChange(e, 'disability')}
                      />
                      Sight Disability
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="hearing_disability"
                        checked={formData.disability.hearing_disability || false}
                        onChange={(e) => handleChange(e, 'disability')}
                      />
                      Hearing Disability
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="speech_disability"
                        checked={formData.disability.speech_disability || false}
                        onChange={(e) => handleChange(e, 'disability')}
                      />
                      Speech Disability
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="physical_disability"
                        checked={formData.disability.physical_disability || false}
                        onChange={(e) => handleChange(e, 'disability')}
                      />
                      Physical Disability
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="intellectual_disability"
                        checked={formData.disability.intellectual_disability || false}
                        onChange={(e) => handleChange(e, 'disability')}
                      />
                      Intellectual Disability
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="emotional_disability"
                        checked={formData.disability.emotional_disability || false}
                        onChange={(e) => handleChange(e, 'disability')}
                      />
                      Emotional Disability
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="other_disability"
                        checked={formData.disability.other_disability || false}
                        onChange={(e) => handleChange(e, 'disability')}
                      />
                      Other Disability
                    </label>
                  </div>
                </div>

                {/* Other Disability Description */}
                <div className="form-group">
                  <label>Other Disability Description</label>
                  <input
                    type="text"
                    name="other_disability_description"
                    value={formData.disability.other_disability_description}
                    onChange={(e) => handleChange(e, 'disability')}
                    maxLength="100"
                    placeholder="Describe other disability"
                  />
                </div>

                {/* Technology Access */}
                <div className="form-group checkbox-group">
                  <label>Technology Access:</label>
                  <div className="checkbox-grid">
                    <label>
                      <input
                        type="checkbox"
                        name="owns_mobile_phone"
                        checked={formData.disability.owns_mobile_phone || false}
                        onChange={(e) => handleChange(e, 'disability')}
                      />
                      Owns Mobile Phone
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="uses_internet"
                        checked={formData.disability.uses_internet || false}
                        onChange={(e) => handleChange(e, 'disability')}
                      />
                      Uses Internet
                    </label>
                  </div>
                </div>
              </div>


            
            </div>
          )}



          {activeTab === 'fertility' && (
            <div className="form-section">
              <h3>Fertility Information</h3>
              <div className="form-grid">
                {/* Person ID */}
                <div className="form-group">
                  <label>Person</label>
                  <select
                    name="person_id"
                    value={formData.fertility.person_id}
                    onChange={(e) => handleChange(e, 'fertility')}
                    required
                  >
                    <option value="">Select Person</option>
                    {bulkPerson.map(person => (
                      <option key={person.person_id} value={person.person_id}>
                        {person.full_name} (HH: {person.household_id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Children Ever Born - Male */}
                <div className="form-group">
                  <label>Children Ever Born (Male)</label>
                  <input
                    type="number"
                    name="children_ever_born_male"
                    value={formData.fertility.children_ever_born_male}
                    onChange={(e) => handleChange(e, 'fertility')}
                    min="0"
                    placeholder="Number of male children ever born"
                  />
                </div>

                {/* Children Ever Born - Female */}
                <div className="form-group">
                  <label>Children Ever Born (Female)</label>
                  <input
                    type="number"
                    name="children_ever_born_female"
                    value={formData.fertility.children_ever_born_female}
                    onChange={(e) => handleChange(e, 'fertility')}
                    min="0"
                    placeholder="Number of female children ever born"
                  />
                </div>

                {/* Children Surviving - Male */}
                <div className="form-group">
                  <label>Children Surviving (Male)</label>
                  <input
                    type="number"
                    name="children_surviving_male"
                    value={formData.fertility.children_surviving_male}
                    onChange={(e) => handleChange(e, 'fertility')}
                    min="0"
                    placeholder="Number of male children surviving"
                  />
                </div>

                {/* Children Surviving - Female */}
                <div className="form-group">
                  <label>Children Surviving (Female)</label>
                  <input
                    type="number"
                    name="children_surviving_female"
                    value={formData.fertility.children_surviving_female}
                    onChange={(e) => handleChange(e, 'fertility')}
                    min="0"
                    placeholder="Number of female children surviving"
                  />
                </div>

                {/* Children Born Past 12 Months - Male */}
                <div className="form-group">
                  <label>Children Born Past 12 Months (Male)</label>
                  <input
                    type="number"
                    name="children_born_past_12_months_male"
                    value={formData.fertility.children_born_past_12_months_male}
                    onChange={(e) => handleChange(e, 'fertility')}
                    min="0"
                    placeholder="Male children born in past 12 months"
                  />
                </div>

                {/* Children Born Past 12 Months - Female */}
                <div className="form-group">
                  <label>Children Born Past 12 Months (Female)</label>
                  <input
                    type="number"
                    name="children_born_past_12_months_female"
                    value={formData.fertility.children_born_past_12_months_female}
                    onChange={(e) => handleChange(e, 'fertility')}
                    min="0"
                    placeholder="Female children born in past 12 months"
                  />
                </div>
              </div>

             
            </div>
          )}




{activeTab === 'agriculture' && (
  <div className="form-section">
    <h3>Agricultural Activity Information</h3>
    <div className="form-grid">
      {/* Household ID */}
      <div className="form-group">
        <label>Household</label>
        <select
          name="household_id"
          value={formData.agriculture.household_id}
          onChange={(e) => handleChange(e, 'agriculture')}
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

      {/* Engaged in Agriculture */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="engaged_in_agriculture"
            checked={formData.agriculture.engaged_in_agriculture || false}
            onChange={(e) => handleChange(e, 'agriculture')}
          />
          Engaged in Agriculture
        </label>
      </div>

      {/* Agricultural Activities */}
      <div className="form-group checkbox-group">
        <label>Agricultural Activities:</label>
        <div className="checkbox-grid">
          <label>
            <input
              type="checkbox"
              name="crop_farming"
              checked={formData.agriculture.crop_farming || false}
              onChange={(e) => handleChange(e, 'agriculture')}
            />
            Crop Farming
          </label>
          <label>
            <input
              type="checkbox"
              name="tree_growing"
              checked={formData.agriculture.tree_growing || false}
              onChange={(e) => handleChange(e, 'agriculture')}
            />
            Tree Growing
          </label>
          <label>
            <input
              type="checkbox"
            name="livestock_rearing"
            checked={formData.agriculture.livestock_rearing || false}
            onChange={(e) => handleChange(e, 'agriculture')}
          />
          Livestock Rearing
        </label>
        <label>
          <input
            type="checkbox"
            name="fish_farming"
            checked={formData.agriculture.fish_farming || false}
            onChange={(e) => handleChange(e, 'agriculture')}
          />
          Fish Farming
        </label>
      </div>
    </div>

    {/* Number of People Engaged */}
    <div className="form-group">
      <label>Males Engaged in Agriculture</label>
      <input
        type="number"
        name="male_engaged"
        value={formData.agriculture.male_engaged}
        onChange={(e) => handleChange(e, 'agriculture')}
        min="0"
        placeholder="Number of males engaged"
      />
    </div>

    <div className="form-group">
      <label>Females Engaged in Agriculture</label>
      <input
        type="number"
        name="female_engaged"
        value={formData.agriculture.female_engaged}
        onChange={(e) => handleChange(e, 'agriculture')}
        min="0"
        placeholder="Number of females engaged"
      />
    </div>
  </div>

 
</div>
)}


 



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
               <th>Structure number</th>
              <th>Household number</th>
              <th>Household ID</th>
              <th>Dwelling Type</th>
              <th>Roof Material</th>
              <th>Wall Material</th>
              <th>Floor Material</th>
              <th>Toilet Facility</th>
              <th>Water Source</th>
              <th>Update</th>
               <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bulkHousing.map(housing => (
              <tr key={housing.housing_id}>
                <td>{housing.structure_number}</td>
                <td>{housing.household_number}</td>
                <td>{housing.household_id}</td>
                <td>{housing.dwelling_type}</td>
                <td>{housing.roof_material}</td>
                <td>{housing.outer_wall_material}</td>
                <td>{housing.floor_material}</td>
                <td>{housing.toilet_facility}</td>
                <td>{housing.drinking_water_source}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(housing.housing_id)}
                    className="delete-button"
                    style={{ backgroundColor: 'green' }}
                  >
                    Update
                  </button>
                </td>
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

          {activeTab === 'person' && (
  <>
    <div className="data-table">
      <h4>Existing Persons</h4>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Household ID</th>
              <th>Relationship</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Nationality</th>
              <th>Marital Status</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bulkPerson.map(person => (
              <tr key={person.person_id}>
                <td>{person.full_name}</td>
                <td>{person.household_id}</td>
                <td>{person.relationship_to_head}</td>
                <td>{person.sex}</td>
                <td>{person.age}</td>
                <td>{person.nationality}</td>
                <td>{person.marital_status}</td>
                <td>{person.status}</td>
               


              <td>
                  <button
                    onClick={() => handleUpdate(person.person_id)}
                    className="delete-button"
                    style={{ backgroundColor: 'green' }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete('person', person.person_id)}
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

        {activeTab === 'education' && (
  <>
    <div className="data-table">
      <h4>Existing Education Records</h4>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Person Name</th>
              <th>Literacy Language</th>
              <th>Attended School</th>
              <th>Highest Level</th>
              <th>Highest Grade</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bulkEducation.map(education => (
              <tr key={education.education_id}>
                <td>{education.full_name}</td>
                <td>{education.literacy_language || 'N/A'}</td>
                <td>{education.ever_attended_school ? 'Yes' : 'No'}</td>
                <td>{education.highest_level_schooling}</td>
                <td>{education.highest_grade_completed || 'N/A'}</td>
               
              <td>
                  <button
                    onClick={() => handleUpdate(education.education_id)}
                    className="delete-button"
                    style={{ backgroundColor: 'green' }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete('education', education.education_id)}
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

        {activeTab === 'economic' && (
          <>
            <div className="data-table">
              <h4>Existing Economic Activities</h4>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Person Name</th>
                      <th>Engaged</th>
                      <th>Engagement Status</th>
                      <th>Employment Status</th>
                      <th>Employment Sector</th>
                      <th>Occupation</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkEconomic.map(activity => (
                      <tr key={activity.activity_id}>
                        <td>{activity.full_name}</td>
                        <td>{activity.engaged_in_activity ? 'Yes' : 'No'}</td>
                        <td>{activity.engagement_status}</td>
                        <td>{activity.employment_status}</td>
                        <td>{activity.employment_sector}</td>
                        <td>{activity.occupation_description || activity.occupation_code || 'N/A'}</td>
                        <td>
                          <button
                            onClick={() => handleUpdate(activity.activity_id)}
                            className="delete-button"
                            style={{ backgroundColor: 'green' }}
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete('economic', activity.activity_id)}
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

        {activeTab === 'disability' && (
          <>
            <div className="data-table">
              <h4>Existing Disability Records</h4>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Person Name</th>
                      <th>Has Disability</th>
                      <th>Disability Types</th>
                      <th>Mobile Phone</th>
                      <th>Internet Use</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkDisability.map(disability => (
                      <tr key={disability.disability_id}>
                        <td>{disability.full_name}</td>
                        <td>{disability.has_disability ? 'Yes' : 'No'}</td>
                        <td>
                          {[
                            disability.sight_disability && 'Sight',
                            disability.hearing_disability && 'Hearing',
                            disability.speech_disability && 'Speech',
                            disability.physical_disability && 'Physical',
                            disability.intellectual_disability && 'Intellectual',
                            disability.emotional_disability && 'Emotional',
                            disability.other_disability && 'Other'
                          ].filter(Boolean).join(', ') || 'None'}
                        </td>
                        <td>{disability.owns_mobile_phone ? 'Yes' : 'No'}</td>
                        <td>{disability.uses_internet ? 'Yes' : 'No'}</td>
                        
                          <td>
                          <button
                            onClick={() => handleUpdate(disability.disability_id)}
                            className="delete-button"
                            style={{ backgroundColor: 'green' }}
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete('disability', disability.disability_id)}
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

        {activeTab === 'fertility' && (
  <>
    <div className="data-table">
      <h4>Existing Fertility Records</h4>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Person Name</th>
              <th>Sex</th>
              <th>Children Ever Born</th>
              <th>Children Surviving</th>
              <th>Born Past 12 Months</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bulkFertility.map(fertility => (
              <tr key={fertility.fertility_id}>
                <td>{fertility.full_name}</td>
                <td>{fertility.sex}</td>
                <td>
                  {fertility.children_ever_born_male + fertility.children_ever_born_female || 0}
                  {fertility.children_ever_born_male + fertility.children_ever_born_female > 0 && 
                    ` (M: ${fertility.children_ever_born_male}, F: ${fertility.children_ever_born_female})`
                  }
                </td>
                <td>
                  {fertility.children_surviving_male + fertility.children_surviving_female || 0}
                  {fertility.children_surviving_male + fertility.children_surviving_female > 0 && 
                    ` (M: ${fertility.children_surviving_male}, F: ${fertility.children_surviving_female})`
                  }
                </td>
                <td>
                  {fertility.children_born_past_12_months_male + fertility.children_born_past_12_months_female || 0}
                  {fertility.children_born_past_12_months_male + fertility.children_born_past_12_months_female > 0 && 
                    ` (M: ${fertility.children_born_past_12_months_male}, F: ${fertility.children_born_past_12_months_female})`
                  }
                </td>
               

              <td>
              <button
              onClick={() => handleUpdate(fertility.fertility_id)}
              className="delete-button"
              style={{ backgroundColor: 'green' }}
              >
              Update
              </button>
              </td>
              <td>
              <button
              onClick={() => handleDelete('fertility', fertility.fertility_id)}
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


        {activeTab === 'agriculture' && (
  <>
    <div className="data-table">
      <h4>Existing Agricultural Activities</h4>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Household ID</th>
              <th>Engaged</th>
              <th>Activities</th>
              <th>Males Engaged</th>
              <th>Females Engaged</th>
              <th>Total Engaged</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bulkAgricultural.map(activity => (
              <tr key={activity.agriculture_id}>
                <td>{activity.household_id}</td>
                <td>{activity.engaged_in_agriculture ? 'Yes' : 'No'}</td>
                <td>
                  {[
                    activity.crop_farming && 'Crops',
                    activity.tree_growing && 'Trees',
                    activity.livestock_rearing && 'Livestock',
                    activity.fish_farming && 'Fish'
                  ].filter(Boolean).join(', ') || 'None'}
                </td>
                <td>{activity.male_engaged || 0}</td>
                <td>{activity.female_engaged || 0}</td>
                <td>{(activity.male_engaged || 0) + (activity.female_engaged || 0)}</td>
               
          <td>
              <button
              onClick={() => handleUpdate( activity.agriculture_id)}
              className="delete-button"
              style={{ backgroundColor: 'green' }}
              >
              Update
              </button>
              </td>
              <td>
              <button
              onClick={() => handleDelete('agriculture', activity.agriculture_id)}
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