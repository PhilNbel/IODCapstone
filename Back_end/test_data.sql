INSERT INTO Users(firstName,lastName,nickName, password) VALUES
    ('Philippe','Hennebelle', 'Eovius', '$2a$10$qNhJZYMGtyrfEY2fjvhS.umPPBv/ErdVt93o5QkkRs5n7VDobv/8O'), -- 1234
    ('Jo', 'Batkin', 'The great teacher in IOD', '$2a$10$qNhJZYMGtyrfEY2fjvhS.uAa2ZzK0oOfZwPuzABHIEUdPJSKe2Mb2'), -- hig#leve!pa5sw0rd
    ('Jordan', 'Klianis','Custodes Tech-priest', '$2a$10$wypS/rep72Lla7tqIL4UzOMLDLCaXWIpIWVXbJeo48ercsotIg9b.'), -- wa4a4a4ag#4mm3r
    ('Thomas', 'Knight','Fidji','$2a$10$4mG42I38aooTSxSPi4AGf.3fh8I9TuZx4AoDz0p6m0Wmwup4DHYvu'), -- mod3pas
    ('Justine', 'Villegas', "Adam's badminton partner",'$2a$10$P6sza6z1qbclwC.6Nm41dujNM6qpIG/r8YiI4hGa1ka4E5N9ATSZK'), -- badm!nt0n
    ('Adam', 'DeGas', "Justine's badminton partner",'$2a$10$P6sza6z1qbclwC.6Nm41dujNM6qpIG/r8YiI4hGa1ka4E5N9ATSZK'), -- badm!nt0n
    ('Chris', 'Marsh', 'The greatest Australian assistant in IOD','$2a$10$5tnpO6tiAt7vuBv00l0xduOe1IuqQQgKcc2o77YhnA4AP2EaozfbG'), -- !0D
    ('Gareth', 'Wootton', 'The greatest Kiwi assistant in IOD','$2a$10$5tnpO6tiAt7vuBv00l0xduOe1IuqQQgKcc2o77YhnA4AP2EaozfbG'), -- !0D
    ('Dahlia', 'Aly', 'Software and buildings architect','$2a$10$QkjDQElifbchvOxj0hEo0Opu70PzzfBSnP5ZBYAmH5/RD4hEK3RmOs'); -- 3¶yp7

INSERT INTO Fields(name, description) VALUES
    ('Software engineering','The art of solving real life problems with computer programs'),
    ('Computer science','The art of mentally constructing programs and anticipating their behavior'),
    ('Mathematics','The set of techniques to edit and manipulate abstract values'),
    ('Badminton',"The sport with the weird thing that flies I don't know the name of (Shuttle!?)"),
    ('Electronics','The regroupment of skills which concerns interfaces between the analoguous and digital worlds'),
    ('Woodworking',''),
    ('Metalsmithing',''),
    ('Material processing',''),
    ('Pyrotechnics',''),
    ('Civil engineering',''),
    ('Bartending',''),
    ('Hosting',''),
    ('Team management',''),
    ('Business management',''),
    ('Game Design',''),
    ('Story writing',''),
    ('Digital art',''),
    ('Animation','');

INSERT INTO Skills(name, description,fieldID) VALUES
    ('Program writing','The ability to write a functioning program',1),
    ('Problem understanding','The understanding of what is wrong and what the context is',1),
    ('Data flow schematisation','Drawing and thinking through where and how information is contained and is shared',1),
    ('Data structure understanding','',2),
    ('Complexity evaluation','',2),
    ('Conceptualization','',2),
    ('Program optimization','',2),
    ('Geometry','',3),
    ('Arithmetics','',3),
    ('Algebra','',3),
    ('Algorithmics','',3),
    ('Badminton grip','',4),
    ('Badminton stance','',4),
    ('Badminton strike','test',4),
    ('Wood behavior understanding','',6),
    ('Hand plane handling','',6),
    ('Lumber preparation','',6),
    ('Mortise cutting','',6),
    ('Tenon joint cutting','',6),
    ('Dovetail joint cutting','',6),
    ('Roller mill embossing','',6),
    ('Forming','',6),
    ('Bezels','',6);

INSERT INTO Masters (userID,skillID) VALUES
    (1,3),
    (1,1),
    (1,2),
    (1,5),
    (1,9),
    (1,10),
    (1,4),
    (2,1),
    (2,2),
    (2,3),
    (2,4),
    (2,8),
    (2,11),
    (3,3),
    (3,4),
    (3,1),
    (3,2),
    (3,7),
    (4,4),
    (4,1),
    (4,2),
    (5,3),
    (5,4),
    (6,1),
    (6,2),
    (6,3),
    (6,4);

INSERT INTO Interests (userID,fieldID) VALUES
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (2,4),
    (2,2),
    (2,3),
    (3,2),
    (3,3);

INSERT INTO Projects (type, name, description, isPrivate, altdescription, budget, budgetIsShared, isOpen,creatorID) VALUES
    ('Hobby', 'Homemade soap', 'Using ashes to make lye and said lie to make a homemade soap', FALSE, NULL, NULL, NULL, TRUE , 1),
    ('Serious', 'Waaaaaghammer', 'A Warhammer game aid to simplify and reduce the required time to play', FALSE, NULL, 500, FALSE, TRUE , 3),
    ('Professional', 'Freelance career', 'Using prior and new knowledge to create new programs', TRUE, 'The furthering of my personal career', NULL, NULL, TRUE , 9),
    ('Serious', 'Badminton tournament', 'Bringing in players to have a tournament', FALSE, NULL, 12500, TRUE, TRUE , 5);

INSERT INTO Steps (name, description, status, hasResources, projectID) VALUES
    ('Preparing the materials', 'Preparing the different resources to ', 'toDo', FALSE, 1),
    ('Cooking the lye', '', 'toDo', TRUE, 1),
    ('Cooking the soap', 'Creating the', 'toDo', TRUE, 1),
    ('Learning how to develop', 'Taking classes or learning by myself', 'isDone', FALSE, 2),
    ('Develop the program', 'Actually create the website', 'inProgress', FALSE, 2),
    ('Learning architecture', '', 'isDone', FALSE, 3),
    ('Learning development', '', 'inProgress', FALSE, 3),
    ('Creating a few programs', '', 'toDo', FALSE, 3),
    ('Advertising the programs', '', 'toDo', FALSE, 3),
    ('Looking for players', '', 'toDo', FALSE, 4);

INSERT INTO Tasks (name, description, status, stepID, userID, skillID) VALUES
    ('Materials for the lye', 'Getting dry grass, stones and charcoal', 'toDo', 1, NULL, NULL),
    ('Materials for the soap', 'Getting lye, a wooden structure for drying and ', 'toDo', 1, 1, NULL),
    ('Calulating the doses', 'Calculate the doses required ', 'toDo', 2, 1, 9),
    ('Getting enrolled in the IOD course', '', 'isDone', 4, NULL, NULL),
    ('Finishing the learning part of the course', '', 'isDone', 4, NULL, NULL),
    ('Finishing the capstone', '', 'inProgress', 5, NULL, 1),
    ('Doing the course', '', 'inProgress', 7, NULL, NULL),
    ('Learning more languages', '', 'toDo', 7, NULL, NULL),
    ('Creating a permit submission review website', '', 'toDo', 8, NULL, 6);