const MSGS = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIES_INPUT: "CALORIES_INPUT"
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
    default:
      return model;
  }
}

export default update;
