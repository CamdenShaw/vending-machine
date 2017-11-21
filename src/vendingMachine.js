const inventory = require("./inventory.json")

class VendingMachine {
    constructor(data){
        this.data = inventory
        this.state = {
            ...this.data.items,
            ...this.data.coins
        }
    }

    coinAnalysis(diameterMM, weightG, thicknessMM) {
        console.log(this.state)
        if((diameterMM > 20.89 && diameterMM < 21.27)&&(weightG > 3.94 && weightG < 4.55)&&(thicknessMM > 1.69 && thicknessMM < 1.77)) return 0.05
        else if ((diameterMM > 18.029 && diameterMM < 18.035)&&(weightG > 1.74 && weightG < 2.34)&&(thicknessMM > 1.16 && thicknessMM < 1.23)) return 0.10
        else if((diameterMM > 23.61 && diameterMM < 23.89)&&(weightG > 4.39 && weightG < 5.84)&&(thicknessMM > 1.57 && thicknessMM < 1.61)) return 0.25
        else if((diameterMM > 26.49 && diameterMM < 26.73)&&(weightG > 6.26 && weightG < 7.01)&&(thicknessMM > 1.74 && thicknessMM < 1.96)) return 1.00
        else if((diameterMM > 27.9 && diameterMM < 28.1)&&(weightG > 6.92 && weightG < 7.31)&&(thicknessMM > 1.74 && thicknessMM < 1.81)) return 2.00
        else return "reject"
    }

    countMoney(...count) {
        let total = 0
        let changeStock = []
        for(let item of count){
            if(typeof item !== 'number') throw new Error("money is typically counted in numbers")
            else { 
                let coin = Object.keys(this.data.coins).filter(change => {
                    return this.state[change].value === item
                })
                this.state[coin].current += 1
                total += item
            }
        }
        return Math.round(total)
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
            this.state[item].stock += restockItems[item]
        })
        return restockItems
    }

    restockChange() {
        let restockChange = {}
        Object.keys(this.data.coins).forEach(coin => {
            restockChange[coin] = this.data.coins[coin].desired - this.data.coins[coin].current
            this.state[coin].current += restockChange[coin]
        })
        return restockChange
    }

    giveTreat(money, code) {
        const snack = Object.keys(this.data.items).filter(item => {
            return this.state[item].callCode === code
        })
        if(typeof snack[0] !== "string") throw new Error("No such snack exists.")
        if(money < this.state[snack[0]].price) throw new Error("No money, no snack!")
        else {
            this.state[snack].stock -= 1
            return snack[0]
        }
    }

    changeToReturn(money, code) {
        const snack = Object.keys(this.data.items).filter(item => {
            return this.state[item].callCode === code
        })
        let exactChange = {}
        if(money >= this.data.items[snack[0]].price) {
            let change = Math.floor((money - this.state[snack[0]].price)*100)/100
            if(change === 0) return 0
            exactChange.value = change
            Object.keys(this.data.coins).forEach(coin => {
                let coinValue = this.state[coin].value
                exactChange[coin] = Math.floor(change / coinValue)
                this.state[coin].current -= exactChange[coin]
                let subtract = exactChange[coin] * coinValue
                change =  Math.ceil((change - subtract)*100)/100
                if(change === 0) return exactChange
            })
            console.log(this.state)
            return exactChange
        }
        else throw new Error("Insufficient funds.")
    }
    bringItAllTogether(code, ...coins){
        let value = []
        for(let coin of coins){
            value.push(coinAnalysis(coin))
        }
        money = countMoney(...value)
        giveTreat(money, code)
        changeToReturn(money, code)
        printInventory()
        refillInventory()
        restockInventory()
    }
}

module.exports = VendingMachine