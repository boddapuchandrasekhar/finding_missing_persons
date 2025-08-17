import React, { useState } from 'react';
import API_BASE_URL from './config'; 
import axios from 'axios';

const RegisterNewCase = () => {
  const [form, setForm] = useState({
    name: '',
    fatherName: '',
    phone: '',
    birthMarks: '',
    description: '',
    photos: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = [...form.photos, ...selectedFiles];

    if (totalFiles.length > 10) {
      alert('You can upload a maximum of 10 photos.');
      return;
    }
    setForm({ ...form, photos: totalFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.photos.length < 1) {
      alert('Please upload at least one photo.');
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      if (key === 'photos') {
        form.photos.forEach((photo) => {
          formData.append('photos', photo);
        });
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      const response = await axios.post(
        '${API_BASE_URL}/register',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.success) {
        alert('Case submitted successfully! ID: ' + response.data.person_id);
        setForm({
          name: '',
          fatherName: '',
          phone: '',
          birthMarks: '',
          description: '',
          photos: [],
        });
      } else {
        alert('Registration failed. Reason: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error submitting case:', error);
      alert('Error submitting case. Please try again.');
    }
  };

  return (
    <div className="centered-form">
      <div className="form-box">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Register New Missing Person
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <br /><br />

          <input
            name="fatherName"
            placeholder="Father's Name"
            value={form.fatherName}
            onChange={handleChange}
            required
          />
          <br /><br />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <br /><br />

          <input
            name="birthMarks"
            placeholder="Birth Marks"
            value={form.birthMarks}
            onChange={handleChange}
          />
          <br /><br />

          <textarea
            name="description"
            placeholder="Personal Info"
            value={form.description}
            onChange={handleChange}
            required
          />
          <br /><br />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <br />
          <small>
            Upload 5–10 clear face photos. You can select them in multiple steps.
          </small>
          <br /><br />

          <button type="submit" className="submit-btn">Submit Case</button>
        </form>

        {form.photos.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>Selected Photos:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {form.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(photo)}
                  alt={`preview-${idx}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterNewCase;
