import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/main.ts'],
  // bundle internal packages
  noExternal: ['@repo'],
  splitting: true,
  bundle: true,
  outDir: '../../dist/lounge-bot',
  clean: true,
  env: { IS_SERVER_BUILD: 'true' },
  loader: { '.json': 'copy' },
  minify: true,
  sourcemap: true,
});
