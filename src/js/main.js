import hh from "hyperscript-helpers";
import { h, diff, patch, create } from "virtual-dom";

import initModel from "model";
// import "../css/styles.css";

const root = document.getElementById("app");
function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = create(currentView);
  node.appendChild(rootNode);

  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

// app(initModel, /* update, view*/ root);
