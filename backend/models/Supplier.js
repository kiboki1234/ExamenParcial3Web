const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    idSaller: { type: String, required: true },
    suplierPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    totalSale: { type: Number, required: true }
});

module.exports = mongoose.model('Supplier', SupplierSchema);
