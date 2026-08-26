/**
 * Calculates match percentage between user skills and job requirements
 */
export const calculateMatchScore = (
  userSkills: string[] = [],
  jobSkills: string[] = [],
  jobDescription: string = ''
): number => {
  if (!userSkills.length) return 0;

  const normalizedUserSkills = userSkills.map((s) => s.toLowerCase());
  let matchedCount = 0;

  // 1. Direct Skill Matching (70% weight baseline logic)
  if (jobSkills.length > 0) {
    const normalizedJobSkills = jobSkills.map((s) => s.toLowerCase());
    normalizedUserSkills.forEach((skill) => {
      if (normalizedJobSkills.includes(skill)) matchedCount++;
    });
    const directScore = (matchedCount / normalizedJobSkills.length) * 70;
    return Math.min(Math.round(directScore), 100);
  }

  // 2. Fallback: Description Text Keyword Search
  const descLower = jobDescription.toLowerCase();
  let descMatchCount = 0;

  normalizedUserSkills.forEach((skill) => {
    if (descLower.includes(skill)) descMatchCount++;
  });

  const textScore = (descMatchCount / normalizedUserSkills.length) * 100;
  return Math.min(Math.round(textScore), 100);
};