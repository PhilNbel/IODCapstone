let connection = require("../db_run");

class Category {

    constructor({name}) {
        this.name = name;
    }

    toInsert(){
        return `("${this.name}")`;
    }
    static getSet(req_body){
        if(!req_body.name) throw new Error("Invalid format");
        return `name = "${req_body.name}"`
    }

    static create(newCategory) {
        let mergedCategory = new Category(newCategory)
        return connection.promise().query("INSERT INTO categories(name) VALUES"+mergedCategory.toInsert());
    };

    static update(updatedCategory) {
        let set = Category.getSet(updatedCategory)
        return connection.promise().query("UPDATE categories SET "+set+" WHERE categoryID = "+updatedCategory.id)
            .catch((err)=>{
                throw new Error("No category corresponding to this ID")
            });
    };  
    
    static destroy(deletedCategoryId) {
        return connection.promise().query("DELETE FROM categories WHERE categoryID = "+deletedCategoryId);
    };     

    static findOne(toFindId) {
        return connection.promise().query("SELECT * FROM categories WHERE categoryID = "+toFindId);
    };

    static async findElements(toFindId){
        let itemList = await connection.promise().query("SELECT items.name FROM belongs INNER JOIN items ON items.itemID=belongs.itemID INNER JOIN categories ON categories.categoryID = belongs.categoryID WHERE belongs.categoryID = "+toFindId);
        return (itemList[0].length!=0)?itemList[0]:[]
    }

    static async findAll() {
        return connection.promise().query("SELECT categoryID FROM categories")
            .then(allIdArray=>
                Promise.all(allIdArray[0].map(async(currLine)=>{
                    let category = await Category.findOne(currLine.categoryID)
                    return category[0][0];
                }))
            .then(allCategories=>{
                return Promise.all(allCategories.map(async(category)=>{
                    let content = await Category.findElements(category.categoryID);
                    if(content.length == 0)
                        return category;
                    return ({...category,contains:content});
                }))
            }));
    };     

    static sync(){}
}

module.exports = Category