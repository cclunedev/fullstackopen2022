const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)
    return likesArray.reduce((partialSum, a) => partialSum + a, 0);
}


  module.exports = {
    dummy,
    totalLikes
  }