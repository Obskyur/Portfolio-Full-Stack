/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		baseURL: process.env.NODE_ENV === "production" ? "https://dev.d1ad492mx0tsen.amplifyapp.com" : "http://localhost:3001",
	},
};

export default nextConfig;
