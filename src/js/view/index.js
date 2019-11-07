import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import { classNames } from "./classNames";
import {
  showFormMsg,
  mealInputMessage,
  caloriesInputMessage,
  saveMealMessage,
  deleteMealMessage
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

function tableView(dispatch, model) {
  if (!model.meals.length) return "Go eat a 🍔!!!";
  return table({ className: classNames.table }, [
    tableHead(),
    tableBody(dispatch, model)
  ]);
}

function tableHead() {
  return thead(
    {},
    tr({}, [
      th({ className: "px-4 py-2" }, "Meal"),
      th({ className: "px-4 py-2" }, "Calories"),
      th({ className: "px-4 py-2" }, "")
    ])
  );
}

function tableBody(dispatch, model) {
  const { meals } = model;
  let sum = 0;
  const createMealRow = meals.map(meal => {
    sum += meal.calories;
    return tr({}, [
      td({ className: classNames.tableCell }, meal.description),
      td({ className: classNames.tableCell }, meal.calories),
      td({ className: classNames.tableCell }, [
        button({ className: `${classNames.buttonSmall} ml-3` }, "Edit"),
        button(
          {
            className: `${classNames.buttonSmallDelete} ml-3`,
            onclick: () => dispatch(deleteMealMessage(meal.id))
          },
          "Delete"
        )
      ])
    ]);
  });

  return tbody({ className: "" }, [
    createMealRow,
    tr({}, [
      td({ className: "pl-4 font-extrabold" }, "Total: "),
      td({ className: "pl-4 font-extrabold" }, sum)
    ])
  ]);
}

function view(dispatch, model) {
  return div({ className: classNames.container }, [
    h1({ className: classNames.h1 }, "Calorie Counter"),
    formView(dispatch, model),
    tableView(dispatch, model),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
