import { html } from "https://unpkg.com/htm/preact/standalone.mjs";

const TableHead = ({ classNames, children }) => html`
  <thead class=${classNames}>
    ${children}
  </thead>
`;

const TableHeadCell = ({ classNames, input }) => html`
  <th class=${classNames}>${input}</th>
`;

const TableBody = ({ classNames, children }) => html`
  <tr class=${classNames}>
    ${children}
  </tr>
`;

const TableRow = ({ classNames, children }) => html`
  <tr class=${classNames}>
    ${children}
  </tr>
`;

const TableData = ({ classNames, input }) => html`
  <td class=${classNames}>${input}</td>
`;

const Table = ({ meals = [] }) => html`
  <table class="table-fixed">
    <${TableHead}>
      <${TableRow}>
        <${TableHeadCell} classNames="w-1/2 px-4 py-2" input="Meal" />
        <${TableHeadCell} classNames="w-1/2 px-4 py-2" input="Calories" />
      </${TableRow}>
    </${TableHead}>
    <${TableBody}>
      ${meals.map(
        meal => html`
          <${TableRow} classNames="bg-gray-100">
            <${TableData} classNames="border px-4 py-2" input=${meal.description} />
            <${TableData} classNames="border px-4 py-2" input=${meal.calories} />
          </${TableRow}>
        `
      )}
      <${TableRow} classNames="bg-gray-100">
        <${TableData} classNames="border px-4 py-2" input="Total" />
        <${TableData}
          classNames="border px-4 py-2 font-extrabold"
          input=${totalCalories(meals.map(meal => meal.calories))}
        />
      </${TableRow}>
    </${TableBody}>
  </table>
`;

function totalCalories(meals) {
  return meals.reduce((acc, cals) => acc + cals, 0);
}

export { Table };
