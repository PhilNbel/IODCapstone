DROP TABLE IF EXISTS TouchesOn;
DROP TABLE IF EXISTS Interests;
DROP TABLE IF EXISTS isMember;
DROP TABLE IF EXISTS Masters;
DROP TABLE IF EXISTS Resources;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Steps;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Skills;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Fields;

CREATE TABLE Users (
    userID int unsigned NOT NULL AUTO_INCREMENT,
    firstName varchar(128),
    lastName varchar(512),
    nickName varchar(128) NOT NULL,
    password varchar(128) NOT NULL,
    email varchar(128),
    PRIMARY KEY(userID),
    UNIQUE KEY(nickName)
);

CREATE TABLE Fields (
    fieldID int unsigned NOT NULL AUTO_INCREMENT,
    name varchar(128) NOT NULL,
    description varchar(2048) NOT NULL,
    PRIMARY KEY(fieldID),
    UNIQUE KEY(name)
);

CREATE TABLE Skills (
    skillID int unsigned NOT NULL AUTO_INCREMENT,
    name varchar(128) NOT NULL,
    description varchar(2048) NOT NULL,
    fieldID int unsigned,
    CONSTRAINT fk0 FOREIGN KEY (fieldID) REFERENCES Fields(fieldID),
    PRIMARY KEY(skillID),
    CONSTRAINT skillsUQ UNIQUE (name,fieldID)
);

CREATE TABLE Projects (
    projectID int unsigned NOT NULL AUTO_INCREMENT,
    type ENUM('Hobby','Serious','Professional') NOT NULL,
    name varchar(128) NOT NULL,
    description varchar(4096) NOT NULL,
    isPrivate boolean,
    altdescription varchar(4096) DEFAULT NULL,
    budget int unsigned DEFAULT NULL,
    budgetIsShared boolean,
    isOpen boolean,
    PRIMARY KEY(projectID)
);

CREATE TABLE Steps (
    stepID int unsigned NOT NULL AUTO_INCREMENT,
    name varchar(128) NOT NULL,
    description varchar(4096),
    status ENUM('toDo','inProgress','isDone') NOT NULL,
    hasResources boolean,
    projectID int unsigned,
    parentID int unsigned DEFAULT NULL,
    CONSTRAINT fk1 FOREIGN KEY (projectID) REFERENCES Projects(projectID),
    CONSTRAINT fk2 FOREIGN KEY (parentID) REFERENCES Steps(stepID),
    PRIMARY KEY(stepID)
);

CREATE TABLE Tasks (
    taskID int unsigned NOT NULL AUTO_INCREMENT,
    name varchar(128) NOT NULL,
    description varchar(4096) NOT NULL,
    status ENUM('toDo','inProgress','isDone') NOT NULL,
    stepID int unsigned,
    userID int unsigned,
    skillID int unsigned,
    CONSTRAINT fk3 FOREIGN KEY (stepID) REFERENCES Steps(stepID),
    CONSTRAINT fk4 FOREIGN KEY (userID) REFERENCES Users(userID),
    CONSTRAINT fk5 FOREIGN KEY (skillID) REFERENCES Skills(skillID),
    PRIMARY KEY(taskID)
);

CREATE TABLE Resources (
    text varchar(256) NOT NULL,
    amount int unsigned,
    initialAmount int unsigned,
    stepID int unsigned,
    CONSTRAINT fk6 FOREIGN KEY (stepID) REFERENCES Steps(stepID)
);

CREATE TABLE IsMember (
    role ENUM('creator','admin','member') NOT NULL,
    projectID int unsigned,
    userID int unsigned,
    CONSTRAINT fk7 FOREIGN KEY (projectID) REFERENCES Projects(projectID),
    CONSTRAINT fk8 FOREIGN KEY (userID) REFERENCES Users(userID),
    CONSTRAINT ismemberPK PRIMARY KEY CLUSTERED (projectID, userID)   
);

CREATE TABLE Interests (
    userID int unsigned,
    fieldID int unsigned,
    CONSTRAINT fk9 FOREIGN KEY (userID) REFERENCES Users(userID),
    CONSTRAINT fkA FOREIGN KEY (fieldID) REFERENCES Fields(fieldID),
    CONSTRAINT interestsPK PRIMARY KEY CLUSTERED (userID, fieldID)
);

CREATE TABLE Masters (
    userID int unsigned,
    skillID int unsigned,
    CONSTRAINT fkB FOREIGN KEY (userID) REFERENCES Users(userID),
    CONSTRAINT fkC FOREIGN KEY (skillID) REFERENCES Skills(skillID),
    CONSTRAINT mastersPK PRIMARY KEY CLUSTERED (userID, skillID)
);

CREATE TABLE TouchesOn (
    projectID int unsigned,
    fieldID int unsigned    ,
    CONSTRAINT fkD FOREIGN KEY (projectID) REFERENCES Projects(projectID),
    CONSTRAINT fkE FOREIGN KEY (fieldID) REFERENCES Fields(fieldID),
    CONSTRAINT touchesonPK PRIMARY KEY CLUSTERED (projectID, fieldID)
);