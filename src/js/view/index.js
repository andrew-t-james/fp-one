import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import { classNames } from "./classNames";
import {
  showFormMsg,
  mealInputMessage,
  caloriesInputMessage,
  saveMealMessage
} from "../update";

const {
  pre,
  div,
  h1,
  button,
  form,
  label,
  input,
  table,
  thead,
  tbody,
  tr,
  th,
  td
} = hh(h);

function fieldSet(labelText, inputValue, oninput) {
  return div({ className: "mb-4" }, [
    label({ className: classNames.formLabel }, labelText),
    input({
      className: classNames.formInput,
      type: "text",
      value: inputValue,
      name: labelText.toLowerCase(),
      oninput
    })
  ]);
}

function buttonSet(dispatch) {
  return div({ className: "flex items-center justify-between" }, [
    button({ className: classNames.buttonPrimary }, "Add Meal"),
    button(
      {
        className: classNames.buttonSecondary,
        onclick: () => dispatch(showFormMsg(false))
      },
      "Cancel"
    )
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;
  if (showForm) {
    return form(
      {
        className: classNames.form,
        onsubmit: e => {
          e.preventDefault();
          dispatch(saveMealMessage);
        }
      },
      [
        fieldSet("Meal", description, e =>
          dispatch(mealInputMessage(e.target.value))
        ),
        fieldSet("Calories", calories || "", e =>
          dispatch(caloriesInputMessage(e.target.value))
        ),
        buttonSet(dispatch)
      ]
    );
  }

  return div({ className: "mb-4" }, [
    button(
      {
        className: classNames.buttonPrimary,
        onclick: () => dispatch(showFormMsg(true))
      },
      "Show Form"
    )
  ]);
}

function tableView(model) {
  return table({ className: classNames.table }, [
    tableHead(),
    tableBody(model)
  ]);
}

function tableHead() {
  return thead(
    { className: "" },
    tr({}, [
      th({ className: "px-4 py-2" }, "Meal"),
      th({ className: "px-4 py-2" }, "Calories")
    ])
  );
}

function tableBody(model) {
  const { meals } = model;
  const createRow = meals.map(meal => [
    td({ className: " border px-4 py-2 " }, meal.description),
    td({ className: " border px-4 py-2" }, [
      meal.calories,
      [
        button({ className: `${classNames.buttonSmall} ml-3` }, "Edit"),
        button({ className: `${classNames.buttonSmallDelete} ml-3` }, "Delete")
      ]
    ])
  ]);
  return tbody({ className: "" }, tr({}, createRow));
}

function view(dispatch, model) {
  return div({ className: classNames.container }, [
    h1({ className: classNames.h1 }, "Calorie Counter"),
    formView(dispatch, model),
    tableView(model),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
