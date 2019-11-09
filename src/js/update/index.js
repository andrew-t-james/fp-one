const MSGS = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIES_INPUT: "CALORIES_INPUT",
  SAVE_MEAL: "SAVE_MEAL",
  DELETE_MEAL: "DELETE_MEAL",
  EDIT_MEAL: "EDIT_MEAL"
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm
  };
}

export function mealInputMessage(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description
  };
}

export function caloriesInputMessage(calories) {
  return {
    type: MSGS.CALORIES_INPUT,
    calories
  };
}

export const saveMealMessage = { type: MSGS.SAVE_MEAL };

export function deleteMealMessage(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id
  };
}

export function editMealMessage(editId) {
  return {
    type: MSGS.EDIT_MEAL,
    editId
  };
}
// function convertToNumberOrZero(operator) {
//   return function(arg) {
//     const number = operator(arg);
//     if (isNaN(number)) {
//       console.log("number:", { number, arg });
//       return 0;
//     }
//     return number;
//   };
// }

function isNumber(arg) {
  return isNaN(arg) ? 0 : arg;
}

function add(msg, model) {
  const { nextId, description, calories } = model;
  const meal = {
    id: nextId,
    description,
    calories
  };
  const meals = [...model.meals, meal];
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: "",
    calories: "",
    showForm: false
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM:
      const { showForm } = msg;
      return {
        ...model,
        showForm,
        description: "",
        calories: 0
      };
    case MSGS.MEAL_INPUT:
      const { description } = msg;
      return {
        ...model,
        description
      };
    case MSGS.CALORIES_INPUT:
      // const calories = convertToNumberOrZero(Number)(msg.calories);
      let calories = msg.calories |> Number |> isNumber;
      return {
        ...model,
        calories
      };
    case MSGS.SAVE_MEAL:
      return add(msg, model);
    case MSGS.DELETE_MEAL:
      const { id } = msg;
      const meals = model.meals.filter(meal => meal.id !== id);
      return {
        ...model,
        meals
      };
    default:
      return model;
  }
}

export default update;
