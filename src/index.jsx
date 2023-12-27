/* @refresh reload */
import { render } from 'solid-js/web'

//import './index.css'
import "./assets/css/global.css";
import App from './App'

const root = document.getElementById('root')

render(() => <App />, root)
