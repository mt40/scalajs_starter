package webapp

import japgolly.scalajs.react.extra.router._
import japgolly.scalajs.react.vdom.html_<^._
import pages.HomePage

object AppRouter {

  sealed trait PageRepr
  case object Home extends PageRepr

  private val routerConfig = RouterConfigDsl[PageRepr].buildConfig { dsl =>
    import dsl._

    // Github Page serves "/scalajs_starter" not "/"
    val publicUrl = sys.env.getOrElse("PUBLIC_URL", "")
    val siteRoot = root / publicUrl

    // the use of `emptyRule` is just for nice formatting
    (emptyRule
    // "/" -> home page
      | staticRoute(siteRoot, Home) ~> render(HomePage())
      | staticRedirect(root) ~> redirectToPage(Home)(Redirect.Replace))
    // not found -> home page
      .notFound(redirectToPage(Home)(Redirect.Replace))
  }

  def apply() = {

    // REMOVE
    routerConfig.logToConsole

    val baseUrl = BaseUrl.fromWindowOrigin
    Router(baseUrl, routerConfig)()
  }
}
