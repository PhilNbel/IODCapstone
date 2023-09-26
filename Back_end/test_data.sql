-- INSERT INTO users(firstName,lastName,nickName, password) VALUES
--     ('Philippe','Hennebelle', 'Eovius', '$2a$10$4iF2CbFZ41047vsw1zMPW.bJ72ajAXJ8drvziqgHwtk/3azCJzc6e'), -- 1234
--     ('Jo', 'Batkin', 'The great teacher in IOD', '$2a$10$hoM8XevovTn/ktXNEKy8veLgWmH63l0IJoaxuTj/3fdFLclSOZknu'), -- hig#leve!pa5sw0rd
--     ('Jordan', 'Klianis','Custodes Tech-priest', '$2a$10$wypS/rep72Lla7tqIL4UzOMLDLCaXWIpIWVXbJeo48ercsotIg9b.'), -- wa4a4a4ag#4mm3r
--     ('Thomas', 'Knight','Fidji','$2a$10$4mG42I38aooTSxSPi4AGf.3fh8I9TuZx4AoDz0p6m0Wmwup4DHYvu'), -- mod3pas
--     ('Justine', 'Villegas', "Adam's badminton partner",'$2a$10$P6sza6z1qbclwC.6Nm41dujNM6qpIG/r8YiI4hGa1ka4E5N9ATSZK'), -- badm!nt0n
--     ('Adam', 'DeGas', "Justine's badminton partner",'$2a$10$P6sza6z1qbclwC.6Nm41dujNM6qpIG/r8YiI4hGa1ka4E5N9ATSZK'), -- badm!nt0n
--     ('Chris', 'Marsh', 'The greatest Australian assistant in IOD','!0D'), -- !0D
--     ('Gareth', 'Wootton', 'The greatest Kiwi assistant in IOD','!0D'); -- !0D

INSERT INTO Fields(name, description) VALUES
    ('Software engineering','The art of solving real life problems with computer programs'),
    ('Computer science','The art of mentally constructing programs and anticipating their behavior'),
    ('Mathematics','The set of techniques to edit and manipulate abstract values'),
    ('Badminton',"The sport with the weird thing that flies I don't know the name of (Shuttle!?)"),
    ('Electronics','The regroupment of skills which concerns interfaces between the analoguous and digital worlds'),
    ('Woodworking',''),
    ('Metalsmithing',''),
    ('Meterial processing',''),
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

-- INSERT INTO Masters (userID,skillID) VALUES
--     (1,3),
--     (1,1),
--     (1,2),
--     (1,5),
--     (1,9),
--     (1,10),
--     (1,4),
--     (2,1),
--     (2,2),
--     (2,3),
--     (2,4),
--     (2,8),
--     (2,11),
--     (3,3),
--     (3,4),
--     (3,1),
--     (3,2),
--     (3,7),
--     (4,4),
--     (4,1),
--     (4,2),
--     (5,3),
--     (5,4),
--     (6,1),
--     (6,2),
--     (6,3),
--     (6,4);

-- INSERT INTO Interests (userID,fieldID) VALUES
--     (1,1),
--     (1,2),
--     (1,3),
--     (1,4),
--     (2,4),
--     (2,2),
--     (2,3),
--     (3,2),
--     (3,3);