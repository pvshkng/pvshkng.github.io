import { createSignal } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
//import "./App.css";

import "./assets/css/skills.css";
import "./assets/css/slider.css";

import Navbar from "./assets/component/Navbar";
import Headshot from "./assets/component/Headshot";
import Footer from "./assets/component/Footer";
import Chatbox from "./assets/component/Chatbox";
import Skills from "./assets/component/Skills";

function App() {
  return (
    <>

        <Navbar />

        <div class="main-content">
          <Headshot />
          {/* <Skills /> */}
        </div>

        <Footer />
        <Chatbox />

    </>
  );
}

export default App;
