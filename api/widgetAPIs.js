'use strict';

let express = require('express');
let router = express.Router();
let widgetConn = require('../models/widgetConnector');
//GET all devices
router.get('/:id', (req, res) => {
    let id = req.params.id;
    if(!id){
        res.statusCode=400;
        res.send("Widget ID must be provided");
    } else{
        widgetConn.getDocument(id).then(data => {
            res.json(data);
        }).catch(e => {
            logger.error("Error while fetching widget: "+e);
            res.statusCode = 500;
            res.send(e);
        });
    }
});
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let object = req.body;
    if(!id || !object){
        res.statusCode=400;
        res.send("Widget ID/data must be provided");
    } else{
        widgetConn.putDocument(id, object).then(data => {
            res.json(data);
        }).catch(e => {
            logger.error("Error while fetching widget: "+e);
            res.statusCode = 500;
            res.send(e);
        });
    }
});
router.post('/', (req, res) => {
    let object = req.body;
    if(!object){
        res.statusCode=400;
        res.send("Data must be provided");
    } else{
        widgetConn.addDocument(object).then(data => {
            res.json(data);
        }).catch(e => {
            logger.error("Error while adding widget: "+e);
            res.statusCode = 500;
            res.send(e);
        });
    }

});

module.exports = router;