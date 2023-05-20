const input = document.getElementById('input');

input.addEventListener('submit', function(e){
  alert('login')
  e.preventDefault();


function Login()
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  console.log(email);
  console.log(senha);

});

const {email,senha} = req.body;
let errors = [];
console.log(senha);
if( !email || !senha) {
    errors.push({msg : "Não foi possível encontrar essa conta"})
}




const express = require('express');
const mongoose = require('mongoose');
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');


mongoose.connect('mongodb://localhost/test',{loginNewUrlParser: true, loginUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));


app.set('view engine','ejs');
app.use(expressEjsLayout);

app.use(express.urlencoded({extended : false}));

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(3000); 

const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('script');

router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })

router.post('/login',(req,res)=>{
  })
  
  router.post('/register',(req,res)=>{
    const {email,senha} = req.body;
    let errors = [];
    console.log(email,senha);
    if(!email || senha ) {
        errors.push({msg : "Por favor preencha todos os campos"})
    }

    if(senha !== senha) {
        errors.push({msg : "senhas invalidas"});
    }
    
    if(senha.length < 6 ) {
        errors.push({msg : 'senha deve ter pelo menos 6 caracteres'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        email : email,
        senha : senha})
     } else {
        
       User.findOne({email : email}).exec((err,login)=>{
        console.log(login);   
        if(login) {
            errors.push({msg: 'Email registrado'});
            res.render('register',{errors,email,senha})  
           } else {
            const newLogin = new Login({
                email : email,
                senha : senha
            });
    
           
            script.genSalt(10,(err,salt)=> 
            script.hash(newLogin.senha,salt,
                (err,hash)=> {
                    if(err) throw err;
                        
                        newLogin.senha = hash;
                    newLogin.save()
                    .then((value)=>{
                        console.log(value)
                    res.redirect('/users/login');
                    })
                    .catch(value=> console.log(value));
                      
                }));
             }
       })
    }
    })
router.get('/logout',(req,res)=>{
 })
module.exports  = router;
