describe('Authentication',()=>{
    it('basic Authentication',()=>{
        cy.request(
            {
                method:'GET',
                url:'https://postman-echo.com/basic-auth',
                auth:{
                    user:'postman',
                    pass:'password'
                }
            }
        ).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)

        })
    })

    it('Digest Authentication',()=>{
        cy.request(
            {
                method:'GET',
                url:'https://postman-echo.com/basic-auth',
                auth:{
                    username:'postman',
                    password:'password',
                    method:'degest'
                }
            }
        ).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)

        })
    })
    
 const Token='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'   ;

it("BearerToken Auth",()=>{
cy.request({
    method:'GET',
    url:'https://api.github.com/user/repos',
    headers:{
        Authorization:`Bearer ${Token}`
    }
}).then((response)=>{
    expect(response.status).to.eq(200)
})
})
it('API key Auth',()=>{
    cy.request(
  {
  method:'GET',
  url:'api.openweathermap.org/data/2.5/forecast/daily?q=Delhi',
  qs:{
    appid:'d22e5fb740ce5690058f0a3d9c4a735c'   , //API key and value
  }
  }
).then((response)=>{
    expect(response.status).to.eq(200)
})
})





})