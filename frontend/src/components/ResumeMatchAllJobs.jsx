import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiBaseUrl = window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:8000/api'
  : 'https://jobs-backend-uuqf.onrender.com/api';

function ResumeMatchAllJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResumeName, setSelectedResumeName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/resumes/`);
        setResumes(res.data);
      } catch (error) {
        console.error("Failed to fetch resumes", error);
      }
    };
    fetchResumes();
  }, []);

  const handleMatchAll = async () => {
    setLoading(true);
    try {
      const selected = resumes.find(r => r.id.toString() === resumeId);
      const resumeName = selected?.resume_name || selected?.file_name || `Resume ${resumeId}`;
      setSelectedResumeName(resumeName);

      const res = await axios.get(`${apiBaseUrl}/resumes/${resumeId}/match_jobs/`);
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Matching failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Job Search with Resume Matching</h2>

      <div className="mb-4">
        <label className="mr-2">Select Resume:</label>
        <select
          onChange={(e) => setResumeId(e.target.value)}
          value={resumeId}
          className="border p-1"
        >
          <option value="">-- Choose Resume --</option>
          {resumes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.resume_name || r.file_name || `Resume ${r.id}`}
            </option>
          ))}
        </select>

        <button
          onClick={handleMatchAll}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
          disabled={!resumeId || loading}
        >
          {loading ? 'Matching...' : 'Match Jobs'}
        </button>
      </div>

      {!loading && results.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">
            Matching Jobs for <span className="text-blue-600">{selectedResumeName}</span>
          </h3>
          {results.map((job, index) => (
            <div key={index} className="border p-3 mb-3 rounded shadow">
              <h4 className="text-lg font-bold text-blue-800">{job.job_title}</h4>
              <p className="text-sm">Score: <span className="font-medium">{job.match_score}%</span></p>
              <p className="text-sm text-green-700">
                ✅ Matched Skills: {job.matched_skills?.join(', ') || 'None'}
              </p>
              <p className="text-sm text-red-600">
                ❌ Missing Keywords: {job.missing_keywords?.join(', ') || 'None'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumeMatchAllJobs;
