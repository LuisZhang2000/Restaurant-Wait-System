describe('Checking Happy Path 1', () => {
	/**
	 * Defined sequence of Happy Path 1:
	 * 
	 * 1. Register for Manager
	 * 2. Login as Manager
	 * 3. Create a Category
	 * 4. Create a Menu Item
	 */

	function addIngredient(ingredient) {
		cy.get('input[name=add-ingredient-input]')
			.focus()
			.type(ingredient);
		
		cy.get('button[name=add-ingredient-button]')
			.click();
		
		cy.wait(200);
	}

	function addExtraIngredient(ingredient) {
		cy.get('input[name=add-extra-ingredient-input]')
			.focus()
			.type(ingredient);
		
		cy.get('button[name="add-extra-ingredient-button"]')
			.click();
		
		cy.wait(200);
	}

	function deleteIngredient(ingredient) {
		cy.wait(1000);

		cy.contains(`Delete ${ingredient}`)
			.click();
	}

	it('Happy path 1', () => {
		// vist login page
		cy.visit('localhost:3000/login');

		// click on register button on home screen
		cy.contains('Sign Up')
			.click();

		// click on email input field
		const email = 'cypress@com';
		cy.get('input[name=register-email-input]')
			.focus()
			.type(email);

		// click the password input field
		const password = '321';
		cy.get('input[name=register-password-input]')
			.focus()
			.type(password);
		
		// click the confirm password input field
		cy.get('input[name=register-confirm-password-input]')
			.focus()
			.type(password);

		// click the manager option in register
		cy.get('[type="radio"]')
			.first()
			.check();

		// click the sign up button in register screen
		cy.get('button[name=register-signup-button]')
			.click();
		
		// click back on the login link
		cy.contains('Log In')
			.click();
		
		// login as the manager position we registered for

		// type email in input field
		cy.get('input[name=login-email-input]')
			.focus()
			.type(email);
		
		// type password in password field
		cy.get('input[name=login-password-input]')
			.focus()
			.type(password);

		// click the login button
		cy.get('button[name=login-button]')
			.click();

		// click the add category button and wait for modal to pop-up
		cy.get('button[name=add-category-button]')
			.click();

		cy.wait(200);
		
		// focus on category name input field and insert name
		const categoryName = 'Cypress Category';
		cy.get('input[name=category-name-input]')
			.focus()
			.type(categoryName);

		// click 'create +' button and wait for category to appear
		cy.get('button[name=create-category-button]')
			.click();

		cy.wait(200);

		// click 'View Cypress Category' button
		cy.contains('View Cypress Category')
			.click();

		// click on '+ Add Menu Item' button on menu screen
		cy.get('button[name=add-menu-item]')
			.click();

		// focus and fill item name input field with name
		const name = 'Cypress Burger';
		cy.get('input[name=item-name-input]')
			.focus()
			.type(name);
		
		// focus and fill item price input field with price
		const price = '18.99';
		cy.get('input[name=item-price-input]')
			.focus()
			.type(price);

		// focus and fill item expected making item with integer
		const time = '5';
		cy.get('input[name=item-time-input]')
			.focus()
			.type(time);

		// focus and fill item ingredient list
		const ingredientOne = 'JavaScript';
		const ingredientTwo = 'Beep Boop';
		const ingredientThree = 'Big Brain';

		addIngredient(ingredientOne);
		addIngredient(ingredientTwo);
		addIngredient(ingredientThree);

		// add an item we want to delete
		const toDeleteIngredient = 'To Delete Ingredient';
		addIngredient(toDeleteIngredient);
		deleteIngredient(toDeleteIngredient);
		
		// focus and fill extra ingredients list
		const extraIngredientOne = 'Keyboard';
		const extraIngredientTwo = 'Mouse';
		const extraIngredientThree = 'Clicky Keys';

		addExtraIngredient(extraIngredientOne);
		addExtraIngredient(extraIngredientTwo);
		addExtraIngredient(extraIngredientThree);

		// add an extra ingredient we want to delete;
		// add an item we want to delete
		const toDeleteExtraIngredient = 'To Delete Extra Ingredient';
		addExtraIngredient(toDeleteExtraIngredient);
		deleteIngredient(toDeleteExtraIngredient);

		// click '+ Create' button
		cy.get('button[name=create-item-button]')
			.click();

		// click back to categories to check if categories still present
		cy.get('button[name=back-to-categories-button]')
			.click();

		// click back to the newly created category again to check created item still there
		cy.contains(`View ${categoryName}`)
			.click();

		// click on edit item again to see if item retains original values
		cy.contains('Edit Item')
			.click();
	});
});