/** @type {import('next').NextConfig} */
const nextConfig = {
 
  assetPrefix: "",
  basePath: "",
  output: "export",
  distDir: "out", // Change the output directory to 'out' for export

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
