
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

Comment.belongsTo(Post, {
    foreignKey: "post_id", 

}); 

Comment.belongsTo(User, {
    foreignKey: "user_id", 
    
}); 


module.exports = { User, Post, Comment };
