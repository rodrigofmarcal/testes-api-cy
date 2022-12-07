/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
    let token

    beforeEach(() => {
        cy.token('isabelamarcal@gmail.com', 'teste').then(tkn => { token = tkn })
    });

    it('Deve validar contrato de usuários', () => {
        cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)
        })


    });

    it('Deve listar usuários cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios'

        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(50)

        })

    });

    it('Deve cadastrar um usuário com sucesso', () => {
        let usuario = `usuario` + `${Math.floor(Math.random() * 100000000)}`
        let email = `${usuario}@qa.com`
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Isabela P Marcal",
                "email": email,
                "password": "teste",
                "administrador": "true"


            },
            headers: { authorization: token }
        }).then((response => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.be.equal("Cadastro realizado com sucesso")
        }))
        failOnStatusCode: false
    });

    it('Deve validar um usuário com email inválido', () => {
        cy.cadastrarUsuario("Fulano da Silva", "beltranoqa.com.br", "teste", "true")
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.email).to.equal('email deve ser um email válido')
            })



    });

    it('Deve editar um usuário previamente cadastrado', () => {
        cy.request('usuarios').then(response => {
            let id = response.body.usuarios[1]._id
            let usuario = `usuario` + `${Math.floor(Math.random() * 100000000)}`
            let email = `${usuario}@qa.com`
            cy.request({
                method: 'PUT',
                url: `usuarios/${id}`,
                headers: { authorization: token },
                body:
                {
                    "nome": "Fulano da Silva",
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
                }
            }).then(response => {
                expect(response.body.message).to.equal("Registro alterado com sucesso")
            })
        })

    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        let usuario = `usuario` + `${Math.floor(Math.random() * 100000000)}`
        let email = `${usuario}@qa.com`
            
        cy.cadastrarUsuario("Fulano Silva", "fulanosilva@qa.com.br", "teste", "true")
                  .then(response => {
                let id = response.body._id
                console.log(response)
               
               
                cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`

                }).then((response => {
                    expect(response.body.message).to.equal("Registro excluído com sucesso")
                    expect(response.status).to.be.equal(200)

                }))

            })
    })
});


