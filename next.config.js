const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
}

module.exports = {
  ...nextConfig,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = [{ bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate" }];
    }

    return config;
  },
}
