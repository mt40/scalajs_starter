import java.io.File

import sbt.io.syntax.fileToRichFile
import sbt.io.{CopyOptions, IO}

object SbtUtils {

  sealed trait RunMode

  object RunMode {
    case object Dev        extends RunMode
    case object Production extends RunMode
  }

  def copyGenerated(baseDirectory: File, mode: RunMode = RunMode.Production) = {
    val outDir = baseDirectory / "bin/js"
    val inDir = baseDirectory / "target/scala-2.12/scalajs-bundler/main"

    val toCopy = mode match {
      case RunMode.Dev        => "scala-js-starter-fastopt-bundle.js" -> "bundle.js"
      case RunMode.Production => "scala-js-starter-opt-bundle.js" -> "bundle.js"
    }

    val files = Seq(toCopy).map { case (from, to) => (inDir / from, outDir / to) }

    IO.copy(
      files,
      CopyOptions(overwrite = true, preserveLastModified = true, preserveExecutable = false)
    )
  }
}
