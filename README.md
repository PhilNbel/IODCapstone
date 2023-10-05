# IOD Capstone : Eovia
Complete code for a website named **Eovia**. It's purpose is improve one's life through an opportunity to connect with others who share similar passions to improve social life in an individualistic society, improve self-esteem through the realization of projects with proofs and records of those feats and improve one's career through the ability to learn from others and show one's skills.

# DOCKER
*The docker will most likely be the easiest solution. Pull the docker image `eovius/eovia`*

Once pulled, you will simply need to run the image with `docker run -d -p [PORT]:3000 eovius/eovia` ([PORT] needs to be replaced with the port you want the website to be running on)
*(currently unavailable, working on repairing it)*

# Github
*The Github repository is hosted at `https://github.com/PhilNbel/IODCapstone`*

Choose a folder to host the website and run `git clone "https://github.com/PhilNbel/IODCapstone"`. Once there, go into the newly created IODCapstone, then into **Front_end** and run `npm install`. Move to Back_end and repeat the operation.
Once the modules are installed, run `npm run start-dist` from the root folder and *voila*!

# Development
*If you want to fork, re-use or simply test the code and be able to have your own database, you will need a MySQL database and to change the information in `.env.dev`*

Follow the Github step, then go to your **Back_end** folder and run:

1. `npm run init-dev` to update the database with the structure in `db_creation.sql` and the initial information in `test_data.sql`
2. `npm run start-dev` to run on a local machine with the 'DEV' environment
3. `npm run init` to update your production database, with it's information in `.env.prod`. Although nothing is copyrighted, I would like if you didn't try to make any concurrence to my website. This is here to help you start your own project
4. `npm run start-dist` to run build your front end in a 'dist' folder and run your website. This is useful if you plan to run your website on a distant Dockerimage. If you want to first build the image in your development environment, use `npm run build-dev`