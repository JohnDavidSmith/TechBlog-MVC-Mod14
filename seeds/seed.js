
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./posts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

   // Retrieve the created users
   const users = await User.findAll();

   // Map the user IDs to the post data
   const postsWithUserId = postData.map(post => {
     const randomUserId = users[Math.floor(Math.random() * users.length)].id;
     return { ...post, user_id: randomUserId };
   });
 
   await Post.bulkCreate(postsWithUserId);

  process.exit(0);
};

seedDatabase();
