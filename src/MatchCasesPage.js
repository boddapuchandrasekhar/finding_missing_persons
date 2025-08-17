import React, { useState } from 'react';
import API_BASE_URL from './config'; 
import axios from 'axios';
import './Layout.css';

function MatchCasesPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMatchResult(null);
  };

  // Search for match
  const handleSearch = async () => {
    if (!selectedFile) {
      alert("Please upload a photo to search.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post("${API_BASE_URL}/match", formData);

      if (response.data.matchFound) {
        setMatchResult(response.data);
      } else {
        setMatchResult({ matchFound: false });
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error matching the photo.");
      setMatchResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-container">
      <div className="match-card">
        <h2>Find a Missing Person</h2>
        
        {/* Upload Field */}
        <div className="mb-3">
          <label className="form-label">Upload Found Person's Photo</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>

        {/* Search Button */}
        <button className="white-btn" onClick={handleSearch}>
          {loading ? 'Searching...' : 'Search'}
        </button>

        {/* Match Found */}
        {matchResult && matchResult.matchFound && (
          <div className="match-result-card">
            <h4>Match Found!</h4>
            <p><strong>Name:</strong> {matchResult.name}</p>
            <p><strong>Father's Name:</strong> {matchResult.fatherName}</p>
            <p><strong>Phone:</strong> {matchResult.phone}</p>
            <p><strong>Birth Marks:</strong> {matchResult.birthMarks}</p>
            <p><strong>Details:</strong> {matchResult.personalInfo}</p>
            <p><strong>Match Confidence:</strong> {(1 - matchResult.distance).toFixed(2)}</p>
          </div>
        )}

        {/* No Match */}
        {matchResult && !matchResult.matchFound && (
          <div className="alert-warning">No match found.</div>
        )}
      </div>
    </div>
  );
}

export default MatchCasesPage;
