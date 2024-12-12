describe("api testing",()=>{

    it("Appraoch1-hard coded json object",()=>{

        const requestBody={
            title:'Testpost',
            body:'Testpost6@gmail.com',
            userId:1
        }
        cy.request(
            {
                method: 'POST',
                url:'https://jsonplaceholder.typicode.com/posts',
                body:requestBody
            })
            .then((response)=>{
                expect(response.status).to.equal(201)
                expect(response.body.title).to.equal('Testpost')
                expect(response.body.body).to.equal('Testpost6@gmail.com')
                expect(response.body.userId).to.equal(1)
            })
    })
    it("Appraoch2-Dynamically generating  json object",()=>{

        const requestBody={
            title: Math.random().toString(5).substring(2),
            body: Math.random().toString(5).substring(2)+"gmail.com",
            userId:Math.random()
        }
        cy.request(
            {
                method: 'POST',
                url:'https://jsonplaceholder.typicode.com/posts',
                body:requestBody
            })
            .then((response)=>{
                expect(response.status).to.equal(201)
                expect(response.body.title).to.equal(requestBody.title)
                expect(response.body.body).to.equal(requestBody.body)
                expect(response.body.userId).to.equal(requestBody.userId)
            })
    })

    it.only("Appraoch3-using fixture",()=>{

    cy.fixture('tourist').then((myfixture)=>{
       const requestBody =myfixture;

       cy.request(
        {
            method: 'POST',
            url:'https://jsonplaceholder.typicode.com/posts',
            body:requestBody
        })
        .then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body.title).to.equal(requestBody.title)
            expect(response.body.body).to.equal(requestBody.body)
            expect(response.body.userId).to.equal(requestBody.userId)
            
            // autre validation
            expect(response.body).has.property('title',requestBody.title)
            expect(response.body).to.have.property('body',requestBody.body)
        })

        })
       
    })


})