import fs from 'fs';

const htmlMapping = {
  'checklists-guide': '/wedding-planning-checklists.html',
  'wedding-planning-checklist-tips': '/20-tips-for-your-wedding-planning-checklist.html',
  'how-to-choose-wedding-venue': '/wedding-planning-checklists.html', // fallback
  'wedding-budget-tips': '/wedding-planning-checklists.html',
  'perfect-guest-list-guide': '/wedding-planning-checklists.html',
  'moodboard-layout': '/wedding-planning-checklists.html',
  'hairstyles-for-wedding': '/hairstyles-for-wedding.html',
  'how-to-plan-a-wedding-timeline': '/how-to-plan-a-wedding-timeline.html'
};

function fixHtmlLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/blog\/The-Ultimate-Wedding-Planning-Checklists-Guide-for-a-Stress-Free-Wedding/g, '/wedding-planning-checklists.html');
  content = content.replace(/\/blog\/How-to-Plan-a-Wedding-Timeline/g, '/how-to-plan-a-wedding-timeline.html');
  content = content.replace(/\/blog\/20-Tips-for-Your-Wedding-Planning-Checklist/g, '/20-tips-for-your-wedding-planning-checklist.html');
  content = content.replace(/\/blog\/Hairstyles-for-Wedding/g, '/hairstyles-for-wedding.html');
  // Also lowercase versions
  content = content.replace(/\/blog\/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding/g, '/wedding-planning-checklists.html');
  content = content.replace(/\/blog\/how-to-plan-a-wedding-timeline/g, '/how-to-plan-a-wedding-timeline.html');
  content = content.replace(/\/blog\/20-tips-for-your-wedding-planning-checklist/g, '/20-tips-for-your-wedding-planning-checklist.html');
  content = content.replace(/\/blog\/hairstyles-for-wedding/g, '/hairstyles-for-wedding.html');
  fs.writeFileSync(filePath, content);
}

// Fix static HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');
for (const file of files) {
  fixHtmlLinks(file);
}

// Also fix in React components just in case they have hardcoded links
fixHtmlLinks('src/components/Blog.tsx');
fixHtmlLinks('src/components/LandingPage.tsx');

console.log('Fixed HTML links');
