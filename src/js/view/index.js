import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
function fieldSet(labelText, inputValue) {
  return div({ className: "mb-4" }, [
    label({ className: classNames.formLabel }, labelText),
    input({ className: classNames.formInput, type: "text", value: inputValue })
  ]);

const { pre } = hh(h);

function view(dispatch, model) {
  return pre(JSON.stringify(model, null, 2));
}

export default view;
