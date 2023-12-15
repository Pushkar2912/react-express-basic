const express = require('express');
const router = express.Router();

let DEFAULT_ID = 1;
let blogs = [
    {
        id: DEFAULT_ID,
        name: "Pushkar",
        content: "Sample blog"
    }
]

// GET blogs

router.get('/', (req, res) => {
    return res.json({
        blogs,
        count: blogs.length,
        success: true
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const blog = blogs.find((blog) => {
        return (blog.id == id)
    })

    if (blog) {
        return res.json({
            blog,
            success: true
        });
    }

    return res.status(404).json({
        blog: null,
        success: false,
        message: `Could not find blog with id- ${id} `
    })

})

router.post('/', (req, res) => {
    const body = req.body
    const blog = { ...body, id: ++DEFAULT_ID }
    blogs.push(blog)
    return res.json({
        blog,
        success: true
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log("id", id);
    console.log("request Body", req.body);
    const body = req.body;
    console.log("Body from put",body);
    // const blog = blogs.find((blog) => {
    //     return blog.id == id;
    // })

    blogs = blogs.map((blog) => {
        if(blog.id == id){
            return {
                ...blog,
                ...body
            }
        }
        return blog
    })
    return res.json({
        blogs
    })
})

// router.put('/:id', (req, res) => {

//     return res.json({
//         body: req.body
//     })
// })

router.delete('/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    
    blogs = blogs.filter((blog) => {
        return (blog.id != id)
    })
    // console.log(blog);
    return res.json({
        blogs
    })
})

module.exports = router