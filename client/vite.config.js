// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




// export default {
//   build: {
//     outDir: 'dist', // Output directory specified here (default: 'dist')
//   },
// };


// const baseurl = "https://famous-pear-underclothes.cyclic.cloud/"
const baseurl = "http://localhost:3000"

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/register-post': baseurl,  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173
      '/register-user': baseurl,  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173
      '/register-google-user': baseurl,  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173
      '/login-user': baseurl,  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173
      '/user-auth': baseurl,  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173
      '/fetch-posts': baseurl,  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173
      '/handle-upvote': baseurl,  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173
      '/handle-downvote': baseurl,  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173
      '/handle-delete-post': baseurl,  // THIS IS BACKEND'S URL,  THE FRONTEND'S URL IS FROM -> http://localhost:5173
    }
  },
  plugins: [react()]
})