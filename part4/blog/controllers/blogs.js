const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const responseBlog = await Blog.findById(request.params.id)
  response.json(responseBlog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog =
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    }
  
  const updatedBlog = await Blog.findByIdAndUpdate({_id: request.params.id}, blog, {new: true})
  const updatedBody = updatedBlog.body
  response.status(200).json(updatedBody)

    
})

module.exports = blogsRouter