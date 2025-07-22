import React, { useState} from 'react';
import API from '../api/api';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const  [error, setError] = useState("");

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await API.post('resumes/upload/', formData);
      setSkills(res.data.skills);
    } catch(err) {
      setError("Failed to upload resume");
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="bg-black text-white px-4 py-2" onClick = {handleUpload}>
        Upload Resume
      </button>
      <div className="mt-4">
        {error && <p className="text-red-500">{error}</p>}
        <h2 className="font-bold">Extracted Skills:</h2>
        <ul>
          {skills.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>
  );
}
export default ResumeUpload;