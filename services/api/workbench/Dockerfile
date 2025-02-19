FROM --platform=${BUILDPLATFORM} node:18.17.1-alpine AS base
ENV NEW_RELIC_NO_CONFIG_FILE=true
WORKDIR /usr/src/app

FROM base AS development
ENV NODE_ENV development
RUN apk --update add postgresql-client curl
RUN npm i -g @nestjs/cli
CMD npm install && npm run start:debug

FROM base AS build
ENV NODE_ENV build
COPY . .
RUN npm install
RUN npm run build

FROM base AS production
ENV NODE_ENV production
ENV NO_COLOR true

COPY --chown=node:node --from=build /usr/src/app/package.json package.json
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist dist
RUN touch /usr/src/app/newrelic_agent.log
RUN chown node:node /usr/src/app/newrelic_agent.log
USER node
HEALTHCHECK --interval=10s --retries=5 CMD curl -f http://localhost:3000/workbench/healthcheck
CMD ["node", "dist/src/main.js"]
