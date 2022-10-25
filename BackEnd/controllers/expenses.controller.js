const { expenses } = require("../models");
const Expense = require("../models/expenses.model");
const Expenses = Expense.expenses;


//create and save a new expenses
exports.create = (req, res) => {
  let expense = new Expense(req.body);
  expense.save()
      .then(game => {
          res.status(200).json({ 'expense': 'expense has been added successfully' + expense });
      })
      .catch(err => {
          res.status(400).send("An error has occurred. Unable to add expense to database.");
      });
};
exports.getexpensess = (req, res) => {
  Expense.find(function (err, Expenses) {
    if (err) {
        res.json(err);
    }
    else {
        res.json(Expenses);
    }
});
};
exports.editexpenses = (req, res) => {
    let id = req.params.id;
    Expense.findById(id, function (err, expense) {
        res.json(expense);
    });
};
exports.updateexpenses = (req, res) => {
    Expense.findById(req.params.id, function (err, expense) {
        if (!expense)
            console.log('Could not load document');
        else {
            expense.amount = req.body.amount;
            expense.dateSpent = req.body.dateSpent;
            expense.purpose = req.body.purpose;
            expense.category = req.body.category;
            expense.status = req.body.status;

            expense.save().then(expense => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
};
exports.rejectexpenses = (req, res) => {
    Expense.findByIdAndRemove({ _id: req.params.id }, function (err, expense) {
        if (err) {
            res.json(err);
        }
        else res.json('Successfully removed');
    });
};
exports.getitemexpenses = (req, res) => {
    let itemCount = req.params.itemsCount;
    var removeIdsArray;

    Expense.find(query, fields, { skip: 10, limit: 5 }, function (err, results) {

        return res.json(expenses);
    });
};
exports.approveexpenses = (req, res) => {
    Expense.findById(req.params.id, function (err, expense) {
        if (!expense)
            res.json(err);
        else {
            expense.status = "Approved";

            expense.save().then(expense => {
                res.json('Expense entry has been approved.');
            })
                .catch(err => {
                    res.status(400).send("Unable to approve express entry.");
                });
        }
    });
};