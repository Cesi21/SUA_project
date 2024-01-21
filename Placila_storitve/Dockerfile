# Uporabite uradno Node.js osnovno sliko z določeno verzijo Node.js
FROM node:21-slim

# Nastavite delovni direktorij v kontejnerju
WORKDIR /usr/src/app

# Kopirajte datoteke package.json in package-lock.json v kontejner
COPY package*.json ./

# Namestite odvisnosti
RUN npm install

# Kopirajte preostale datoteke projekta v kontejner
COPY . .

# Aplikacija se poveže na port 3001 (kot je razvidno iz terminala), zato ga izpostavite
EXPOSE 11127

# Določite ukaz, ki se izvede, ko kontejner zažene
CMD ["node", "server.js"]