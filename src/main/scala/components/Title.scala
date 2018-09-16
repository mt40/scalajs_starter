package components

import japgolly.scalajs.react.ScalaComponent
import japgolly.scalajs.react.vdom.html_<^._

object Title {

  private val component = {
    ScalaComponent.builder
      .static("Title") {
        <.div("Hello!")
      }
      .build
  }

  def apply() = component()
}
