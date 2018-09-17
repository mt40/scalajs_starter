import org.scalajs.dom.document

object ScalaJsApp {

  def main(args: Array[String]): Unit = {
    AppCSS.load()
    AppRouter().renderIntoDOM(document.getElementById("container"))
  }
}
