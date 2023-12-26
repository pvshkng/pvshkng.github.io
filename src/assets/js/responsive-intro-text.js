window.addEventListener("resize", function () {
  const widthValues = [238, 525, 856, 1235, 1946];
  const fontSizeValues = [17.4, 26.25, 33.38, 40.38, 50];

  var container = document.querySelector(".fl-headshot-container");

  var containerWidth = container.clientWidth;

  var fontSize = calculateLinearRelationship(
    containerWidth,
    widthValues,
    fontSizeValues
  );

  document.querySelector(".intro-text").style.fontSize = fontSize + "px";
});

window.dispatchEvent(new Event("resize"));

function calculateLinearRelationship(width, xValues, yValues) {
  if (width <= xValues[0]) {
    return yValues[0];
  }

  if (width >= xValues[xValues.length - 1]) {
    return yValues[yValues.length - 1];
  }

  for (let i = 1; i < xValues.length; i++) {
    if (width <= xValues[i]) {
      const x0 = xValues[i - 1];
      const x1 = xValues[i];
      const y0 = yValues[i - 1];
      const y1 = yValues[i];

      return y0 + ((width - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
}
