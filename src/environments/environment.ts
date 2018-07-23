// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // firebase: {
  //   apiKey: 'AIzaSyAgp4R3GGt12T-VlQzx64etPGs7W1AzhSU',
  //   authDomain: 'my-recipe-notebook.firebaseapp.com',
  //   databaseURL: 'https://my-recipe-notebook.firebaseio.com',
  //   projectId: 'my-recipe-notebook',
  //   storageBucket: 'my-recipe-notebook.appspot.com',
  //   messagingSenderId: '546576697908'
  // }
  firebase: {
    apiKey: 'AIzaSyAuvw8T5NRuz1CLSgGa2FoiOie70QO5dss',
    authDomain: 'granny-notebook.firebaseapp.com',
    databaseURL: 'https://granny-notebook.firebaseio.com',
    projectId: 'granny-notebook',
    storageBucket: 'granny-notebook.appspot.com',
    messagingSenderId: '190380557631'
  }
};
