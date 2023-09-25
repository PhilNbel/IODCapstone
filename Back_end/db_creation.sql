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
DROP TABLE IF EXISTS Themes;


CREATE TABLE Themes (
    themeID int unsigned NOT NULL AUTO_INCREMENT,
    primary_color char(7) NOT NULL,
    secondary_color char(7) NOT NULL,
    ternary_color char(7) NOT NULL,
    quaternary_color char(7) NOT NULL,
    quinary_color char(7) NOT NULL,
    PRIMARY KEY(themeID)
);
CREATE TABLE Users (
    userID int unsigned NOT NULL AUTO_INCREMENT,
    firstName varchar(32) NOT NULL,
    lastName varchar(128) NOT NULL,
    userName varchar(256) NOT NULL,
    nickName varchar(256) NOT NULL,
    password char(512) NOT NULL,
    email varchar(128),
    themeID int unsigned,
    PRIMARY KEY(userID),
    CONSTRAINT themeRef FOREIGN KEY (themeID) REFERENCES Themes(themeID),
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
    fieldID int unsigned NOT NULL,
    CONSTRAINT fk FOREIGN KEY (fieldID) REFERENCES Fields(fieldID),
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
    budgetIsShared boolean DEFAULT NULL,
    isOpen boolean,
    creatorID int unsigned NOT NULL,
    CONSTRAINT fk0 FOREIGN KEY (creatorID) REFERENCES Users(userID) ON DELETE CASCADE,
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
    CONSTRAINT fk1 FOREIGN KEY (projectID) REFERENCES Projects(projectID) ON DELETE CASCADE,
    CONSTRAINT fk2 FOREIGN KEY (parentID) REFERENCES Steps(stepID) ON DELETE CASCADE,
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
    CONSTRAINT fk3 FOREIGN KEY (stepID) REFERENCES Steps(stepID) ON DELETE CASCADE,
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
    CONSTRAINT fk9 FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    CONSTRAINT fkA FOREIGN KEY (fieldID) REFERENCES Fields(fieldID) ON DELETE CASCADE,
    CONSTRAINT interestsPK PRIMARY KEY CLUSTERED (userID, fieldID)
);

CREATE TABLE Masters (
    userID int unsigned,
    skillID int unsigned,
    CONSTRAINT fkB FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    CONSTRAINT fkC FOREIGN KEY (skillID) REFERENCES Skills(skillID) ON DELETE CASCADE,
    CONSTRAINT mastersPK PRIMARY KEY CLUSTERED (userID, skillID)
);

CREATE TABLE TouchesOn (
    projectID int unsigned,
    fieldID int unsigned    ,
    CONSTRAINT fkD FOREIGN KEY (projectID) REFERENCES Projects(projectID) ON DELETE CASCADE,
    CONSTRAINT fkE FOREIGN KEY (fieldID) REFERENCES Fields(fieldID) ON DELETE CASCADE,
    CONSTRAINT touchesonPK PRIMARY KEY CLUSTERED (projectID, fieldID)
);