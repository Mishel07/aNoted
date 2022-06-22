const router = require('express').Router();
let User = require('../models/user.model');
const EmailSend = require('../../email/email');
//bcrypt
const bcrypt = require('bcryptjs')

//responses
const responses = require("../utils/responses")

//validations
const validation = require('../validations/register.validation')

var rn = require('random-number');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const saltRounds = 10;

const tranpoter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
      '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'
    }
  })
);

router.route('/forgotPass').post(async (req, res) => {
  
  try {
    let get_user = await User.findOne({email: req.body.email});
    if(get_user){
      var options = {
            min: 1000,
            max: 9999,
            integer: true
          }
          let otp = rn(options)
      let temp = await EmailSend.sendEmail(req.body.email,otp);
      console.log("Email sent successfully");
      res.status(200).json({ "otp": otp, "user": get_user })
    }
    else 
        return res.status(404).json({ error: "No user found" })
  } catch (error) {

    res.status(500)
      .json({ "error": error })
  }
});

router.route('/resetPass').post(async (req, res) => {
  try {
    let get_user = await User.findOne({username: req.body.username});
    if(get_user){
      bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
        let password = hash;
        User.findOneAndUpdate({username:req.body.username},{password:password})
      .then(user => res.status(200).json({ "msg": "password reset" }))
      .catch(err => res.status(400).json('No user found' + err));
      });
    }
    else{
      return res.status(404).json({ error: "No user found" })
    }
  } catch (error) {
    res.status(500)
      .json({ "error": error })
  }
});


router.route('/login').post(async (req, res) => {
  console.log('hello');
  User.findOne({ username: req.body.username })
    .then(user => {
      console.log(user);
      if (!user)
        return res.status(404).json({ error: "No user found" })
      else {
        bcrypt.compare(req.body.password, user.password, (error, result) => {
          if (error)
            return res.status(500).json(error)
          else if (result)
            return res.status(200).json(user)
          else
            return res.status(403).json({ error: "Password is incorrect" })
        })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.route('/register').post(async (req, res) => {
  console.log("hello");
  try {
    console.log(req.body);
    console.log('call');
    // let validate = await validation(req.body);

    // if (validate.error) {
    //   return responses.badRequestResponse(
    //     res,
    //     validate.error.details[0].message
    //   );
    // }

    let user = await User.findOne({
      $or: [
        {
          username: req.body.username
        }, {
          email: req.body.email
        }
      ]
    });
    console.log(user)
    if (user) {
      return responses.badRequestResponse(res, { err: "user Already exists." })
    }
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash_password

    let new_user = await User.create(req.body)
    res.json({ status: 'ok', username: req.body.username })
    console.log(new_user);
    if (!new_user) {
      return responses.serverErrorResponse(res, "Error while creating user.")
    }
    console.log("hello")
    return responses.successfullyCreatedResponse(res, new_user)
  }
  catch (error) {
    console.log(error)
    return responses.serverErrorResponse(res)
  }
});

router.route('/:username').get((req, res) => {
  User.find({ username: req.params.username })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error' + err));
});

router.route('/updateUser/:id').put(async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error' + err));
})

router.route('/deleteUser/:id').delete((req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;