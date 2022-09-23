describe("empty spec", () => {
  it("variable assignment", () => {
    let myVar = 0;
    cy.then(() => {
      cy.log(myVar);
    });
    myVar++;
    cy.then(() => {
      cy.log(myVar);
    });
  });

  it("fixes the variable assignment issue", () => {
    let myVar = 0;
    cy.then(() => {
      cy.log(myVar);
    })
      .then(() => {
        myVar++;
      })
      .then(() => {
        cy.log(myVar).then(() => {
          console.log("akdsjfnaksdfjnakjsdfn");
        });
      });
  });
});
