FROM node:22
WORKDIR /skitick
COPY . .
# Set environment variable for the application
RUN npm install
EXPOSE 3000
CMD ["npm", "start", "dev"]