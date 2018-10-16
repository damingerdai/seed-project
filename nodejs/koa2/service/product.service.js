'use strict'

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('resource/product.json');
const db = low(adapter);
const table = 'products';

db.defaults({
    products: [],
}).write();

const ProductService = exports;

ProductService.list = () => {
    return db.get(table).value();
}

ProductService.get = (id) => {
    return db.get(table).find({ id: id }).value();
}

ProductService.add = (id, name) => {
    db.get(table).push({ id: id, name: name });
}

ProductService.update = (id, name) => {
    db.get(table).find({ id: id }).assign({ name: name });
}

ProductService.merge = (id, name) => {
    if (ProductService.get(id)) {
        ProductService.update({ id: id, name: name });
    } else {
        ProductService.add({ id: id, name: name });
    }
}