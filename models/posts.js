var Post = require('../lib/mongo').Post;

module.exports = {
  // create a post
  create: function create(post) {
    return Post.create(post).exec();
  }
}