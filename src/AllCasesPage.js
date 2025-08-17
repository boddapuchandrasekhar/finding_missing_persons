import React, { useEffect, useState } from 'react';
import API_BASE_URL from './config'; 
import axios from 'axios';

const AllCasesPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('${API_BASE_URL}/cases')
      .then(res => {
        setCases(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cases:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Missing Person Cases</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {cases.map(person => (
            <div className="col-md-4" key={person.id}>
              <div className="card mb-4 shadow-sm">
                {person.image && (
                  <img
                    src={`data:image/jpeg;base64,${person.image}`}
                    alt={person.name}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '250px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{person.name}</h5>
                  <p className="card-text"><strong>Father's Name:</strong> {person.fatherName}</p>
                  <p className="card-text"><strong>Phone:</strong> {person.phone}</p>
                  <p className="card-text"><strong>Birth Marks:</strong> {person.birthMarks}</p>
                  <p className="card-text"><strong>Info:</strong> {person.personalInfo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCasesPage;
