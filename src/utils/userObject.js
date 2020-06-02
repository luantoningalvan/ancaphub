module.exports = (user, isAuthenticated) => ({
  _id: user._id,
  name: user.name,
  username: user.username,
  avatar: user.avatar,
  bio: user.bio,
  isVerified: user.isVerified,
  followersCount: user.followers.length || 0,
  followingCount: user.following.length || 0,
  ...(isAuthenticated && {
    followed_by: user.following.includes(isAuthenticated.id),
  }),
  ...(isAuthenticated && {
    following: user.followers.includes(isAuthenticated.id),
  }),
});
