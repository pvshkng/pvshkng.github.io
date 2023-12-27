import { onCleanup, createEffect } from "solid-js";
import headshotImage from "../image/headshot-transparent.png";

function resizeHandler() {
  const widthValues = [238, 525, 856, 1235, 1946];
  const fontSizeValues = [17.4, 26.25, 33.38, 40.38, 50];

  const container = document.querySelector(".fl-headshot-container");

  if (!container) return;

  const containerWidth = container.clientWidth;

  const fontSize = calculateLinearRelationship(
    containerWidth,
    widthValues,
    fontSizeValues
  );

  const introText = document.querySelector(".intro-text");

  if (introText) {
    introText.style.fontSize = fontSize + "px";
  }
}

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

export default function Headshot() {
  createEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler(); // Call once to initialize

    // Cleanup event listener on component unmount
    onCleanup(() => {
      window.removeEventListener("resize", resizeHandler);
    });
  });

  return (
    <div class="first-layer">
      <div class="fl-headshot-container">
        <img src={headshotImage} width="300"></img>

        <div class="intro-text">
          <p>
            Yep, another developer in this oversaturated market. —{" "}
            <span id="svk">SvelteKit</span>, <span id="next">Next.js</span>,{" "}
            <span id="solid">Solid.js</span>, <span id="stl">Streamlit</span>,
            and <span id="dj">Django</span> are the frameworks I use. I've
            worked on cloud projects using <span id="gcp-g">G</span>
            <span id="gcp-c">C</span>
            <span id="gcp-p">P</span> and <span id="az">Azure</span>. I'm not
            just a pretty user-interface maker, I've got some skills in API
            testing using <span id="pm">Postman</span>,{" "}
            <span id="jm">JMeter</span>, and <span id="k6">k6</span> as well.
            Major thanks to <span id="w3">W3Schools</span>,{" "}
            <span id="mdn">MDN Web Docs</span>, and of course, my best
            large-language buddy <span id="gpt">ChatGPT</span>. By the way, this
            site you're admiring right now? Initially written in vanilla <span id="html">HTML</span>,{" "}
            <span id="css">CSS</span>, and <span id="js">JS</span> all the way,
            but later migrated to <span id="solid">Solid.js</span> on <span id="github">GitHub Pages</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
