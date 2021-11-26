const ENDPOINT_GET_BILLS = 'http://localhost:3000/api/bills'
const ENDPOINT_POST_BILL = 'http://localhost:3000/api/bill/new'
const ENDPOINT_GET_BILL = 'http://localhost:3000/api/bill/'



function createBillRequest(cy) {
    cy.authenticateSession().then((response => {
        const payload = {
            "value":"1300",
            "paid":true
        }
        //POST request to create a bill
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_BILL,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: payload
        }).then((response => {
            cy.log(JSON.stringify(response))
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(payload.value)
        }))
        getRequestAllBillsWithAssertion(cy)
    }))
}
function getRequestAllBillsWithAssertion(cy) {
    //GET request to fetch all rooms
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,
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



function getAllBillsRequest(cy){
    cy.authenticateSession().then((response => {
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_BILLS,
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

function deleteBillAfterGet(cy) {
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        let lastID = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_BILL+lastID,
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
    
    createBillRequest,
    getAllBillsRequest,
    getRequestAllBillsWithAssertion,
    deleteBillAfterGet

  
    
}