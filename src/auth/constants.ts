export default () => ({
  jwtConstants: {
    accessTokenSecret: process.env.AT_SECRET,
    refreshTokenSecret: process.env.RT_SECRET,
  },
});
