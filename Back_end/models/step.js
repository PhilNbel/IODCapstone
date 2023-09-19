let connection = require("../db_run");

class Step {

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

    static create(newStep) {
        let mergedStep = new Step(newStep)
        return connection.promise().query("INSERT INTO steps(name) VALUES"+mergedStep.toInsert());
    };

    static update(updatedStep) {
        let set = Step.getSet(updatedStep)
        return connection.promise().query("UPDATE steps SET "+set+" WHERE stepID = "+updatedStep.id)
            .catch((err)=>{
                throw new Error("No Step corresponding to this ID")
            });
    };  
    
    static destroy(deletedstepId) {
        return connection.promise().query("DELETE FROM steps WHERE stepID = "+deletedstepId);
    };     

    static findOne(toFindId) {
        return connection.promise().query("SELECT * FROM steps WHERE stepID = "+toFindId);
    };

    static async findElements(toFindId){
        let itemList = await connection.promise().query("SELECT items.name FROM belongs INNER JOIN items ON items.itemID=belongs.itemID INNER JOIN steps ON steps.stepID = belongs.stepID WHERE belongs.stepID = "+toFindId);
        return (itemList[0].length!=0)?itemList[0]:[]
    }

    static async findAll() {
        return connection.promise().query("SELECT stepID FROM steps")
            .then(allIdArray=>
                Promise.all(allIdArray[0].map(async(currLine)=>{
                    let Step = await Step.findOne(currLine.stepID)
                    return Step[0][0];
                }))
            .then(allSteps=>{
                return Promise.all(allSteps.map(async(Step)=>{
                    let content = await Step.findElements(Step.stepID);
                    if(content.length == 0)
                        return Step;
                    return ({...Step,contains:content});
                }))
            }));
    };     

    static sync(){}
}

module.exports = Step