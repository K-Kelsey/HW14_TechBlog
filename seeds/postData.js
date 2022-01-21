const { Post } = require('../models');

const postData = [
  {
    title: "Dave Franco",
    body: "A kind gentleman the other day told me that I looked like Dave Franco. Although I care no resemblence of the actor, the comment was kind and sincere."
  },
  {
    title: "Bus Stories",
    body: "True story, I was once on a public metro when Dave Mathew walks on to the bus with his iconic fedora/ You go Dave, I later found out that his children attend the co-op that was located across the street from my apartment at the time."
  },
  {
    title: "Period Crisis",
    body: "My period key on my key board broke the other day, so now this post will be forever incomplete due to the missing period key   "
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;