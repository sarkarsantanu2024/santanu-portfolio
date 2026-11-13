// Single source for the "N+ years" figure shown in the hero, the experience
// section and the page metadata. Counted from the first role in
// data/siteData.json (Delgence, Apr 2012) so the three can't drift apart.
const CAREER_START = new Date(2012, 3, 1);

export function careerYears(now = new Date()) {
  let years = now.getFullYear() - CAREER_START.getFullYear();
  if (now.getMonth() < CAREER_START.getMonth()) years -= 1;
  return years;
}
