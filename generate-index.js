const fs = require('fs');
const path = require('path');

function listIndexFiles(dir, baseUrl = '') {
  let links = '';
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // cek apakah folder punya index.html
      const indexPath = path.join(fullPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        links += `<li><a href="${baseUrl + file + '/index.html'}">${baseUrl + file}/index.html</a></li>\n`;
      }
      // lanjut rekursif ke subfolder
      links += listIndexFiles(fullPath, baseUrl + file + '/');
    }
  }
  return links;
}

const html = `
<!DOCTYPE html>
<html>
<head><title>Manifest</title></head>
<body>
<h1>Daftar index.html</h1>
<ul>
${listIndexFiles('./')}
</ul>
</body>
</html>
`;

fs.writeFileSync('index.html', html);
