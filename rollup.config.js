import vue from 'rollup-plugin-vue'
export default [
  {
    // ESM build to be used with webpack/rollup.
    input: 'src/main.js',
    output: {
    format: 'esm',
    file: 'dist/build.esm.js'
    },
    plugins: [
    vue()
    ]
  },
  // SSR build.
  {
    input: 'src/main.js',
    output: {
      format: 'cjs',
      file: 'dist/build.ssr.js'
    },
    plugins: [
      vue({ template: { optimizeSSR: true } })
    ]
  },
  // Browser build.
  {
    input: 'src/wrapper.js',
    output: {
      format: 'iife',
      file: 'dist/vue-my-photos.js'
    },
    plugins: [
      css(),
      vue({ css: false })
    ]
  }
]