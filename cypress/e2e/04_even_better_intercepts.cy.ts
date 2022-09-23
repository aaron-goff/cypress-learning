import { oneTodo, twoTodos } from "../support/constants";

describe("intercept", () => {
  beforeEach(() => {
    cy.intercept("/todos", Cypress.env("todos") ?? []).as("todos");
    cy.visit("/").wait("@todos");
  });

  afterEach(() => {
    Cypress.env("todos", undefined);
  });

  it("validates I have two todos", { env: { todos: twoTodos } }, () => {
    cy.get("li").should("have.length", 2);
  });

  it("validates I have one todo", { env: { todos: oneTodo } }, () => {
    cy.get("li").should("have.length", 1);
  });

  it("validates I have no todos", () => {
    cy.get("li").should("have.length", 0);
  });
});
