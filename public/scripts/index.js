var proxyCombo = document.getElementById("proxy");

addEvent(proxyCombo, "change", updateProxy);

function updateProxy(e) {
  setProxy(e.srcElement.value);
}

function setSelected(element, child) {
  for (var i = 0; i < element.children.length; i++) {
    if (element.children[i].value === child) {
      element.children[i].setAttribute("selected", null);
    }
  }
}

setSelected(proxyCombo, settings.proxy);