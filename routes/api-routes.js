const db = require('../models');
var cors = require('cors');

module.exports = function (app) {

  app.use(cors({origin: '*'}));

  app.get('/api/knowtes', function (req, res) {
    db.Knowtes.find({}, 'title subject body fromUserId createdAt').populate("fromUserId").sort({createdAt: 'desc'}).then(function (knowtes, err) {
        if(!err && knowtes.length > 0) {
          res.json(knowtes);
        } else {
          console.log("No Knowtes Found");
          res.json({});
        }
      })
  });
  
  app.get('/api/comments', function (req, res) {
    db.Comments.find({}, 'body createdAt fromUserId toKnowtesId').populate("fromUserId").populate("toKnowtesId")
      .then(function (comments, err) {
        if(!err && comments.length > 0){
          console.log(comments);
          res.json(comments);
        } else {
          console.log(err);
          console.log("No Comments Found");
          res.json({});
        }
      })
  });

  app.get('/api/Login/:username/:password', function (req, res) {
    db.User.find({ username: req.params.username, password: req.params.password }, '_id username')
      .then(function (data) {
        if(data) {
          res.json({
             isLoggedIn: true,
             id: data[0]._id,
             currentUser: data[0].username
          });
        } else {
          res.json({ isLoggedIn: false });
        }

      })
      .catch(function (error) {
        console.log(error);
        res.json({ error: error });
      }); 
  });

  app.post('/api/SignUp/:uname/:psw', function (req, res) {
    db.User.create({ username: req.params.uname, password: req.params.psw })
      .then(function (data) {
        console.log(data);
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false });
      });
  });

  app.post('/api/knowtes/:title/:subject/:body/:fromUserId', function (req, res) {
    db.Knowtes.create({ title: req.params.title, subject: req.params.subject, body: req.params.body, fromUserId: req.params.fromUserId })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.post('/api/comments/:body/:fromUserId/:toKnowtesId', function (req, res) {
    db.Comments.create({ body: req.params.body, fromUserId: req.params.fromUserId, toKnowtesId: req.params.toKnowtesId })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.put('/api/editKnowte/:id/:title/:subject/:body', function(req, res) {
    db.Knowtes.update({ _id: req.params.id}, { $set: { "title": req.params.title, "subject": req.params.subject, "body": req.params.body } }, {upsert:true})
    .then(function (data){
      res.json(data);
    })
    .catch(function(err){
      res.json(err);
    })
  })

  

  
  app.put('/api/editComment/:id/:body', function(req, res) {
    console.log(req.params.id);
     console.log(req.params.body);
     db.Comments.update({_id: req.params.id }, { $set: { "body": req.params.body } })
     .then(function (data){
       console.log(data);
       res.json(data);  
     })
     .catch(function(err){
       console.log(err);
       res.json(err);
     })
   })


  app.delete("/api/deleteKnowtes/:id", function (req, res) {
    db.Knowtes.findByIdAndRemove({_id: req.params.id})
      .then(function (response){
        if (response) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
      })
      .catch(function (error){
        console.log(error);
      })
  });

  app.delete("/api/deleteComments/:id", function (req, res) {
    db.Comments.findByIdAndRemove({ _id: req.params.id})
      .then(function (response){
        if (response) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
      })
      .catch(function (error){
        console.log(error);
      })
  });

}