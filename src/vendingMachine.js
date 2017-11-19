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
        Object.keys(this.data).forEach((item) => {
            inventoryCount[item] = this.data[item].stock
        })
        return inventoryCount
    }
    
    refillInventory(){

    }

    restockChange() {

    }

    giveTreat() {

    }

    changeToReturn() {

    }
}

module.exports = VendingMachine