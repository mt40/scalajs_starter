import components.Title
import pages.HomePage
import scalacss.DevDefaults._
import scalacss.internal.mutable.GlobalRegistry

object AppCSS {

  /** Call before using any React components to load CSS. */
  def load(): Unit = {
    import org.scalajs.dom.raw.HTMLStyleElement
    println(Title.Style.render[HTMLStyleElement].outerHTML)
    GlobalRegistry.register(HomePage.Style, Title.Style)
    GlobalRegistry.onRegistration(_.addToDocument())
  }
}
