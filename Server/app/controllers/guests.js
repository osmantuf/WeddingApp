var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Guest = mongoose.model('Guest'),
    asyncHandler = require('express-async-handler');

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/guests', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all Guest List');
        let query = Guest.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));


    router.get('/guests/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get Guest %s', req.params.id);
        await Guest.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));


    router.post('/guests', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating Guest');
         var guest =  new Guest(req.body);
           const result = await guest.save()
              res.status(201).json(result);
    }));



    router.put('/guests', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating To Do');
        await Guest.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/guests/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting To Do %s', req.params.id);
        await Guest.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));



};