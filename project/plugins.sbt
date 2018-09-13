addSbtPlugin("org.scala-js" % "sbt-scalajs" % "0.6.25")

// bundles the .js file emitted by the Scala.js compiler with its
// npm dependencies into a single .js file executable by Web browsers.
addSbtPlugin("ch.epfl.scala" % "sbt-scalajs-bundler" % "0.13.1")
