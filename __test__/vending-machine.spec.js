jest.setMock("../src/inventory", require("../__mocks__/inventory.mock"))

const vendingMachine = require("../src/vendingMachine.js")

describe("A virtual machine that dispenses treats", () => {
    beforeEach(() => {
        test = {}
        test.itemName = "Coffee Crisp"
        test.inventory = {
            [test.itemName]: {
                price: 1.50,
                stock: 4,
                desiredStock: 10,
                callCode: 'C5'
            }
        }
        test.vendingMachine = new vendingMachine(test.inventory)
    })
    describe("When money is put into the machine", () => {
        describe("When a coin is inserted", () => {
            it("Should return the value based on weight, diameter and thickness", () => {
                expect(test.vendingMachine.coinAnalysis(28, 7.3, 1.8)).toBe(2.00)
                expect(test.vendingMachine.coinAnalysis(26.5, 6.27, 1.95)).toBe(1.00)
                expect(test.vendingMachine.coinAnalysis(23.88, 4.4, 1.58)).toBe(0.25)
                expect(test.vendingMachine.coinAnalysis(18.03, 1.75, 1.22)).toBe(0.10)
                expect(test.vendingMachine.coinAnalysis(21.2, 3.95, 1.76)).toBe(0.05)
            })
        })
        describe("When value of coins has been returned", () => {
            it("Should throw an error if the arguments are not numbers", () => {
                expect(() => test.vendingMachine.countMoney('4', '5', '6')).toThrow()
            })
            it("Should display the total of money put into the machine", () => {
                expect(test.vendingMachine.countMoney(4, 5, 6)).toBe(15)
            })
        })
    })
    describe("When an inventory count is requested", () => {
        it("Should return the stock count of all items in the machine", () => {
            expect(test.vendingMachine.printInventory()).toEqual({"Coffee Crisp": 4})
        })
    })
})