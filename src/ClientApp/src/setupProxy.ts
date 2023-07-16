import * as express from "express"
import { createProxyMiddleware, Filter } from 'http-proxy-middleware';
import { env } from 'process';
import { API_ROUTES } from "./constants/api-routes";

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:21155';

const proxyFilter: Filter =  [
  API_ROUTES.APPOINTMENTS_GET,
  API_ROUTES.APPOINTMENT_CONFIRM,
  API_ROUTES.APPOINTMENT_RESCHEDULE,
];

module.exports = function(app: express.Application) {
  const appProxy = createProxyMiddleware(proxyFilter, {
    proxyTimeout: 10000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
