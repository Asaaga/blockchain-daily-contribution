const Member = require('../models/users');
const bcrypt = require('bcryptjs');

exports.postSignIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(password)
  console.log(email)

  Member.findOne({ email }).then((member) => {
    if (!member) {
      req.flash('error', 'invalid email or password');
      return res.redirect('/');
    }
    return bcrypt.compare(password, member.password)
      .then((match) => {
        if (match) {
          req.session.isLoggedIn = true;
          req.session.member = member;
          return req.session.save((err) => {
            console.log(err);
            res.redirect('/dashboard');
          });
        }
        res.redirect('/');
        req.flash('error', 'invalid email or password');
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

exports.getSignIn = (req, res, next) => {
  res.render('login', {
    pageTitle: 'LOGIN',
    path: '/signin',
  });
};

exports.postRegister = (req, res, next) => {
  const firstName = req.body.fname;
  const secondName = req.body.sname;
  const middleName = req.body.mname;
  const occupation = req.body.occupation;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const nextOfKin = req.body.nextOfKin;

  Member.findOne({ email }).then((member) => {
    if (!member) {
      bcrypt.hash(password, 12).then((passwordHashed) => {
        const member = new Member({
          firstName: firstName,
          secondName: secondName,
          middleName: middleName,
          occupation: occupation,
          email: email,
          password: passwordHashed,
          address: address,
          nextOfKin: nextOfKin,
        });
        if (req.file) {
          member.image = req.file.path;
        }
        member
          .save()
          .then(() => res.redirect('/dashboard'))
          .catch((err) => {
            console.log('error ', err);
          });
      });
    } else {
      alert('messsage', 'email already exist');
      req.redirect('/');
    }
  });
};

exports.postLoggedOut = (req, res, next) => {
  return req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
