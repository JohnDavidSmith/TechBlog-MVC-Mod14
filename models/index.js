
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Establishing the relationships

Post.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
}); 

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: 'CASCADE'
}); 

module.exports = { User, Post, Comment };
