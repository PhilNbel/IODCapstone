let connection = require("../db_run");

class Item {

    constructor({name, price, category}) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    toInsert(){
        return `("${this.name}","${this.price}")`;
    }
    static getSet(req_body){
        if(!req_body.name || !req_body.price) throw new Error("Invalid format");
        return `name = "${req_body.name}", price = "${req_body.price}"`
    }

    static create(newItem) {
        let mergedItem = new Item(newItem)
        return connection.promise().query("INSERT INTO items(name,price) VALUES"+mergedItem.toInsert());
    };

    static update(updatedItem) {
        let set = Item.getSet(updatedItem)
        return connection.promise().query("UPDATE items SET "+set+" WHERE itemID = "+updatedItem.id)
            .catch((err)=>{
                console.log(err)
                throw new Error("No item corresponding to this ID")
            });
    };  
    
    static destroy(deletedItemId) {
        return connection.promise().query("DELETE FROM items WHERE itemID = "+deletedItemId);
    };     

    static findOne(toFindId) {
        return connection.promise().query("SELECT * FROM items WHERE itemID = "+toFindId);
    }; 

    static findAll() {
        return connection.promise().query("SELECT * FROM items");
    };     

    static sync(){}
}

module.exports = Item