package tutorial.webapp

import org.scalajs.dom.document

object TutorialApp {

  def main(args: Array[String]): Unit = {
    AppRouter().renderIntoDOM(document.getElementById("container"))
  }
}
