// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  kiimate_url: 'http://localhost:9090/api/v1',
  OAUTH2_CALLBACK_URL: 'http://localhost:4200/oauth2/callback',
  OAUTH2_RESOURCE_USER_URL: 'http://git.euler.one/api/v4',
  OAUTH2_AUTHORIZE_URL: 'http://git.euler.one/oauth/authorize',
  OAUTH2_CLIENT_ID: '371c710e3a91264847c6258b8047be6f1d831763086acf75f8a18bd39016db75',
};
