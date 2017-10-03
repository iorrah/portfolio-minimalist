## iorrah/iorrah.github.io

This project consists of a simple webpage.

### Installing

See below step by step series of examples that tell what you have to do to get the development envirornment running.

To install the NPM depencies:

```
npm install
```

And then to install the Bower depencies:

```
bower install
```

In order to automate the final dependencies structuration and boot the app, a `gulpfile.js` containing the most important tasks that this app require has been added so running the following is required:

```
gulp boot
```

### Start the app

This can also be done through a Gulp task:

```
gulp watch
```

### Deployment

In order to deploy the app into the `gh-pages` branch and push it to our remote git repository (hit enter after `git remote -v` for further references):

```
gulp deploy
```

### Built with

- Material Design Bootstrap: [GitHub](https://github.com/mdbootstrap/bootstrap-material-design) and [Official Website](https://mdbootstrap.com/material-design-for-bootstrap/)
- Bootstrap: [GitHub](https://github.com/twbs/bootstrap) and [Official Website](http://getbootstrap.com/)
- Font Awesome: [GitHub](https://github.com/FortAwesome/Font-Awesome) and [Official Website](http://fontawesome.io/)
- Clipboard.js: [GitHub](https://github.com/zenorocha/clipboard.js) and [Official Website](https://clipboardjs.com/)
