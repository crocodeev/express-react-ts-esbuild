const { build } = require('esbuild');
const chokidar = require('chokidar');
const servor = require('servor');
const fs = require('fs');


(async () => {

    const builder = await build({

        bundle: true,
        sourcemap: true,
        entryPoints: ['./src/client/index.tsx'],
        incremental: true,
        minify: false,
        outdir: './build/public/static'
    });

    chokidar
    .watch('./src/client/**/*.{ts,tsx}', {
        awaitWriteFinish: {
          stabilityThreshold: 2000,
          pollInterval: 100,
        },
      })
    .on('add', () => {
        builder.rebuild();
      })
    .on('change', (path) => {
        console.log(`File ${path} has been changed to client app`);
        builder.rebuild();
      })
    .on('unlink', (path) => {
        console.log(`File ${path} has been removed to client app`);
        builder.rebuild();
      })
    .on('addDir', (path) => {
        console.log(`Directory ${path} has been added to client app`);
        builder.rebuild();
      })
    .on('unlinkDir', (path) => {
        console.log(`Directory ${path} has been removed to client app`);
        builder.rebuild();
      });
      
    fs.copyFile('./src/client/indexTemplate.html', './build/public/index.html', (err) => {
        if (err) throw err;
    }); 
    
    await servor({
        root: './build/public/',
        static: false,
        fallback: 'index.html',
        reload: true,
        port: 8000
    })
    
    console.info(['Servor hot refresh at  http://localhost:8000'])
})()

