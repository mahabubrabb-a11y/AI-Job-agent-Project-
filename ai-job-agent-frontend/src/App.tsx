import React from 'react';
import JobList from './components/JobList';
import ResumeMatcher from './components/ResumeMatcher';

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Job Portal Dashboard</h1>
      
      {/* ১. লাইভ জব লিস্ট এবং পেজিনেশন */}
      <JobList />

      <hr style={{ margin: '40px 0' }} />

      {/* ২. এআই রেজুমি ম্যাচিং (আপনার ডাটাবেজ থেকে তৈরি হওয়া সিভির আইডি এখানে বসাবেন) */}
      <ResumeMatcher resumeId="YOUR_RESUME_ID_HERE" />
    </div>
  );
};

export default App;