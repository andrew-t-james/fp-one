import { html, render } from "https://unpkg.com/htm/preact/standalone.mjs";
import { meals } from "./data.js";
import { Table } from "./Table.js";

const App = () =>
  html`
    <div class="relative bg-gray-200">
      <div class="absolute inset-0 flex flex-col" aria-hidden="true">
        <div class="flex-1 bg-gray-100"></div>
        <div class="flex-1 bg-gray-200"></div>
      </div>
      <div class="relative max-w-5xl mx-auto">
        <div
          class="flex flex-col min-h-screen lg:flex-row lg:items-center lg:p-8"
        >
          <div class="mx-auto">
            <${Table} meal="Meal" calories="Calories" meals=${meals} />
          </div>
        </div>
      </div>
    </div>
  `;

const Table = ({ meal, calories, meals }) => html`
  <table class="table-fixed">
    <thead>
      <tr>
        <th class="w-1/2 px-4 py-2">${meal}</th>
        <th class="w-1/4 px-4 py-2">${calories}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-gray-100">
        <td class="border px-4 py-2">Breakfast</td>
        <td class="border px-4 py-2">480</td>
      </tr>
    </tbody>
  </table>
`;

render(
  html`
    <${App} meals=${meals} />
  `,
  document.body
);
