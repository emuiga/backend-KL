const express = require("express") //import 
const pg = require("pg")

const app = express()
const { Client } = pg 

async function main() {
//configure db
const client = new Client({
    host:"localhost",
    user:"postgres",
    password:"password",
    database:"webdev",
    port:5432,
})

await client.connect()

app.use(express.json())

app.get("/books", async (req, res)=> {
    const result = await client.query("SELECT * FROM books")
    const books = result.rows
    res.send(books)
})

app.post("/books", async (req,res) => {
    try{
        const result = await client.query('INSERT INTO books (title, rating) VALUES ($1, $2)', [
        req.body.title, req.body.rating
    ])
    res.send("Book created.")
}
    catch (err){
        res.status(500).send(err.message)
    }
})
app.listen(3000, ()=> {
    console.log('server is running on http://localhost:3000')
})
}

main()
// const books = [
//     {
//         id: 1,
//         title: "Anonymous Rex",
//         rating: 4.0,
//     },
//     {
//         id: 2,
//         title: "The Giver",
//         rating: 4.5,
//     }
// ]

// //describe route
// app.get("/", (request, res )=> {
//     res.send("Testing out endpoints")
// })

// app.get("/books", (request, res) => {
//     res.send(books)
// })
// app.get("/books/:id", (request, res) => {
//     const { id } = request.params

//     console.log(typeof id)

//     const book = books.find((b) => b.id == (id))

//     if(!book){
//         res.status(404).send(`Book with id ${id} not found`)
//     }
//     console.log(book)
//     res.send(book)
// })
//initialize server, takes 2 parameters; port number, callback fn
  
