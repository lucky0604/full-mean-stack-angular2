module.exports = {
  port: 3000,
  session: {
    secret: 'lucky',
    key: 'lucky',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost/myblog'
}