const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)
    return likesArray.reduce((partialSum, a) => partialSum + a, 0);
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return []
    }
    else {
        const mostLikes = Math.max(...blogs.map(blog => blog.likes))
        const {_id, __v, url, ...mostLikedBlog} = blogs.filter(blog => blog.likes == mostLikes)[0]
        return mostLikedBlog
    }

}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return []
    }
    else {
        maxAuthor =  _.head(_(blogs)
                        .countBy('author')
                        .entries()
                        .maxBy(_.last))
        
        return {
                "author": maxAuthor,
                "blogs": blogs.filter(blog => blog.author == maxAuthor).length
        }
    }
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }