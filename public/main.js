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

render(
  html`
    <${App} />
  `,
  document.body
);
