
const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms'
const ENDPOINT_POST_ROOM = 'http://localhost:3000/api/room/new'
const ENDPOINT_GET_ROOM = 'http://localhost:3000/api/room/'



function createRoomRequest(cy) {
    cy.authenticateSession().then((response => {
        const payload = {
            "features":["balcony"],
            "category":"single",
            "number":103,
            "floor":1,
            "available":true,
            "price":1000,
        }
        //POST request to create a room
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: payload
        }).then((response => {
            cy.log(JSON.stringify(response))
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(payload.price)
        }))
        getRequestAllRoomsWithAssertion(cy)
    }))
}

function getRequestAllRoomsWithAssertion(cy) {
    //GET request to fetch all rooms
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        const responseAsString = JSON.stringify(response)
    
        cy.log(response.body[response.body.length -1].id)
        cy.log(response.body.length)
    }))
}



function getAllRoomsRequest(cy){
    cy.authenticateSession().then((response => {
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
        }))
    }))
}



function deleteRoomAfterGet(cy) {
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        let lastID = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_ROOM+lastID,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },

        }).then((response => {
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('true')
        }))
    }))
}


module.exports = {
    
    createRoomRequest,
    getAllRoomsRequest,
    getRequestAllRoomsWithAssertion,
    deleteRoomAfterGet
  
    
}