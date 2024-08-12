import { configDotenv } from 'dotenv';
import path from "path"
configDotenv({path:"env"})
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.dummyjson.com"],  // Add the correct domain here
    },
};

export default nextConfig;
