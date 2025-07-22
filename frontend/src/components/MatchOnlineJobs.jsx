import React, { useEffect, useState } from 'react';
import API from '../api/api';

function MatchOnlineJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [query, setQuery] = useState('developer');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get('/resumes/');
        setResumes(res.data);
      } catch (err) {
        console.error('Failed to fetch resumes', err);
      }
    };
    fetchResumes();
  }, []);

  const handleMatch = async () => {
    if (!resumeId || !query) return;
    setLoading(true);
    try {
      const res = await API.post('/match-online-jobs/', {
        resume_id: resumeId,
        query: query,
      });
      setResults(res.data.results || []);
    } catch (err) {
      console.error('Error matching online jobs:', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Match Resume with Online Jobs</h2>

      <div className="mb-4 space-y-2">
        <label className="block">
          Select Resume:
          <select
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">-- Choose Resume --</option>
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.filename || resume.file.split("/").pop()}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Job Title / Query:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Python Developer"
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>

        <button
          onClick={handleMatch}
          disabled={!resumeId}
          className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700 transition"
        >
          Match Jobs
        </button>
      </div>

      {loading ? (
        <p>Loading matching jobs...</p>
      ) : (
        results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Matching Jobs</h3>
            {results.map((job, idx) => (
              <div key={idx} className="border p-4 rounded mb-4 shadow-sm">
                <h4 className="text-lg font-bold">{job.job_title}</h4>
                <p className="text-sm text-gray-600">{job.company}</p>
                <p className="mt-2 text-sm">Score: <strong>{job.score}%</strong></p>
                <p className="mt-1 text-sm">
                  <strong>Matched Keywords:</strong> {job.matched_keywords.join(', ') || 'None'}
                </p>
                <p className="mt-1 text-sm">
                  <strong>Missing Keywords:</strong> {job.missing_keywords.join(', ') || 'None'}
                </p>
                <a
                  href={job.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-blue-600 underline"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default MatchOnlineJobs;
