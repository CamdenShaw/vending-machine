jest.setMock("../src/inventory", require("../__mocks__/inventory-data.mock"))

const vendingMachine = require("../src/vendingMachine")

describe("A virtual machine that dispenses treats", () => {
    beforeEach(() => {
        test = {}
        test.inventory = {
            coffeeCrisp: {
                price: 1.50,
                stock: 4,
                desiredStock: 10,
                callCode: 'C5'
            }
        }
        test.vendingMachine = new vendingMachine(test.inventory)
    })
    describe("When money is put into the machine", () => {
        it("Should throw an error if the arguments are not numbers", () => {
            expect(() => test.vendingMachine.countMoney('4', '5', '6')).toThrow()
        })
        it("Should display the total of money put into the machine", () => {
            expect(test.vendingMachine.countMoney(4, 5, 6)).toEqual(15)
        })
    })
})