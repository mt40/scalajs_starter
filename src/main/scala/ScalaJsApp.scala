package webapp

import org.scalajs.dom.document

object ScalaJsApp {

  def main(args: Array[String]): Unit = {
    AppRouter().renderIntoDOM(document.getElementById("container"))
  }
}
