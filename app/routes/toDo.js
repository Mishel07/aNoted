const router = require('express').Router();
const ToDo = require('../models/toDo.model');

router.route('/add').post(async(req,res) => {
    const username = req.body.username;
    const title = req.body.title;
    const tasks = req.body.description;
    const description={tasks};
    let result=await ToDo.findOne({username:req.body.username,title:req.body.title})
    if(!result){
        const newToDo = new ToDo({username,title,description});
        newToDo.save()
            .then(() => res.json("ToDo added"))
            .catch(err => res.status(400).json("error:"+err));
    }
    else{
        res.json({err:"Title already exist"});
    }
});

router.route('/all/:username').get((req,res)=>{
    ToDo.find({username:req.params.username})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/sortByTitle/:username').get((req,res)=>{
    ToDo.find({username:req.params.username}).sort({title:1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/sortByCreatedDate/:username').get((req,res)=>{
    ToDo.find({username:req.params.username}).sort({createdAt:1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/sortByModifiedDate/:username').get((req,res)=>{
    ToDo.find({username:req.params.username}).sort({updatedAt:-1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/updateTodo').put((req,res)=>{
    const tasks = req.body.description;
    const description={tasks};
    ToDo.findOneAndUpdate({username:req.body.username,title:req.body.title},{username:req.body.username,title:req.body.title,description:description})
    .then((result)=>{
        res.json(result);
        console.log(result);
    })
    .catch((err)=>{
        res.json(err);
    })
})

router.route('/sortByTitle/:userId').get((req,res)=>{
    ToDo.find({user_id:req.params.userId}).sort({title:1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.route('/deleteTodo').delete((req,res)=>{
    ToDo.deleteOne({username:req.body.username,title:req.body.title})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;