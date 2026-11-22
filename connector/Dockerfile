# AeroE connector – no dependencies beyond Node itself.
FROM node:22-alpine
WORKDIR /app
COPY . .
ENV PORT=8790
EXPOSE 8790
CMD ["node", "server.js"]
