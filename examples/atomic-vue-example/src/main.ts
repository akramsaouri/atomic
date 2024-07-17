import { createApp } from "vue";
import App from "./App.vue";

// Add these lines for web components support in older browsers
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";
import "@webcomponents/webcomponentsjs/webcomponents-bundle.js";

createApp(App).mount("#app");
