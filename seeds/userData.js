const { User } = require('../models');

const userData = [
  {
    name: "Kaden",
    email: "kaden@email.com",
    password: "applesauce3",
  },
  {
    name: "Joshua",
    email: "josh@email.com",
    password: "picklerick18",
  },
  {
    name: "Kelsey",
    email: "kelsey@email.com",
    password: "balthazar46",
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;