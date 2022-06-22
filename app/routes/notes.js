const router = require('express').Router();
let Notes = require('../models/notes.model');

router.route('/add').post(async(req,res) => { 
    let result=await Notes.findOne({username:req.body.username,title:req.body.title})
    console.log(result);
    if(!result){
        const newNote = new Notes(req.body);
        newNote.save()
            .then(() => res.json("Notes added"))
            .catch(err => res.status(400).json("error:"+err));
    }
    else{
        res.json({err:"Title already exist"});
    }
});

router.route('/all/:username').get((req,res)=>{
    console.log(req.params.username);
    Notes.find({username:req.params.username}).sort({createdAt:-1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/searchByTitle/:userId/:title').get((req,res)=>{
    Notes.find({user_id:req.params.userId,title:req.params.title})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/updateNotes').put((req,res)=>{
    Notes.findOneAndUpdate({username:req.body.username,title:req.body.title},req.body)
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
})

router.route('/sortByTitle/:username').get((req,res)=>{
    Notes.find({username:req.params.username}).sort({title:1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/sortByCreatedDate/:username').get((req,res)=>{
    Notes.find({username:req.params.username}).sort({createdAt:1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/sortByModifiedDate/:username').get((req,res)=>{
    Notes.find({username:req.params.username}).sort({updatedAt:-1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/deleteNotes').delete((req,res)=>{
    Notes.deleteOne({username:req.body.username,title:req.body.title})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;