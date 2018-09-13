package tutorial.webapp.components

import japgolly.scalajs.react.ScalaComponent
import japgolly.scalajs.react.vdom.html_<^._

object Title {

  private val component = {
    ScalaComponent.builder[Unit]("No args")
      .renderStatic(<.div("Hello!"))
      .build
  }

  def apply() = component()
}
