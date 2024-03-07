// next.config.js

module.exports = {
  async rewrites() {
    console.log("Rewrites called");
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
