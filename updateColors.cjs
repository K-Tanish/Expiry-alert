const fs = require('fs');
const path = require('path');

const filesToReplaceEmeraldToOrange = [
  'Sidebar.tsx',
  'QuickActions.tsx',
  'NeedsAttention.tsx',
  'Header.tsx',
  'CategoriesView.tsx'
];

filesToReplaceEmeraldToOrange.forEach(file => {
  const p = path.join(__dirname, 'src/components', file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/emerald/g, 'orange');
    fs.writeFileSync(p, content);
    console.log(`Updated ${file}`);
  }
});

// For RecordModal.tsx, replace primary buttons with black (slate-900) and some emerald to orange
const recordModalPath = path.join(__dirname, 'src/components/RecordModal.tsx');
if (fs.existsSync(recordModalPath)) {
  let content = fs.readFileSync(recordModalPath, 'utf8');
  // Change Save Changes button to black
  content = content.replace(/bg-emerald-700 hover:bg-emerald-800 text-white/g, 'bg-slate-900 hover:bg-slate-800 text-white');
  content = content.replace(/shadow-emerald-100/g, 'shadow-slate-200');
  // Change Mark as Renewed button to black
  content = content.replace(/bg-emerald-700 hover:bg-emerald-800/g, 'bg-slate-900 hover:bg-slate-800');
  
  // UpToDate pill to slate
  content = content.replace(/text-emerald-600 bg-emerald-50 px-3 py-1\.5 rounded-full border border-emerald-100/g, 'text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200');
  
  fs.writeFileSync(recordModalPath, content);
  console.log('Updated RecordModal.tsx');
}
