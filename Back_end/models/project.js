let connection = require("../db_run");

class Project {

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

    static create(newProject) {
        let mergedProject = new Project(newProject)
        return connection.promise().query("INSERT INTO categories(name) VALUES"+mergedProject.toInsert());
    };

    static update(updatedProject) {
        let set = Project.getSet(updatedProject)
        return connection.promise().query("UPDATE categories SET "+set+" WHERE projectID = "+updatedProject.id)
            .catch((err)=>{
                throw new Error("No Project corresponding to this ID")
            });
    };  
    
    static destroy(deletedProjectId) {
        return connection.promise().query("DELETE FROM categories WHERE projectID = "+deletedProjectId);
    };     

    static findOne(toFindId) {
        return connection.promise().query("SELECT * FROM categories WHERE projectID = "+toFindId);
    };

    static async findElements(toFindId){
        let itemList = await connection.promise().query("SELECT items.name FROM belongs INNER JOIN items ON items.itemID=belongs.itemID INNER JOIN categories ON categories.projectID = belongs.projectID WHERE belongs.projectID = "+toFindId);
        return (itemList[0].length!=0)?itemList[0]:[]
    }

    static async findAll() {
        return connection.promise().query("SELECT projectID FROM categories")
            .then(allIdArray=>
                Promise.all(allIdArray[0].map(async(currLine)=>{
                    let Project = await Project.findOne(currLine.projectID)
                    return Project[0][0];
                }))
            .then(allCategories=>{
                return Promise.all(allCategories.map(async(Project)=>{
                    let content = await Project.findElements(Project.projectID);
                    if(content.length == 0)
                        return Project;
                    return ({...Project,contains:content});
                }))
            }));
    };     

    static sync(){}
}

module.exports = Project