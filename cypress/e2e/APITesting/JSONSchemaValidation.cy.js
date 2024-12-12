// install ajv library
// npm install ajv    -command prompt/terminal

const Ajv=require ('ajv') //AJV (Another JSON Schema Validator) est une bibliothèque JavaScript utilisée pour valider des données contre un schéma JSON.
const avj=new Ajv() //Le script importe la bibliothèque et crée une instance de l'objet AJV pour valider les réponses JSON.



describe('Schema validation',()=>{  // describe définit un groupe de tests (ici, "Schema validation").

    it('schema validation against response',()=>{ // it est un cas de test spécifique (ici, validation du schéma).
        
         cy.request(
            {
                method:'GET',
                url:'https://fakestoreapi.com/products'

            }
         )
         .then((response)=>{
            const schema = {
                
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "title": "Generated schema for Root",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number"
                        },
                        "title": {
                          "type": "string"
                        },
                        "price": {
                          "type": "number"
                        },
                        "description": {
                          "type": "string"
                        },
                        "category": {
                          "type": "string"
                        },
                        "image": {
                          "type": "string"
                        },
                        "rating": {
                          "type": "object",
                          "properties": {
                            "rate": {
                              "type": "number"
                            },
                            "count": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "rate",
                            "count"
                          ]
                        }
                      },
                      "required": [
                        "id",
                        "title",
                        "price",
                        "description",
                        "category",
                        "image",
                        "rating"
                      ]
                    
                  }
            }

            const validate=avj.compile(schema) //check the response is according to the schema or not : Compile le schéma JSON en une fonction de validation.
           const isvalide= validate(response.body) //Vérifie si le corps de la réponse (response.body) est conforme au schéma
           expect(isvalide).to.be.true; //Assertion qui s'assure que la réponse respecte le schéma défini.
            
         })
    })

})