import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import buble from 'rollup-plugin-buble';

export default [
  {
    // ESM build to be used with webpack/rollup.
    input: 'src/wrapper.js',
    output: {
      name: 'Lightbox',
      format: 'esm',
      file: 'dist/lightbox.esm.js',
      exports: 'named'
    },
    plugins: [
    vue({
      css: true,
      compileTemplate: true,
    }),
    buble()
    ]
  },
  // UMD build.
  {
    input: 'src/wrapper.js',
    output: {
      name: 'Lightbox',
      format: 'umd',
      file: 'dist/lightbox.umd.js',
      exports: 'named'
    },
    plugins: [
      vue({
        css: true,
        compileTemplate: true,
      }),
      buble()
    ]
  },
  // Browser build.
  {
    input: 'src/wrapper.js',
    output: {
      name: 'Lightbox',
      format: 'iife',
      file: 'dist/lightbox.js',
      exports: 'named'
    },
    plugins: [
      css(),
      vue({
        css: false,
        compileTemplate: true
      }),
      buble()
    ]
  }
]