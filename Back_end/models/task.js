let connection = require("../db_run");

class Task {

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

    static create(newTask) {
        let mergedTask = new Task(newTask)
        return connection.promise().query("INSERT INTO tasks(name) VALUES"+mergedTask.toInsert());
    };

    static update(updatedTask) {
        let set = Task.getSet(updatedTask)
        return connection.promise().query("UPDATE tasks SET "+set+" WHERE taskID = "+updatedTask.id)
            .catch((err)=>{
                throw new Error("No Task corresponding to this ID")
            });
    };  
    
    static destroy(deletedtaskId) {
        return connection.promise().query("DELETE FROM tasks WHERE taskID = "+deletedtaskId);
    };     

    static findOne(toFindId) {
        return connection.promise().query("SELECT * FROM tasks WHERE taskID = "+toFindId);
    };

    static async findElements(toFindId){
        let itemList = await connection.promise().query("SELECT items.name FROM belongs INNER JOIN items ON items.itemID=belongs.itemID INNER JOIN tasks ON tasks.taskID = belongs.taskID WHERE belongs.taskID = "+toFindId);
        return (itemList[0].length!=0)?itemList[0]:[]
    }

    static async findAll() {
        return connection.promise().query("SELECT taskID FROM tasks")
            .then(allIdArray=>
                Promise.all(allIdArray[0].map(async(currLine)=>{
                    let Task = await Task.findOne(currLine.taskID)
                    return Task[0][0];
                }))
            .then(allTasks=>{
                return Promise.all(allTasks.map(async(Task)=>{
                    let content = await Task.findElements(Task.taskID);
                    if(content.length == 0)
                        return Task;
                    return ({...Task,contains:content});
                }))
            }));
    };     

    static sync(){}
}

module.exports = Task