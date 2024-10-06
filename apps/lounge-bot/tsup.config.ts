import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/'],
  // bundle internal packages
  noExternal: ['@repo'],
  splitting: true,
  bundle: false,
  outDir: './dist',
  clean: true,
  env: { IS_SERVER_BUILD: 'true' },
  loader: { '.json': 'copy' },
  minify: true,
  sourcemap: true,
  format: ['esm']
});
