import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailExtra = () => {
  const [Stone, setStone] = useState(null); // Handle Stone data
  const token = localStorage.getItem('token');

  // Extract the id from route parameters
  const { id } = useParams();

  // Function to fetch Stone details
  async function getStone() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/extra/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedStone = res.data.extra;
      setStone(fetchedStone);
    } catch (error) {
      console.error('Error fetching Stone:', error);
    }
  }

  // Fetch Stone data on component mount
  useEffect(() => {
    getStone();
  }, []); // Dependency array ensures this runs only once

  return (
    <div className="text-white" style={{ marginTop: '50px', padding: '20px' }}>
      <h1>Detail Extra</h1>
      {Stone ? (
        <div style={{ marginTop: '20px' }}>
          {/* Display specific fields */}
          <div style={{ marginBottom: '20px' }}>

          
            <div style={{ marginBottom: '10px' }}>
              <strong>Remark:</strong> {Stone.remark}
            </div>
           
           
          
            <div style={{ marginBottom: '10px' }}>
             <audio controls>
                <source src={`${import.meta.env.VITE_BASE_URL}uploads/${Stone.audio}`} type="audio/ogg"/>
                <source src={`${import.meta.env.VITE_BASE_URL}uploads/${Stone.audio}`} type="audio/mpeg"/>
                Your browser does not support the audio element.
             </audio>
            </div>
            {/* Add more fields as necessary */}
          </div>

          {/* Display images */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {Stone.vehicle_picture && (
              <div
                style={{
                  background: '#333',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={`${import.meta.env.VITE_BASE_URL}uploads/${Stone.vehicle_picture}`}
                  alt="Vehicle Picture"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '150px',
                    borderRadius: '8px',
                  }}
                />
                <p style={{ marginTop: '10px', fontSize: '14px' }}>VEHICLE PICTURE</p>
              </div>
            )}
            {Stone.weight_picture && (
              <div
                style={{
                  background: '#333',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={`${import.meta.env.VITE_BASE_URL}uploads/${Stone.weight_picture}`}
                  alt="Weight Picture"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '150px',
                    borderRadius: '8px',
                  }}
                />
                <p style={{ marginTop: '10px', fontSize: '14px' }}>WEIGHT PICTURE</p>
              </div>
            )}
            {Stone.slip_picture && (
              <div
                style={{
                  background: '#333',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={`${import.meta.env.VITE_BASE_URL}uploads/${Stone.slip_picture}`}
                  alt="Slip Picture"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '150px',
                    borderRadius: '8px',
                  }}
                />
                <p style={{ marginTop: '10px', fontSize: '14px' }}>SLIP PICTURE</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading Stone details...</p>
      )}
    </div>
  );
};

export default DetailExtra;
