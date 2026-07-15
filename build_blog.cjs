const fs = require('fs');
let html = fs.readFileSync('pakistani-wedding-hairstyles.html', 'utf8');
html = html.replace(/<title>.*?<\/title>/, '<title>Indian Wedding Hairstyles: The Complete Guide by Function, Face Shape & Region</title>');
html = html.replace(/<meta name="description" content=".*?">/, '<meta name="description" content="Plan every bridal hairstyle from haldi to reception — by face shape, hair type, and region — plus real trial timelines and cost ranges for Indian weddings.">');
html = html.replace(/<link rel="canonical" href=".*?" \/>/, '<link rel="canonical" href="https://www.weddingplanningchecklists.org/blog/indian-wedding-hairstyles-guide" />');
fs.writeFileSync('indian-wedding-hairstyles-guide.html', html);
console.log('Created html file');
