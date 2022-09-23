import { getTodos } from "../support/todos";

const defaultFixture = { fixture: "default" };

// This describe block just uses a fixture as default
describe("intercept", () => {
  beforeEach(() => {
    cy.intercept("/todos", Cypress.env("todos") ?? defaultFixture).as("todos");
    cy.visit("/").wait("@todos");
  });

  afterEach(() => {
    Cypress.env("todos", undefined);
  });

  it("validates I have two todos", getTodos(2), () => {
    cy.get("li").should("have.length", 2);
  });

  it("validates I have one todo", () => {
    cy.get("li").should("have.length", 1);
  });

  it("validates I have no todos", { env: { todos: [] } }, () => {
    cy.get("li").should("have.length", 0);
  });
});

// This describe block uses fixtures instead of classes/data
describe("intercept 2", () => {
  beforeEach(() => {
    cy.intercept("/todos", {
      fixture: Cypress.env("todosFixture") ?? "default",
    }).as("todos");
    cy.visit("/").wait("@todos");
  });

  afterEach(() => {
    Cypress.env("todosFixture", undefined);
  });

  it("validates the default todos", () => {
    cy.fixture("default").then((data) => {
      cy.get("li").should("have.length", data.length);
      cy.get("li").eq(0).should("have.text", data[0].title);
    });
  });

  it(
    "validates the uncompleted todos",
    { env: { todosFixture: "uncompleted" } },
    () => {
      cy.fixture("uncompleted").then((data) => {
        cy.get("li").should("have.length", data.length);
        cy.get("li").eq(0).should("have.text", data[0].title);
      });
    }
  );

  it("validates the empty todos", { env: { todosFixture: "empty" } }, () => {
    cy.fixture("empty").then((data) => {
      cy.get("li").should("have.length", data.length);
    });
  });
});
