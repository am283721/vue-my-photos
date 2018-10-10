import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
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
  // UMD build.
  {
    input: 'src/main.js',
    output: {
      format: 'umd',
      file: 'dist/build.umd.js'
    },
    plugins: [
      vue()
    ]
  },
  // Browser build.
  {
    input: 'src/wrapper.js',
    output: {
      name: 'Lightbox',
      format: 'iife',
      file: 'dist/vue-my-photos.js'
    },
    plugins: [
      css(),
      vue({ css: false })
    ]
  }
]