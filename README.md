# ScalaJS Starter

A template to create a front-end application using [ScalaJS] and [React].

## How to run

First, build the code by running:
```bash
sbt build  # or sbt build_prod
```

This will produce some files in folder **/bin**. These files are used by **index.html** at the root folder. This is the entry point of the application. So you just need to open this file in a browser to view the website.

You can also use a local server like [npm serve] to ease this process.

Note:
- Command `build` above is defined in **.sbtrc**


[ScalaJS]: https://www.scala-js.org/
[React]: https://reactjs.org/
[npm serve]: https://www.npmjs.com/package/serve
