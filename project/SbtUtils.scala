import java.io.File

import sbt.io.syntax.fileToRichFile
import sbt.io.{CopyOptions, IO}

object SbtUtils {

  def copyGenerated(baseDirectory: File) = {
    val outDir = baseDirectory / "bin/js"
    val inDir = baseDirectory / "target/scala-2.12/scalajs-bundler/main"
    val files = {
      Seq(
        "scala-js-starter-fastopt-bundle.js",
        "scala-js-starter-fastopt-bundle.js.map"
      ).map(f => (inDir / f, outDir / f))
    }

    IO.copy(
      files,
      CopyOptions(overwrite = true, preserveLastModified = true, preserveExecutable = false)
    )
  }
}
