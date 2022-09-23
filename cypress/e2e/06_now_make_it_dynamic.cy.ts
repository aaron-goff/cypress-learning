import { oneTodo } from "../support/constants";
import { getRandomTodo, getTodos } from "../support/todos";

const myRandomTodo = getRandomTodo({
  title: "Aaron's Very Important Todo",
  completed: false,
});
const myRandomCompletedTodo = getRandomTodo({
  title: "Completed Todo",
  completed: true,
});

describe("intercept", () => {
  beforeEach(() => {
    cy.intercept("/todos", Cypress.env("todos") ?? []).as("todos");
    cy.visit("/").wait("@todos");
  });

  afterEach(() => {
    Cypress.env("todos", undefined);
  });

  it("validates I have two todos", getTodos(2), () => {
    cy.get("li").should("have.length", 2);
  });

  it("validates I have one todo", getTodos(oneTodo), () => {
    cy.get("li").should("have.length", 1);
  });

  it("validates I have no todos", () => {
    cy.get("li").should("have.length", 0);
  });

  it(
    "validates my custom todo list",
    getTodos([myRandomTodo, myRandomCompletedTodo]),
    () => {
      cy.get("li")
        .contains(myRandomTodo.title)
        .should("not.have.css", "text-decoration-line", "line-through");
      cy.get("li")
        .contains(myRandomCompletedTodo.title)
        .should("have.css", "text-decoration-line", "line-through");
    }
  );
});
