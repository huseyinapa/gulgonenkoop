export const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development';
const port = isDevelopment ? '3000' : '80';

export const api_url = isDevelopment ? `http://51.21.106.119` : 'https://backend.gulgonenkoop.com/api_gulgonen';