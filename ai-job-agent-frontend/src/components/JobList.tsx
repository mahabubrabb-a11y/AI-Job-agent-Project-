import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ১. Job অবজেক্টের টাইপ ডেফিনেশন
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  sourceUrl?: string;
  description?: string;
  requirements?: string[];
}

// ২. API রেসপন্সের টাইপ ডেফিনেশন
interface ApiResponse {
  success: boolean;
  count: number;
  pagination: {
    totalJobs: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  data: Job[];
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // এপিআই থেকে ডাটা ফেচ করার ফাংশন
  const fetchJobs = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `http://localhost:5000/api/v1/jobs/live?page=${page}&limit=10&search=${search}`
      );
      setJobs(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // পেজ বা সার্চ চেঞ্জ হলে অটোমেটিক রিকোয়েস্ট যাবে
  useEffect(() => {
    fetchJobs();
  }, [page, search]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>💼 Live Job Board</h2>

      {/* সার্চ ইনপুট */}
      <input
        type="text"
        placeholder="Search jobs (e.g. React)..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
          setPage(1); // সার্চ করলে ১ নম্বর পেজে ফেরত যাবে
        }}
        style={{ padding: '8px', marginBottom: '20px', width: '300px' }}
      />

      {/* লোডিং স্টেট */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div>
          {/* জবের লিস্ট */}
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '5px'
              }}
            >
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              {job.sourceUrl && (
                <a href={job.sourceUrl} target="_blank" rel="noreferrer">
                  Apply Now
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* পেজিনেশন বাটন */}
      <div style={{ marginTop: '20px' }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span style={{ margin: '0 15px' }}>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobList;