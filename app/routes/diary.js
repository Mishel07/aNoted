const router = require('express').Router();
const diary = require('../models/diary.model');

router.route('/add').post((req,res) => { 
    const newDiary = new diary(req.body);
    newDiary.save()
        .then(() => res.json("Notes added"))
        .catch(err => res.status(400).json("error:"+err));
});

router.route('/all/:username').get((req,res)=>{
    console.log(req.params.username);
    diary.find({username:req.params.username})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/searchByDate').post((req,res)=>{
    diary.findOne({username:req.body.username,diary_date:req.body.day})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/updateDiary').put((req,res)=>{
    diary.findOneAndUpdate({username:req.body.username,diary_date:req.body.diary_date},req.body)
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
})

router.route('/deleteDiary').delete((req,res)=>{
    diary.deleteOne({username:req.body.username,diary_date:req.body.diary_date})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;