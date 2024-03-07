// next.config.js

module.exports = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/signupLogin',
      },
      {
        source: '/signup',
        destination: '/signupLogin',
      },
    ];
  },
};
