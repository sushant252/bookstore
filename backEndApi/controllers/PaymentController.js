
const Transaction = require('../models/Transaction');

async function getTransactions(req, res) {
    try {
        let totalTransactions = await Transaction.countDocuments({});

        let transactions = await Transaction.find({}).skip((req.query.pageNo - 1) *req.query.transactionsPerPage).limit(req.query.transactionsPerPage);

        res.status(200).send({
            data: transactions,
            totalTransactions: totalTransactions
        });

    } catch (err) {
        res.status(400).send({ message: err });
    }
}
async function getTopFiveTransactions(req, res) {
    try {
        let transactions = await Transaction.find({})
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).send({
            data: transactions
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = {
    getTransactions,
    getTopFiveTransactions
};
