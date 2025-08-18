import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config";
import "./Layout.css";

function MatchCasesPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    setMatchResult(null); // reset previous results
  };

  // Search for match
  const handleSearch = async () => {
    if (!selectedFile) {
      alert("⚠️ Please upload a photo to search.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/match`,  // ✅ make sure your Flask route is `/api/match`
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.matchFound) {
        setMatchResult(response.data);
      } else {
        setMatchResult({ matchFound: false });
      }
    } catch (err) {
      console.error("Error matching photo:", err);
      alert(err.response?.data?.error || "❌ Error matching the photo.");
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
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div style={{ marginBottom: "15px" }}>
            <p>Preview:</p>
            <img
              src={preview}
              alt="preview"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "2px solid #ddd",
              }}
            />
          </div>
        )}

        {/* Search Button */}
        <button
          className="white-btn"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "🔍 Searching..." : "Search"}
        </button>

        {/* Match Found */}
        {matchResult && matchResult.matchFound && (
          <div className="match-result-card">
            <h4>✅ Match Found!</h4>
            <p><strong>Name:</strong> {matchResult.name}</p>
            <p><strong>Father's Name:</strong> {matchResult.fatherName}</p>
            <p><strong>Phone:</strong> {matchResult.phone}</p>
            <p><strong>Birth Marks:</strong> {matchResult.birthMarks}</p>
            <p><strong>Details:</strong> {matchResult.description}</p>
            <p>
              <strong>Match Confidence:</strong>{" "}
              {(100 * (1 - matchResult.distance)).toFixed(1)}%
            </p>
          </div>
        )}

        {/* No Match */}
        {matchResult && !matchResult.matchFound && (
          <div className="alert-warning">❌ No match found.</div>
        )}
      </div>
    </div>
  );
}

export default MatchCasesPage;
