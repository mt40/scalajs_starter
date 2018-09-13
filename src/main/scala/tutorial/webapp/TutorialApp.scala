package tutorial.webapp

import org.scalajs.dom.document
import tutorial.webapp.components.Title

object TutorialApp {

  def main(args: Array[String]): Unit = {
    Title().renderIntoDOM(document.getElementById("container"))
  }
}
