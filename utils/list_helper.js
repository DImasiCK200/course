const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;

  let mostLiked = null;

  blogs.forEach((blog) => {
    if (!mostLiked || blog.likes > mostLiked.likes) {
      mostLiked = { ...blog };
    }
  });

  return mostLiked;
};

const mostBlog = (blogs) => {
  if (!blogs.length) return null;

  const counts = lodash.countBy(blogs, "author");

  const [author, blogsCount] = lodash.maxBy(
    lodash.toPairs(counts),
    ([author, count]) => count,
  );

  return {
    author,
    blogs: blogsCount,
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;

  const groupedBlogs = lodash.groupBy(blogs, "author");

  const sumLikesBlogs = lodash.mapValues(groupedBlogs, (blogsArray) =>
    lodash.sumBy(blogsArray, "likes"),
  );

  const [author, likesSum] = lodash.maxBy(
    lodash.toPairs(sumLikesBlogs),
    ([author, likes]) => likes,
  );

  return {
    author,
    likes: likesSum,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
};
