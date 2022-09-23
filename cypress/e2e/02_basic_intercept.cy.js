describe("intercept", () => {
  it("validates I have two todos", () => {
    cy.intercept("/todos", [
      { title: "foo", completed: false, id: 1 },
      { title: "bar", completed: false, id: 2 },
    ]);
    cy.visit("/");
    cy.get("li").should("have.length", 2);
  });

  it("validates I have one todo", () => {
    cy.intercept("/todos", [{ title: "foo", completed: "false", id: 1 }]);
    cy.visit("/");
    cy.get("li").should("have.length", 1);
  });

  it("validates I have no todos", () => {
    cy.intercept("/todos", []);
    cy.visit("/");
    cy.get("li").should("have.length", 0);
  });
});
