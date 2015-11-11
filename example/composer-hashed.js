var fs = require('fs');
var path = require('path');
var composer = require('..');

var input   = __dirname+'/index.scss';
var output  = __dirname+'/build/build.css';

composer()
  .entry(input)
  .use(composer.plugins.url({transforms: [composer.plugins.url.transforms.hashed({
    dir: path.dirname(output),
    copy: true
  })]}))
  .compose()
    .on('error', function(err) {
      console.error('Error rendering SASS file "'+output+'": \n', err.message);
    })
    .pipe(fs.createWriteStream(output)) //will fail if the output directory isn't created in time by the URL plugin (if at all)
    .on('error', function(err) {
      console.error('Error writing file "'+output+'": \n', err.message);
    })
    .on('finish', function() {
      console.log('Composed "'+path.basename(input)+'" to "'+path.basename(output)+'".');
    })
;