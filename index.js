#!/usr/bin/env node

/* global process */

var fs = require('fs');

if (process.argv.length < 3) {
  console.error(
    'Usage: index-it <directory with files> [comma-separated file extensions] [files per page]'
  );
  process.exit(1);
}

const fileDirPath = process.argv[2];
var fileExts = [];
var filesPerPage = 48;

if (process.argv.length > 3) {
  fileExts = process.argv[3].split('.').map(s => s.trim());
}
if (process.argv.length > 4) {
  filesPerPage = process.argv[4];
}
var files = fs.readdirSync(fileDirPath).filter(isWantedFile);
const pageCount = Math.ceil(files.length/filesPerPage);
console.log('index-it is making', pageCount, 'pages');
var pages = [];
for (let page = 0; page < pageCount; ++page) {
  pages.push(files.slice(page * filesPerPage, (page + 1) * filesPerPage));
}
pages.forEach(writePage);

function writePage(pageFiles, i) {
  console.log('Writing', pageFiles.length, 'links to page', i, '.');
  const html = `<html>
<head>
  <title>Page ${i}</title>
</head>
<body>
  <ul>
    ${pageFiles.map(file => `<li><a href="${file}">${file}</a></li>`).join('\n')}
  </ul>
  <a href="index-${i + 1}.html">Next page: ${i + 1}</a>
</body>
</html>`;
  var filename = i === 0 ? 'index.html' : `index-${i}.html`;
  fs.writeFile(`${fileDirPath}/${filename}`, html, { encoding: 'utf8' }, handleError);
}

function isWantedFile(file) {
  if (fileExts && fileExts.length > 0) {
    return fileExts.some((ext) => file.endsWith('.' + ext));
  }
  return true;
}

function handleError(error) {
  if (error) {
    console.error(error);
  }
}

