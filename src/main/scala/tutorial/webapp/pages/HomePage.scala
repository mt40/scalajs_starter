package tutorial.webapp.pages

import japgolly.scalajs.react.ScalaComponent
import japgolly.scalajs.react.vdom.html_<^._
import tutorial.webapp.components.Title

object HomePage {
  private val component = {
    ScalaComponent.builder
      .static("HomePage") {
        <.div(Title())
      }
      .build
  }

  def apply() = component()
}
