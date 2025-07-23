// ResumeUpload.jsx
import React, { useState } from 'react';
import API from '../api/apiConfig';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSkills([]);
      setResumeName('');

      const formData = new FormData();
      formData.append('file', file);

      const res = await API.post('/resumes/upload/', formData);
      setSkills(res.data.skills);
      setResumeName(file.name);
    } catch (err) {
      console.error(err);
      setError('Failed to upload resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 block"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Uploading...' : 'Upload Resume'}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {resumeName && (
        <div className="mt-4">
          <p className="font-semibold text-green-700">Uploaded: {resumeName}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-lg">Extracted Skills:</h3>
          <ul className="list-disc list-inside mt-2">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
