const inventory = require("./inventory")

class VendingMachine {
    constructor(data){
        this.data = inventory(data)
    }

    coinAnalysis(diameterMM, weightG, thicknessMM) {
        if((diameterMM > 20.89 && diameterMM < 21.27)&&(weightG > 3.94 && weightG < 4.55)&&(thicknessMM > 1.69 && thicknessMM < 1.77)) return 0.05
        else if ((diameterMM > 18.029 && diameterMM < 18.035)&&(weightG > 1.74 && weightG < 2.34)&&(thicknessMM > 1.16 && thicknessMM < 1.23)) return 0.10
        else if((diameterMM > 23.61 && diameterMM < 23.89)&&(weightG > 4.39 && weightG < 5.84)&&(thicknessMM > 1.57 && thicknessMM < 1.61)) return 0.25
        else if((diameterMM > 26.49 && diameterMM < 26.73)&&(weightG > 6.26 && weightG < 7.01)&&(thicknessMM > 1.74 && thicknessMM < 1.96)) return 1.00
        else if((diameterMM > 27.9 && diameterMM < 28.1)&&(weightG > 6.92 && weightG < 7.31)&&(thicknessMM > 1.74 && thicknessMM < 1.81)) return 2.00
        else return "reject"
    }

    countMoney(...count) {
        let total = 0
        for(let item of count){
            if(typeof item !== 'number') throw new Error("money is typically counted in numbers")
            else total += item
        }
        return total
    }
    
    printInventory(){
        let inventoryCount = {}
        Object.keys(this.data.items).forEach(item => {
            inventoryCount[item] = this.data.items[item].stock
        })
        return inventoryCount
    }
    
    refillInventory(){
        let restockItems = {}
        Object.keys(this.data.items).forEach(item => {
            restockItems[item] = this.data.items[item].desiredStock - this.data.items[item].stock 
        })
        return restockItems
    }

    restockChange() {
        let restockChange = {}
        Object.keys(this.data.coins).forEach(coin => {
            restockChange[coin] = this.data.coins[coin].desired - this.data.coins[coin].current
        })
        return restockChange
    }

    giveTreat(money, code) {
        const snack = Object.keys(this.data.items).filter(item => {
            return this.data.items[item].callCode == code
        })
        if(typeof snack[0] !== "string") throw new Error("No such snack exists.")
        if(money < this.data.items[snack[0]].price) throw new Error("No money, no snack!")
        else return snack[0]
    }

    changeToReturn() {

    }
}

module.exports = VendingMachine