const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Budega',
  envName: 'PROD',
  production: true,
  test: false,
  api: {
    url: 'https://api.budega.website'
  },
  keycloak: {
    url: 'https://auth.budega.website/auth/',
    realm: 'budega',
    clientId: 'budega-app'
  },
  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress'],
    eslint: packageJson.devDependencies['eslint']
  }
};
