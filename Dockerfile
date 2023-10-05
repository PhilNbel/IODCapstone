FROM node:19-alpine

# copy backend files without the backend parent folder, then copy frontend folder
COPY Back_end /app
COPY Front_end /app/Front_end

# run all subsequent commands relative to the app folder
WORKDIR /app

# install backend dependencies --no-audit is faster to avoid timeouts
RUN npm install --no-audit

# assumes frontend is ALREADY BUILT into dist folder - run 'npm install && npm run build' from frontend PRIOR to building docker image

# set the production environment
ENV NODE_ENV prod

# expose the port from .env.production and start the backend 
EXPOSE 3000
CMD ["npm","run","dist"]