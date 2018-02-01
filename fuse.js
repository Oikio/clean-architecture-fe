const { FuseBox, Sparky, WebIndexPlugin } = require('fuse-box')

const fuse = FuseBox.init({
  sourceMaps: true,
  showErrors: true,
  showErrorsInBrowser: true,
  experimentalFeatures: true,
  useTypescriptCompiler: true,
  homeDir: 'src',
  output: 'dist/$name.js',

  plugins: [WebIndexPlugin()]
})

Sparky.task('dev', () => {
  fuse
    .bundle('app')
    .instructions(`>index.ts`)
    .hmr({ reload: true })
    .watch()

  fuse.dev({})
  fuse.run()
})

Sparky.task('build', () => {
  fuse.bundle('app').instructions(`>index.ts`)

  fuse.run()
})
