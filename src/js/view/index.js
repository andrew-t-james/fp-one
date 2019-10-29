import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import { classNames } from "./classNames";
import { MSGS } from "../update";

const { pre, div, h1, button, form, label, input } = hh(h);

function fieldSet(labelText, inputValue) {
  return div({ className: "mb-4" }, [
    label({ className: classNames.formLabel }, labelText),
    input({ className: classNames.formInput, type: "text", value: inputValue })
  ]);
}

function buttonSet(dispatch) {
  return div({ className: "flex items-center justify-between" }, [
    button({ className: classNames.buttonPrimary }, "Add Meal"),
    button({ className: classNames.buttonSecondary }, "Cancel")
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;
  if (showForm) {
    return form({ className: classNames.form }, [
      fieldSet("Meal", description),
      fieldSet("Calories", calories || ""),
      buttonSet()
    ]);
  }

  return div({ className: "mb-4" }, [
    button(
      {
        className: classNames.buttonPrimary,
        onclick: () => dispatch(MSGS.SHOW_FORM)
      },
      "Show Form"
    )
  ]);
}

function view(dispatch, model) {
  return div({ className: classNames.container }, [
    h1({ className: classNames.h1 }, "Calorie Counter"),
    formView(dispatch, model),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
