# ScalaJS Starter

A template to create a front-end application using [ScalaJS] and [React].

## How to run

First, build the code by running:
```bash
sbt build  # or sbt build_prod
```

This will produce some files in folder **/bin**. These files are used by **index.html** at the root folder. This is the entry point of the application. So you just need to open this file in a browser to view the website.

For development, it is better to use watch mode like this:
```bash
sbt # open Sbt Shell

> ~build # build on file change
```

You can also use a local server like [npm serve] to serve the app (because this project is pure front-end)

## Project structure

| | |
|------------|---------------------------------------------------------------------------------|
| .sbtrc     | Contains aliases of Sbt commands like `build`                                   |
| index.html | Container of our app. Since this is a single page app, we only need 1 html file |
| bin/       | Contains generated JS scripts                                                   |
| src/       | Source code                                                                     |

Since we use React, elements on the web page are defined as separate components. Also, [ScalaCSS] is used to allow defining CSS in code, along with the components. This is good because we have more type safety and don't have to maintain class names.

[ScalaJS]: https://www.scala-js.org/
[React]: https://reactjs.org/
[npm serve]: https://www.npmjs.com/package/serve
[ScalaCSS]: https://github.com/japgolly/scalacss
