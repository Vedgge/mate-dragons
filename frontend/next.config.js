module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Verificar cambios cada segundo
      aggregateTimeout: 300, // Agregar un retraso para evitar la reconstrucción excesiva
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "mate-dragons.railway.internal/api/:path*", // Ruta de la API de Symfony
      },
    ];
  },
};
// c:\Users\facun\OneDrive\Escritorio\mate-dragons\frontend\next.config.js

module.exports = {
  images: {
    domains: ["localhost"],
  },
};
