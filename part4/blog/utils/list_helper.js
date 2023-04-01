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

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return []
    }
    else {
        const likesByAuthor = _(blogs)
                                .groupBy('author')
                                .map((pairs, id) => ({
                                author: id,
                                likes: _.sumBy(pairs, 'likes'),
                                })
                                ).value()

        const mostLikedAuthor = likesByAuthor.reduce((max, obj) => max.likes > obj.likes ? max : obj);
        return mostLikedAuthor
    }
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }