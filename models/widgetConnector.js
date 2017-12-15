'use strict';
const widgetdb = require('widgetdb');
const uuidV4 = require('uuid/v4');
class WidgetConnector {
    constructor() { }
    /**
     * 
     * @param {*} id : id of the db document to be fetched
     */
    getDocument(id) {
        return widgetdb.get(id);
    }
    /**
     * 
     * @param {*} object : object to be added to db
     */
    addDocument(object) {
        let id = uuidV4();
        console.log("UUID generated: " + id);
        return new Promise((resolve, reject) => {
            this._addOrUpdateDocument(id, object).then(data => {
                let returnObject = {
                    'id': id,
                    'object': data
                };
                resolve(returnObject);
            }).catch(e => {
                console.error("Error while adding document: " + e);
                reject(e);
            });
        })
        return;
    }
    putDocument(id, object) {
        return new Promise((resolve, reject) => {
            this.getDocument(id).then(data => {
                if (data) {
                    this._addOrUpdateDocument(id, object).then(data => {
                        resolve(data);
                    });
                } else {
                    reject(new Error("No document found for give id: " + id));
                }

            }).catch(e => {
                console.error("Error while updating document: " + e);
                reject(e);
            });
        });
    }
    _addOrUpdateDocument(id, object) {
        return widgetdb.put(id, object);
    }
};
module.exports = new WidgetConnector();