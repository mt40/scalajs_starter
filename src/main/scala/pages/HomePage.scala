package pages

import components.Title
import japgolly.scalajs.react.ScalaComponent
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.DevDefaults._
import scalacss.ScalaCssReact._
import scalacss.internal.mutable.StyleSheet

import scala.language.postfixOps

object HomePage {

  object Style extends StyleSheet.Inline {

    import dsl._

    val self = style(
      width(100 %%),
      height(100 %%),
      backgroundColor(rgb(79, 112, 165)),
      display.flex,
      flexDirection.column,
      justifyContent.center
    )
  }

  private val component = {
    ScalaComponent.builder
      .static("HomePage") {
        <.div(Style.self, Title())
      }
      .build
  }

  def apply() = component()
}
