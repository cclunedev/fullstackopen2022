const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Dinks of the World',
        author: 'Connor C',
        url: 'https://dinksoftheworld.com',
        likes: 100
    },
    {
        title: 'Blah Blog',
        author: 'Connor C',
        url: 'https://google.com',
        likes: 17
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    initialBlogs, nonExistingId, blogsInDb
  }