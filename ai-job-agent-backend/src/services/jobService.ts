import axios from 'axios';
import Job, { IJob } from '../models/Job';

const ARBEITNOW_URL = 'https://www.arbeitnow.com/api/job-board-api';

// Arbeitnow API Response Interface
interface ArbeitnowJob {
  slug: string;
  title: string;
  company_name: string;
  location?: string;
  url: string;
  tags?: string[];
  description: string;
  created_at: number;
}

// 1. Arbeitnow API থেকে লাইভ ডাটা আনা
export async function fetchFromArbeitnow(): Promise<Partial<IJob>[]> {
  try {
    const response = await axios.get<{ data: ArbeitnowJob[] }>(ARBEITNOW_URL);
    const rawJobs = response.data.data;

    return rawJobs.map((job: ArbeitnowJob) => ({
      jobId: job.slug,
      title: job.title,
      company: job.company_name,
      logo: '',
      location: job.location || 'Remote',
      source: 'Arbeitnow (Unlimited)',
      applyUrl: job.url,
      category: job.tags ? job.tags.join(' ').toLowerCase() : 'tech',
      tags: job.tags || [],
      description: job.description,
      postedAt: new Date(job.created_at * 1000)
    }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Arbeitnow Fetch Error:', error.message);
    } else {
      console.error('Arbeitnow Fetch Error:', error);
    }
    return [];
  }
}

// 2. Caching Check & Search Logic
export async function getOrFetchJobs(searchQuery: string = ''): Promise<any[]> {
  const query = searchQuery.toLowerCase().trim();

  // ১. MongoDB ডাটাবেজে আগে চেক করা
  let cachedJobs: any[] = [];
  if (query) {
    cachedJobs = await Job.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }).sort({ postedAt: -1 });
  } else {
    cachedJobs = await Job.find({}).sort({ postedAt: -1 }).limit(30);
  }

  // ডাটাবেজে পাওয়া গেলে সরাসরি রিটার্ন
  if (cachedJobs.length > 0) {
    return cachedJobs;
  }

  // ২. ডাটাবেজে না থাকলে API কল করা
  const freshJobs = await fetchFromArbeitnow();

  // ৩. নতুন ডাটা MongoDB-তে সেভ করা
  if (freshJobs.length > 0) {
    try {
      await Job.insertMany(freshJobs, { ordered: false });
    } catch (err: unknown) {
      // Duplicate ID ইগনোর করবে
    }
  }

  // ৪. ইউজারের ফিল্টার অনুযায়ী রেজাল্ট রিটার্ন করা
  if (query) {
    const filteredJobs = freshJobs.filter(
      (job: Partial<IJob>) =>
        job.title?.toLowerCase().includes(query) ||
        job.category?.toLowerCase().includes(query) ||
        job.tags?.some((tag: string) => tag.toLowerCase().includes(query)) ||
        job.description?.toLowerCase().includes(query)
    );

    // সার্চ কিওয়ার্ড না মিললেও যাতে ফাঁকা না দেখিয়ে সব লাইভ জব দেখায় (Fallback Option)
    return filteredJobs.length > 0 ? filteredJobs : freshJobs;
  }

  return freshJobs;
}

// 3. Dual Export (Default Export Security)
export default {
  fetchFromArbeitnow,
  getOrFetchJobs,
};