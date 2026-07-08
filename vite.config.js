import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // La root del progetto è la cartella principale
  publicDir: 'public', // Cartella per gli asset statici
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        experience: resolve(__dirname, 'experience.html'),
        contact: resolve(__dirname, 'contact.html'),
        globuy: resolve(__dirname, 'cases/globuy.html'),
        revolut: resolve(__dirname, 'cases/revolut.html'),
        globite: resolve(__dirname, 'cases/globite.html')
      }
    }
  }
});
