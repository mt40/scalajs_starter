package tutorial.webapp

import japgolly.scalajs.react.extra.router._
import japgolly.scalajs.react.vdom.html_<^._
import tutorial.webapp.pages.HomePage

object AppRouter {

  sealed trait PageRepr
  case object Home extends PageRepr

  private val routerConfig = RouterConfigDsl[PageRepr].buildConfig { dsl =>
    import dsl._

    // the use of `emptyRule` is just for nice formatting
    (trimSlashes
    // "/" -> home page
      | staticRoute(root, Home) ~> render(HomePage()))
    // not found -> home page
      .notFound(redirectToPage(Home)(Redirect.Replace))
  }

  def apply() = {
    val baseUrl = BaseUrl.fromWindowOrigin
    Router(baseUrl, routerConfig)()
  }
}
