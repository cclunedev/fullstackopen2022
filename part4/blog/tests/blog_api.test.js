const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('GET /api/blogs data validation', () => {
    test('GET /api/blogs returns the correct number of blogs', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

})


describe('POST /api/blogs validation', () => {
    test('post /api/blogs will default likes to 0 if not provided', async () => {
        const newBlog = {
        
            title: 'Nobody Likes This',
            author: 'Connor C',
            url: 'https://nobodylikesthis.com'
        }

        const response = await api.post('/api/blogs').send(newBlog)
        const contents = response.body
        expect(response.body.likes).toBeDefined()



    })

    test('post /api/blogs with no title receives 400 status code', async () => {
        const newBlog = {
            author: 'Connor C',
            url: 'https://titleless.com',
            likes: 1000
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    })

    test('post /api/blogs with no url receives 400 status code', async () => {
        const newBlog = {
            title: 'What is this URL?',
            author: 'Connor C',
            likes: 1000
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    })

    test('post /api/blogs request creates a new blog post', async () => {
        const newBlog = {
        
            title: 'Ripping Dingers',
            author: 'Connor C',
            url: 'https://hittingtanks.com',
            likes: 1000
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)
        expect(contents).toContain(
            'Ripping Dingers'
        )
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    })

})

describe('DELETE /api/blogs/:id validation', () => {
    test('DELETE /api/blogs/:id will delete a blog post with the matching id', async () => {
        
        const originalResponse = await api.get('/api/blogs')
        const originalIds = originalResponse.body.map(r => r.id)
        const idToDelete = originalIds[0]
        await api
            .delete(`/api/blogs/${idToDelete}`)
            .expect(204)

        const deleteResponse = await api.get('/api/blogs')
        const deleteIds = deleteResponse.body.map(r => r.id)
        expect(deleteIds).toHaveLength(originalIds.length - 1)
        expect(deleteIds).toContain(originalIds[1])

    })

    test('DELETE /api/blogs/:id with invalid id will return 400 status code', async () => {
        await api
            .delete(`/api/blogs/123`)
            .expect(400)

    })

})

describe('PUT /api/blogs/:id validation', () => {
    test('PUT /api/blogs/:id will update a blog post with the matching id', async () => {
        
        const newBlog = {
        
            title: 'Update By Id',
            author: 'Connor C',
            url: 'https://hittingtanks.com',
            likes: 1000
        }

        const originalResponse = await api.get('/api/blogs')
        const originalIds = originalResponse.body.map(r => r.id)
        const idToUpdate = originalIds[0]
        
        await api.put(`/api/blogs/${idToUpdate}`).send(newBlog).expect(200)


        const updatedBlog = await api.get(`/api/blogs/${idToUpdate}`)
        expect(updatedBlog.body.title).toEqual(newBlog.title)
        expect(updatedBlog.body.author).toEqual(newBlog.author)
        expect(updatedBlog.body.url).toEqual(newBlog.url)
        expect(updatedBlog.body.likes).toEqual(newBlog.likes)
        

    })

    test('PUT /api/blogs/:id with an invalid id will return 400 status code', async () => {
        await api
            .put(`/api/blogs/123`)
            .expect(400)

    })

    test('PUT /api/blogs/:id just likes updates only likes', async () => {
        const newBlog = {
            likes: 1000
        }


        const originalResponse = await api.get('/api/blogs')
        const originalIds = originalResponse.body.map(r => r.id)
        const idToUpdate = originalIds[0]
        console.log(originalResponse.body[0])
        
        await api.put(`/api/blogs/${idToUpdate}`).send(newBlog).expect(200)
        
        const updatedBlog = await api.get(`/api/blogs/${idToUpdate}`)
        expect(updatedBlog.body.title).toEqual(originalResponse.body[0].title)
        expect(updatedBlog.body.author).toEqual(originalResponse.body[0].author)
        expect(updatedBlog.body.url).toEqual(originalResponse.body[0].url)
        expect(updatedBlog.body.likes).toEqual(newBlog.likes)

    })

})

afterAll(async () => {
    await mongoose.connection.close()
    })