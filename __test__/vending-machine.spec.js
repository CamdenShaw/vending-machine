const vendingMachine = require("../src/vendingMachine.js")
const data = require("../src/inventory")

describe("A virtual machine that dispenses treats", () => {
    test.vendingMachine = new vendingMachine(data)
    describe("Coin Analysis", () => {
        describe("When a coin is inserted", () => {
            it("Should return the value based on weight, diameter and thickness", () => {
                expect(test.vendingMachine.coinAnalysis(28, 7.3, 1.8)).toBe(2.00)
                expect(test.vendingMachine.coinAnalysis(26.5, 6.27, 1.95)).toBe(1.00)
                expect(test.vendingMachine.coinAnalysis(23.88, 4.4, 1.58)).toBe(0.25)
                expect(test.vendingMachine.coinAnalysis(18.03, 1.75, 1.22)).toBe(0.10)
                expect(test.vendingMachine.coinAnalysis(21.2, 3.95, 1.76)).toBe(0.05)
            })
            it("Should return 'reject' if coin is invalid", () => {
                expect(test.vendingMachine.coinAnalysis(1, 1, 1)).toBe("reject")
            })
        })
        describe("When value of coins has been returned", () => {
            it("Should throw an error if the arguments are not numbers", () => {
                expect(() => test.vendingMachine.countMoney('4', '5', '6')).toThrow()
            })
            it("Should display the total of money put into the machine", () => {
                expect(test.vendingMachine.countMoney(0.25, 1, 2, 1, 0.25, 0.05, 0.1, 0.1, 0.25)).toBe(5)
            })
            it("Should add to total of coins in the machine", () => {
                expect( test.vendingMachine.state).toEqual(({
                    "Coffee Crisp": { price: 1.5, stock: 4, desiredStock: 10, callCode: 'C5' },
                    toonies: { desired: 300, current: 110, value: 2 },
                    loonies: { desired: 300, current: 205, value: 1 },
                    quarters: { desired: 500, current: 13, value: 0.25 },
                    dimes: { desired: 200, current: 92, value: 0.1 },
                    nickels: { desired: 200, current: 111, value: 0.05 }
                }))
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
        it("Should restock the items in the machine", () => {
            expect(test.vendingMachine.state["Coffee Crisp"]["stock"]).toEqual(10)
        })
    })
    describe("When a restock change quote is requested", () => {
        it("Should return the needed coin count to restock the vending machine's change", () => {
            expect(test.vendingMachine.restockChange()).toEqual({
                                                                    nickels: 89,
                                                                    dimes: 108,
                                                                    quarters: 487,
                                                                    loonies: 95,
                                                                    toonies: 190
                                                                })
        })
        it("Should restock the change in the machine to preset levels", () => {
            expect(test.vendingMachine.state).toEqual({
                "Coffee Crisp": { price: 1.5, stock: 10, desiredStock: 10, callCode: 'C5' },
                toonies: { desired: 300, current: 300, value: 2 },
                loonies: { desired: 300, current: 300, value: 1 },
                quarters: { desired: 500, current: 500, value: 0.25 },
                dimes: { desired: 200, current: 200, value: 0.1 },
                nickels: { desired: 200, current: 200, value: 0.05 }
            })
        })
    })
    describe("When a call code is entered", () => {
        describe("When money is sufficient and code is valid", () => {
            it("Should return the selected snack", () => {
                expect(test.vendingMachine.giveTreat(1.50, "C5")).toEqual("Coffee Crisp")
            })
            it("Should modify the internal state of selected snack by -1", () => {
                expect(test.vendingMachine.state).toEqual({
                    "Coffee Crisp": { price: 1.5, stock: 9, desiredStock: 10, callCode: 'C5' },
                    toonies: { desired: 300, current: 300, value: 2 },
                    loonies: { desired: 300, current: 300, value: 1 },
                    quarters: { desired: 500, current: 500, value: 0.25 },
                    dimes: { desired: 200, current: 200, value: 0.1 },
                    nickels: { desired: 200, current: 200, value: 0.05 }
                })
            })
        })
        describe("When money is insufficient and code is valid", () => {
            it("Should throw an error", () => {
                expect(() => test.vendingMachine.giveTreat(1.00, "C5")).toThrow()
            })
        })
        describe("When money is sufficient and code is invalid", () => {
            it("Should throw an error", () => {
                expect(() => test.vendingMachine.giveTreat(1.50, "C6")).toThrow()
            })
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
                                                                            dimes: 2,
                                                                            nickels: 0
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
            it("Should take change out of the machine to return desired value", () => {
                expect(test.vendingMachine.state).toEqual({
                    "Coffee Crisp": { price: 1.5, stock: 9, desiredStock: 10, callCode: 'C5' },
                    toonies: { desired: 300, current: 299, value: 2 },
                    loonies: { desired: 300, current: 299, value: 1 },
                    quarters: { desired: 500, current: 495, value: 0.25 },
                    dimes: { desired: 200, current: 198, value: 0.1 },
                    nickels: { desired: 200, current: 200, value: 0.05 }
                })
            })
        })
        describe("When snack name is invalid", () => {
            it("Should throw an error", () => {
                expect(() => test.vendingMachine.giveTreat(2.00, "C4")).toThrow()
            })
        })
        describe("When price is greater than money input", () => {
            it("Should throw an error", () => {
                expect(() => test.vendingMachine.giveTreat(1.00, "C5")).toThrow()
            })
        })
        describe("When money given is exactly the amount of treat's price", () => {
            it("Should not return change", () => {
                expect(test.vendingMachine.changeToReturn(1.50, "C5")).toBe(0)
            })
        })
    })
})