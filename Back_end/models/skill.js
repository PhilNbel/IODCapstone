let connection = require("../db_run");

class Skill {

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

    static create(newSkill) {
        let mergedSkill = new Skill(newSkill)
        return connection.promise().query("INSERT INTO skills(name,price) VALUES"+mergedSkill.toInsert());
    };

    static update(updatedSkill) {
        let set = Skill.getSet(updatedSkill)
        return connection.promise().query("UPDATE skills SET "+set+" WHERE SkillID = "+updatedSkill.id)
            .catch((err)=>{
                console.log(err)
                throw new Error("No Skill corresponding to this ID")
            });
    };  
    
    static destroy(deletedSkillId) {
        return connection.promise().query("DELETE FROM skills WHERE SkillID = "+deletedSkillId);
    };     

    static findOne(toFindId) {
        return connection.promise().query("SELECT * FROM skills WHERE SkillID = "+toFindId);
    }; 

    static findAll() {
        return connection.promise().query("SELECT * FROM skills");
    };     

    static sync(){}
}

module.exports = Skill