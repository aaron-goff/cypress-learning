describe("intercept", () => {
  beforeEach(() => {
    cy.intercept("/todos", Cypress.env("todos") ?? []).as("todos");
    cy.visit("/").wait("@todos");
  });

  afterEach(() => {
    Cypress.env("todos", undefined);
  });

  it(
    "validates I have two todos",
    {
      env: {
        todos: [
          { title: "foo", completed: false, id: 1 },
          { title: "bar", completed: false, id: 2 },
        ],
      },
    },
    () => {
      cy.get("li").should("have.length", 2);
    }
  );

  it(
    "validates I have one todo",
    { env: { todos: [{ title: "foo", completed: false, id: 1 }] } },
    () => {
      cy.get("li").should("have.length", 1);
    }
  );

  it("validates I have two todos", () => {
    cy.get("li").should("have.length", 0);
  });
});
