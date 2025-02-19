import redoc from 'redoc-express';

export function setupRedoc(app) {
  const redocOptions = {
    title: 'Upwage Workbench API',
    version: '1.0',
    specUrl: '/workbench/api-json',
  };

  const redocInstance = redoc(redocOptions);

  app.use('/workbench/docs', redocInstance);
}
