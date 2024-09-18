import React, { useState, useEffect } from 'react';

const LeftSidebar = () => {
  const [filters, setFilters] = useState({
    disasterType: '',
    location: '',
  });

  const [summaries, setSummaries] = useState([]);

  // Updated sample JSON data
  const jsonData = [
    {
      "DisasterType": "Flood",
      "Location": "Gujarat",
      "Summary": "Heavy rainfall causes flooding in several districts of Gujarat. Rescue operations underway."
    },
    {
      "DisasterType": "Cyclone",
      "Location": "Odisha",
      "Summary": "Cyclone Yaas makes landfall in Odisha, causing widespread damage to coastal areas."
    },
    {
      "DisasterType": "Earthquake",
      "Location": "Uttarakhand",
      "Summary": "6.2 magnitude earthquake hits Uttarakhand, tremors felt in neighboring states."
    },
    {
      "DisasterType": "Landslide",
      "Location": "Himachal Pradesh",
      "Summary": "Heavy rains trigger landslides in Himachal Pradesh, blocking major highways."
    },
    {
      "DisasterType": "Drought",
      "Location": "Maharashtra",
      "Summary": "Severe drought conditions persist in parts of Maharashtra, affecting agriculture."
    }
  ];

  // List of Indian states
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  // Extract unique disaster types
  const disasterTypes = [...new Set(jsonData.map(item => item.DisasterType))];

  useEffect(() => {
    filterSummaries();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filterSummaries = () => {
    const filteredSummaries = jsonData.filter(item => {
      return (
        (filters.disasterType === '' || item.DisasterType === filters.disasterType) &&
        (filters.location === '' || item.Location === filters.location)
      );
    });
    setSummaries(filteredSummaries);
  };

  const sidebarStyle = {
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '20px',
    width: '445px',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const filterStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#555555',
    fontWeight: 'bold',
  };

  const selectStyle = {
    width: '100%',
    padding: '8px',
    backgroundColor: '#f0f0f0',
    color: '#333333',
    border: '1px solid #cccccc',
    borderRadius: '4px',
  };

  const summaryBoxStyle = {
    backgroundColor: '#f9f9f9',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
  };

  const summariesContainerStyle = {
    overflowY: 'auto',
    flex: 1,
  };

  const getDisasterTypeColor = (disasterType) => {
    const colors = {
      'Flood': '#4a90e2',
      'Cyclone': '#f5a623',
      'Earthquake': '#d0021b',
      'Landslide': '#7ed321',
      'Drought': '#9013fe'
    };
    return colors[disasterType] || '#000000';
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={{ marginBottom: '20px', fontSize: '1.5em', color: '#333333' }}>Filters</h2>
      
      <div style={filterStyle}>
        <label htmlFor="disasterType" style={labelStyle}>Type of Disaster</label>
        <select
          id="disasterType"
          name="disasterType"
          value={filters.disasterType}
          onChange={handleFilterChange}
          style={selectStyle}
        >
          <option value="">All Disaster Types</option>
          {disasterTypes.map((type, index) => (
            <option key={index} value={type} style={{color: getDisasterTypeColor(type)}}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div style={filterStyle}>
        <label htmlFor="location" style={labelStyle}>Location</label>
        <select
          id="location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          style={selectStyle}
        >
          <option value="">All Locations</option>
          {indianStates.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <h3 style={{ marginTop: '20px', marginBottom: '10px', color: '#333333' }}>Summaries</h3>
      <div style={summariesContainerStyle}>
        {summaries.map((item, index) => (
          <div key={index} style={summaryBoxStyle}>
            <p style={{ color: getDisasterTypeColor(item.DisasterType), fontWeight: 'bold' }}>
              {item.DisasterType} - {item.Location}
            </p>
            <p>{item.Summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
