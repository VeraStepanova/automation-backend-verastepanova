///<reference types="cypress" />

import * as roomHelpers from '../helpers/roomHelpers'
import * as billHelpers from '../helpers/billHelpers'


describe('Test suite', function () {
   
    it('Create a room', function () {
        roomHelpers.createRoomRequest(cy)
    })

    it('Get all rooms', function () {
        roomHelpers.getAllRoomsRequest(cy)
    })

    it('Delete room', function () {
        roomHelpers.deleteRoomAfterGet(cy)
    })

    it('Create Bill', function(){
        billHelpers.createBillRequest(cy)
    })

    it('Get all bills', function () {
        billHelpers.getAllBillsRequest(cy)
    })

    it('Delete bill', function () {
        billHelpers.deleteBillAfterGet(cy)
    })


})
