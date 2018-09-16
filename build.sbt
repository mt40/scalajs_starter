enablePlugins(ScalaJSPlugin)
enablePlugins(ScalaJSBundlerPlugin)

name := "Scala.js Tutorial"
scalaVersion := "2.12.6" // or any other Scala version >= 2.10.2

// This is an application with a main method
scalaJSUseMainModuleInitializer := true

libraryDependencies ++= Seq(
  "org.scala-js" %%% "scalajs-dom" % "0.9.6",
  "com.github.japgolly.scalajs-react" %%% "core" % "1.2.3",
  "com.github.japgolly.scalajs-react" %%% "extra" % "1.2.3"
)

Compile / npmDependencies ++= Seq(
  "react"     -> "16.2.0",
  "react-dom" -> "16.2.0"
)
