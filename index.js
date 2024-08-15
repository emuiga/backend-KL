const promise = new Promise ((resolve, reject) => {
    const result = Math.random() * 10

        if (result > 5) {
            resolve('Result is greater than 5')
        }else {
            reject('Result is less than 5')
        }
    })

promise.then((result) => {
    console.log('result')
})
.catch((error)=> {
    console.log(error)
})