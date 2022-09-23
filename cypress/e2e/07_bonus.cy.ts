import { getRandomTodo } from "../support/todos";

describe("intercept", () => {
  beforeEach(() => {
    cy.intercept("/todos", Cypress.env("todos") ?? []).as("todos");
    cy.visit("/").wait("@todos");
  });

  it("demonstrates how you can change values during a test", () => {
    //cy.pause();
    cy.get("li")
      .should("have.length", 0)
      .then(() => {
        Cypress.env("todos", [getRandomTodo()]);
      })
      .reload()
      .get("li")
      .should("have.length", 1);
  });
});
