// install xml2js library
//npm install xml2js

import xml2js from 'xml2js';
//const parser =new xml2js.Parser({explicitArry:false});  : c'est faut à cause de l'absence d'espace ({explicitArry:false})
const parser = new xml2js.Parser({ explicitArray: false }); //: the good forma 

describe('XML Parsing',()=>{
    const xmlPayload ="<Pet>     <Category>     <id>0</id>     <name>Dog</name>     </Category>     <name>Jimmy</name>     <photoUrls>         <photoUrl>string</photoUrl>     </photoUrls>     <tags>         <tag>             <id>0</id>             <name>string</name>         </tag>     </tags>     <status>avaible</status>     </Pet>"
 let petid=null;

   before("Creating PET",()=>{
    cy.request(
       {
        method:'POST',
        url:'https://petstore.swagger.io/v2/pet',
        body:xmlPayload,
        headers:{'Content-Type':'application/xml',
            'accept':'application/xml'
        }
       } 
    ).then((response)=>{
        expect(response.status).to.eq(200)
        parser.parseString(response.body,(err,result)=>{
            petid=result.Pet.id;
        })
       
    })
})
it("Fetching Pet data-parsing xml response",()=>{
    cy.request(
       {
        method:'GET',
        url:'https://petstore.swagger.io/v2/pet/'+petid,
        headers:{
            'accept':'application/xml'
           }
       } 
    ).then((response)=>{
        expect(response.status).to.eq(200)
        parser.parseString(response.body,(err,result)=>{
            expect(result.Pet.id).to.eq(petid);
            expect(result.Pet.name).to.eq("Jimmy")
         

        })
       
    })
})
    
})