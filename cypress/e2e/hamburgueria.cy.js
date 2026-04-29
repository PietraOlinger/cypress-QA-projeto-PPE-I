describe("Testes E2E - Hamburgueria", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("Cenário 1 - Deve carregar a página inicial", () => {
    cy.contains("Hamburgueria").should("be.visible");
    cy.contains("Seu abraço em forma de hambúrger").should("be.visible");
    cy.contains("Nossos Hambúrguers").should("be.visible");
  });

  it("Cenário 2 - Deve exibir os produtos principais", () => {
    cy.contains("Smash Burguer").should("be.visible");
    cy.contains("Cheese Burguer").should("be.visible");
    cy.contains("Hambúrguer Gourmet").should("be.visible");
  });

  it("Cenário 3 - Deve aumentar e diminuir a quantidade de um produto", () => {
    cy.get(".product-card").first().within(() => {
      cy.get(".numero-produto").should("have.text", "1");

      cy.get(".incrementar").click();
      cy.get(".numero-produto").should("have.text", "2");

      cy.get(".decrementar").click();
      cy.get(".numero-produto").should("have.text", "1");
    });
  });

  it("Cenário 4 - Deve adicionar produto ao carrinho", () => {
    cy.get(".product-card").first().within(() => {
      cy.get(".incrementar").click();
      cy.get(".btn-comprar").click();
    });

    cy.get("#cart-empty").should("not.be.visible");
    cy.get("#cart-items").should("contain", "Smash Burguer");
    cy.get("#cart-items").should("contain", "Quantidade: 2");
  });

  it("Cenário 5 - Deve limpar o carrinho", () => {
    cy.get(".product-card").first().within(() => {
      cy.get(".btn-comprar").click();
    });

    cy.get("#cart-items").should("contain", "Smash Burguer");

    cy.get("#cart-clear").click();

    cy.get("#cart-empty").should("be.visible");
    cy.get("#cart-empty").should("contain", "Seu carrinho está vazio");
  });

  it("Cenário 6 - Não deve diminuir quantidade abaixo de 1", () => {
    cy.get(".product-card").first().within(() => {
      cy.get(".decrementar").click();
      cy.get(".numero-produto").should("have.text", "1");
    });
  });
});
