import initModel from "./model";
import view from "./view";
import update from "./update";
import app from "./app";

const root = document.getElementById("app");

app(initModel, update, view, root);
