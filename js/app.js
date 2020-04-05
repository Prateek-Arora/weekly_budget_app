// Classes--------------

class Budget {
    constructor(budget){
        this.budget = Number (budget);
        this.budgetLeft = this.budget;
    }

    // Substract from the budget.
    substractFromBudget(amount){
        return this.budgetLeft -= amount;
    }
}


// Everything related to html.
class HTML {
    // Inserts budget into the html.
    insertBudget(amount){
        // Insert into html.
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

    // To display a message.
    printMessage(message, className){
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        // Remove the error.
        setTimeout(function(){
            messageWrapper.remove();
            addExpenseForm.reset();
        }, 3000);
    }

    // Adding expenses to the list.
    addExpenseToList(expenseName, amount){
        const expensesList = document.querySelector('#expenses ul');

        // Create an li.
        const li = document.createElement('li');
        li.classList = "list-group-item d-flex justify-content-between align-items-center";

        // Create the template.
        li.innerHTML = `
            ${expenseName}
            <span class="badge badge-primary badge-pill">${amount}</span>
        `;

        // Insert into html.
        expensesList.appendChild(li);
    }

    trackBudget(amount){
        const budgetLeftDollars = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;

        // Check when 25% budget is left.
        if( (budget.budget / 4) >= budgetLeftDollars){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        }
        else if( (budget.budget / 2) >= budgetLeftDollars){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}



// Variables-------------

const addExpenseForm = document.querySelector('#add-expense'),
        html = new HTML(),
        budgetTotal = document.querySelector('span#total'),
        budgetLeft = document.querySelector('span#left');

let budget, userBudget;



// Event Listeners-------

eventListeners();

function eventListeners(){

    // Loader.
    document.addEventListener('DOMContentLoaded', function(){
        // Asking the visitor their weekly budget.
        userBudget = prompt(' What\'s your budget for this week? ');

        // Validate the userBudget.
        if(userBudget === null || userBudget === '' || userBudget === '0'){
            window.location.reload();
        }
        else{
            // userBudget is valid, so instantiate the Budget class.
            budget = new Budget(userBudget);

            // Instantiate the HTML class.
            html.insertBudget(budget.budget);
        } 
    });

    // When a new expense in added.
    addExpenseForm.addEventListener('submit', function(e){
        e.preventDefault();
        // Read input values.
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === ''){
            html.printMessage('All the fields are mandatory', 'alert-danger');
        }
        else{
            // Add the expenses into the list.
            html.addExpenseToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Expense Added!!', 'alert-success');
        }
    });
}



