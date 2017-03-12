module.exports = {
  webpack: (config, options, webpack) => {
    // Important: return the modified config

    config.module.rules.push({
      test: /\.(graphql)$/,
      exclude: /node_modules/,
      loader: 'raw-loader',
    });

    return config;
  },
};
