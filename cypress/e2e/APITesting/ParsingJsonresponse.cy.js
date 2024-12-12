describe('Parsing JSON Responee',()=>{

    it('Parsing simple Json response',()=>{
        cy.request({

            method :'GET',
            url :'https://fakestoreapi.com/products',

        })
        .then((response)=>{
     expect(response.status).to.eql(200);
     expect(response.body[0].id).to.eql(1)
     expect(response.body[0].title).to.eql("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
     expect(response.body[0].price).to.eql(109.95)
     expect(response.body[0].rating.rate).to.eql(3.9)


     
     expect(response.body[19].id).to.eql(20)
     expect(response.body[19].title).to.eql("DANVOUY Womens T Shirt Casual Cotton Short")
     expect(response.body[19].price).to.eql(12.99)
     expect(response.body[19].rating.rate).to.eql(3.6)

        })
    })


    it.only('Parsing complex Json response',()=>{
       let totalprice=0;
        cy.request({

            method :'GET',
            url :'https://fakestoreapi.com/products',
            qs:{limit:3}

        })
        .then((response)=>{
      expect(response.status).to.eql(200);
      response.body.forEach(element =>{
        totalprice = totalprice+element.price;

      })
    // expect(totalprice).to.eql(899.23) // limit 5 
        expect(totalprice).to.eql(188.24) // limit 3 

        })
    })
})