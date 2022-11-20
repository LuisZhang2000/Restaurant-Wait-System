describe('Checking Happy Path 2', () => {
    /**
     * Defined sequence of Happy Path 2:
     * 
     * 1. Customer changes table number
     * 2. Customer orders an item from the Menu
     * 3. Customer goes to Cart page and modifies the quanity of item
     * 4. Cutomer goes back to menu and adds another item
     * 5. Customer goes to Cart page and places the order
     * 6. Customer opens the bill
     * 7. Customer then goes on the My Orders page for final verification 
     */

    function addToCartItem(index) {
        cy.get(`button[name=add-to-cart-item-${index}]`)
            .click();
    }

    function adjustQuantityItem(index, operation, quantity) {
        for (let i = 0; i < quantity; i++) {
            cy.get(`button[name=${operation}-item-${index}]`)
                .click();
        
            cy.wait(1000);
        }
    }

    it('Happy Path 1', () => {
        // go to menu screen
        cy.visit('localhost:3000');

        // click on change table number button
        cy.get('button[name=table-number-button]')
            .click();

        cy.wait(200);

        // change the table number of table
        const tableNumber = 33;
        cy.get('input[name=table-number-input]')
            .focus()
            .type(tableNumber);
        
        // save the table number
        cy.get('button[name=table-number-save-button]')
            .click();

        // add second item in menu to cart (add second item)
        addToCartItem(2);
        
        cy.wait(4000);
        
        // add fourth item in menu to cart
        addToCartItem(4);

        // visit My Cart page
        cy.get('button[name=my-cart-button]')
            .click();
        
        // + 5 the quantity of item # 1
        adjustQuantityItem(1, 'increment', 5);

        // + 2 the quantity of item # 2
        adjustQuantityItem(2, 'increment', 4);

        // - 1 the quantity of item # 2
        adjustQuantityItem(2, 'decrement', 1);

        // -2 the quantity of item # 1
        adjustQuantityItem(1, 'decrement', 2);

        // go back to menu, click another category, add another item
        cy.get('button[name=back-to-menu-button]')
            .click();

        cy.wait(1000);

        // click on 2nd category and add 1st item
        cy.get('button[name=category-button-2]')
            .click({ force: true });

        cy.wait(1000);

        // add 1st item twice
        addToCartItem(1);

        cy.wait(1000);

        addToCartItem(1);

        // go back to cart page
        cy.get('button[name=my-cart-button]')
            .click();
        
        // place order cart button
        cy.get('button[name=place-order-button]')
            .click();

        cy.wait(500);

        // confirm place order button for cart
        cy.get('button[name=confirm-place-order-button]')
            .click();

        // click on my orders button and confirm order placed
        cy.get('button[name=my-orders-button]')
            .click();
    });
});