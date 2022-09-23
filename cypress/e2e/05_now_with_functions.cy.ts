import { oneTodo, twoTodos } from "../support/constants";
import { todos } from "../support/todos";

describe("intercept", () => {
  beforeEach(() => {
    cy.intercept("/todos", Cypress.env("todos") ?? []).as("todos");
    cy.visit("/").wait("@todos");
  });

  afterEach(() => {
    Cypress.env("todos", undefined);
  });

  // , { env: { foo: true, bar: false } },

  it("validates I have two todos", todos(twoTodos), () => {
    cy.get("li").should("have.length", 2);
  });

  it("validates I have one todo", todos(oneTodo), () => {
    cy.get("li").should("have.length", 1);
  });

  it("validates I have no todos", todos([]), () => {
    cy.get("li").should("have.length", 0);
  });
});
