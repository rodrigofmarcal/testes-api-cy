/// <reference types="cypress" />

describe('Login', () => {

    it('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'login',
            body: {
                "email": "isabelamarcal@gmail.com" ,
                "password": "teste" 
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.be.equal('Login realizado com sucesso')
            cy.log(response.body.authorization)
        })
    });

});
