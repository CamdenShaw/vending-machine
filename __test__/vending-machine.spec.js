jest.setMock("../src/inventory", require("../__mocks__/inventory.mock"))

const vendingMachine = require("../src/vendingMachine.js")

describe("A virtual machine that dispenses treats", () => {
    beforeEach(() => {
        test = {}
        test.itemName = "Coffee Crisp"
        test.inventory = {
            items: {
                [test.itemName]: {
                    price: 1.50,
                    stock: 4,
                    desiredStock: 10,
                    callCode: 'C5'
                }
            },
            coins: {
                nickels: {desired: 200, current: 110},
                dimes: {desired: 200, current: 90},
                quarters: {desired: 500, current: 10},
                loonies: {desired: 300, current: 203},
                toonies: {desired: 300, current: 109}
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
    describe("When a restock quote is requested", () => {
        it("Should return the value of the desired stock minus the current stock", () => {
            expect(test.vendingMachine.refillInventory()).toEqual({"Coffee Crisp": 6})
        })
    })
    describe("When a restock change quote is requested", () => {
        it("Should return the needed coin count to restock the vending machine's change", () => {
            expect(test.vendingMachine.restockChange()).toEqual({
                                                                    nickels: 90,
                                                                    dimes: 110,
                                                                    quarters: 490,
                                                                    loonies: 97,
                                                                    toonies: 191
                                                                })
        })
    })
    describe("When a call code is entered", () => {
        describe("When money is sufficient and code is valid", () => {
            it("Should return the selected snack", () => {
                expect(test.vendingMachine.giveTreat(1.50, "C5")).toEqual("Coffee Crisp")
            })
        })
        describe("When money is insufficient and code is valid", () => {
            it("Should throw an error", () => {
                expect(() => test.vendingMachine.giveTreat(1.00, "C5")).toThrow()
            })
        })
        describe("When money is sufficient and code is invalid", () => {
            expect(() => test.vendingMachine.giveTreat(1.50, "C6")).toThrow()
        })
    })
    describe("When treat is delivered", () => {
        describe("When money given is more than treat's price", () => {
            it("Should return change", () => {
                expect(test.vendingMachine.changeToReturn(2.45, "C5")).toEqual({
                                                                            value: 0.95,
                                                                            toonies: 0,
                                                                            loonies: 0,
                                                                            quarters: 3,
                                                                            dimes: 1,
                                                                            nickels: 1
                                                                        })
                expect(test.vendingMachine.changeToReturn(5.00, "C5")).toEqual({
                                                                            value: 3.50,
                                                                            toonies: 1, 
                                                                            loonies: 1,
                                                                            quarters: 2,
                                                                            dimes: 0,
                                                                            nickels: 0
                                                                        })
            })
        })
        describe("When money given is exactly the amount of treat's price", () => {
            it("Should not return change", () => {
                expect(test.vendingMachine.changeToReturn(1.50, "C5")).toBe(0)
            })
        })
    })
})