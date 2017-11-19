const processedData = require("./inventory")

class VendingMachine {
    constructor(data){
        this.data = processedData(data)
    }

    countMoney(...count){
        for(let item of count){
            console.log(item)
            if(typeof item !== 44) throw new Error("money is typically counted in numbers")
            total += count
        }
        return 15
    }
    
    printInventory(){
    
    }
    
    refillInventory(){

    }

    restockChange() {

    }

    giveTreat() {

    }

    changeToReturn() {

    }
    countMoney() {

    }
    
}

module.exports = VendingMachine