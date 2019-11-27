// Require Express , Cookie Parser, Session
const express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// Require Body Parser
const bodyParser = require('body-parser');
// Require Mongoose
const mongoose = require('mongoose');
// Require Path
var path = require('path');
// Require Cors
var cors = require('cors');
//Require Axios
var axios = require('axios');
//Require FileSystem
var fs = require('fs');
var csv = require('csv-parser')
//Require Json to CSV parser using Async Method & not Synchronous! because of Big Data ;-)
const { parseAsync } = require('json2csv');
//Require Json to CSV parser using Synchronous Method & not Asynchronous! because of Small Data ;-)
const { Parser } = require('json2csv');

// require and load dotenv
require('dotenv').load();
const mysql = require('mysql')

const multer = require('multer')

//Parse the Page here...
var ParsePage = require('./classes/parsepage')

const credentials = require('./credentials.json')
const {curl1, curl2, curl3, curl5, curl6 , curl7, dbuname, dbpass, dbname} = credentials

var curl4 = 'session-id=140-9368975-4546557; session-id-time=2082787201l; ubid-main=131-6990987-2536233; aws-priv=eyJ2IjoxLCJldSI6MCwic3QiOjB9; aws_lang=en; aws-target-static-id=1572988998888-358221; aws-target-data=^%^7B^%^22support^%^22^%^3A^%^221^%^22^%^7D; s_fid=0373E76136381E36-28858D3FC0E8A5FC; s_cc=true; aws-mkto-trk=id^%^3A112-TZM-766^%^26token^%^3A_mch-aws.amazon.com-1572989015909-60603; s_eVar60=ha^%^7CAdoption_Campaign_pac-edm-2019-lightsail-sitemerch-adoption-ftvistors^%^7Cawssm-1527^%^7Cribbon^%^7Cha_a131L000005uLb7QAE^%^7Eha_awssm-1527; s_sq=^%^5B^%^5BB^%^5D^%^5D; aws-business-metrics-last-visit=1572989177016; aws-ubid-main=334-6868414-7737724; regStatus=registered; s_vn=1604524999428^%^26vn^%^3D2; c_m=undefinedwww.google.comSearch^%^20Engine; aws-target-visitor-id=1572988998900-924698.26_17; s_dslv=1572993754706; s_nr=1572993754716-Repeat; aws-userInfo=^%^7B^%^22arn^%^22^%^3A^%^22arn^%^3Aaws^%^3Aiam^%^3A^%^3A839599842255^%^3Aroot^%^22^%^2C^%^22alias^%^22^%^3A^%^22^%^22^%^2C^%^22username^%^22^%^3A^%^22LoyGreat^%^22^%^2C^%^22keybase^%^22^%^3A^%^229^%^2FWH5^%^2FbxothR86XwfQdy6A8fRdgXplzKn6kXGLgyg^%^2BQ^%^5Cu003d^%^22^%^2C^%^22issuer^%^22^%^3A^%^22http^%^3A^%^2F^%^2Fsignin.aws.amazon.com^%^2Fsignin^%^22^%^7D; skin=noskin; x-main=^\^"DCrWHpwGQPVdZY8MbL52F4UZ95S6IGj7^@wmJ32n9AKfWAGlRJIni?bSmS7tTZCrb^\^"; at-main=Atza^|IwEBIG7bOUxMLqSlLxNxQ9VP8xlvZMbBJhyRzHh_n-uiIVjWkNKB1eFSrpsnuzfi4HPXUBRZ3iyJ4P7pbW8QmhsahRc1quEqg9NwD66lxxDxWn-SovN4454wBOEWzanmz6rebjrwOY-8l8iO2Jv9w_Kn_qZBYBzsDnw_FmkfwnOTuT06JMgHiYLA5cWnkN9_vxaH2ntqfINq37N_m_dUaTiQoT2gFTtxDEL7RT4WMl_IaAbHls2lZNXA3-MpEGYkbp2rWCjEj6tp5Uh8sHEQ8baNcnHYR2kdihggd3AgTsoxjmYjlpwPd0mL7grlvROdDdhF1IdY4gq3IW9hRsPgRfV5p7OYKJd27w3c3_3kThZ4NZhyn_H1DW-KVObgILAw0ePSiLZZD20Q2A3wxQkl2FpN7xfnQJOb2BxFEwpAyAyPU5eyZGa5qWrroJS_vask5lyHSu0; sess-at-main=^\^"AhdIBBrAQk3tbI5LTjhBiLZK8RBeBARwizBxFgg3Od4=^\^"; sst-main=Sst1^|PQH0paavEnITbFdFBe3KYb_sC3jDuOO9kXBqHFY_W3jqlxfBK_xfs3sW4nWhSEp_GRTjPpJxeTc9AFgFpAIKG5N9_vIkfmCfheA60FjV7tLN5Zd2QIdhMqyetZpfP_9OJrLz5hzGJXNRYG8JOKXAEvdGq78-eUZdV1kQhbi18GowHttGDN5766-kteR9CZcS_OKeys7wIX181X0J3qDz1CHOqczb9hOdwjgFbpVhz8_4AonIPdgfQ6iUxmy72j7adq9-TJNgkL-3w5SkXtprRshhrPjd4KGFQlx1_yU7T1zzcbT42B_xmi-QfP-gWi5hGa6-yQuT1R64kf9mOUFYm68b2A; lc-main=en_US; i18n-prefs=USD; sp-cdn=^\^"L5Z9:NG^\^"; x-wl-uid=1AGMFjWdPtorEgJQE6Ht8cX9cGYCR3JSjx449WoECRFzdF+cBBREE6dkFVAw2TfRPkfnltTCdhB659U/mjOITsgLBiQmNYHAH8EDgSgAYoGI4tXNWTIVqv0wxP3f3PokBLAh13sB+EzA=; session-token=ZYszeASCqtPmVfwdy6uf/0jrGoxCa/JvCwruaKnzcdbE/9D6b9+7v9r+dmzq8RlbGpG2mO/jXxVdJGzdnvFKylCyf85ep2eRMcihM7J5LHNd9DvwEmhZKTgf1K00+Rmbf62epQFvVaxV82u9WRPDAX0PA0ALgcX/B9s4PTQyEpvI4wvp7EhtPe6uO83D3MhfOU9Gmmvv6qlh7qIe8/9UkTAkFJN1tUkRCWyBW2RDIeFHhzekvwy/NU6Q2N/YWGDbWqeQ08TR4KYYoGyb9hJINw==; csm-hit=tb:s-DM5PPKG9SJ76N876HVBA^|1574089359475^&t:1574089359475^&adb:adblk_no' ;

///////////////////////////////////////
// COnnection to MySql
var con = mysql.createConnection({
  host: "localhost",
  user: dbuname,
  password: dbpass,
  database: dbname
});

var pausepoll = false;

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Mysql database!");
});

const PORT = process.env.PORT || 5000

//Instantiating our App
const app = express()

//Require SOcket.io + HTTP to transmit synchronous Values to client
var http = require('http').Server(app)
var io = require('socket.io')(http);

io.on('connection', () => {
  console.log('A User is connected')
 })

 io.on('message', (message) => {
 // console.log('A User is connected')
    if (message === "stoporstart"){
      pausepoll = !pausepoll;
      if (!pausepoll){
        io.emit('taskcomplete', JSON.stringify({ status: 'stop' }));
      }
      if (pausepoll){
        io.emit('taskcomplete', JSON.stringify({ status: 'pages' }));
        io.emit('taskcomplete', JSON.stringify({ status: 'continue' }));
      }
    }
 })

app.use(cookieParser());
app.use(session({name: '_steve_demo', secret: "stevelebel", cookie: { maxAge: 60000 } }));
app.use(express.static('public'));
// Use Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next){
  res.setTimeout(12000000, function(){
    res.render('404');
  });
      next();
});

// Setting our Template Engine View to EJS
app.set('view engine', 'ejs');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

var sql = `SELECT * FROM search WHERE id = 1 `;
var bf = null; 
var ky = null;
var bfstring = null;
var kystring = null;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function setVar(bf_, ky_){
  bf = bf_;
  ky = ky_; 
}

//will be using this for uplading
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'book', maxCount: 1 }, { name: 'keyword', maxCount: 1 }])

app.post('/testUpload', cpUpload, async function(req,res) { 
  console.log('storage location is ', req.hostname +'/' + req.files['keyword'][0].path);
  //backURL=req.header('Referer') || '/';

  con.query(sql, function (err, result) {
    if (err) throw err;
    
    setVar (`<a href='/read-bookfile/${result[0].bookfile}'> Download Book (.CSV) </a>`, `<a href='/read-kyfile/${result[0].keywordfile}'> Download Keyword (.CSV) </a>`);
  
    console.log("1 record selected right now" + bf);
  });
 
    await sleep(600)
    var sqlq = `UPDATE search SET keywordfile = '${req.files['keyword'][0].filename}' , bookfile = '${req.files['book'][0].filename}' WHERE id = 1 `;
    con.query(sqlq, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted right now");
    });
  
    res.render('index', {uploaded: 1, bookfile: bf , kwordfile: ky });  
  
})

app.get('/read-bookfile/:path', function(req, res) {
  const dpath = req.params.path;
   //var file = "./public/upload/"+dpath;
   var file = path.resolve(__dirname, 'public/uploads/'+dpath)
   res.download(file) ;
}); 

app.get('/read-kyfile/:path', function(req, res) {
  const dpath = req.params.path;
   //var file = "./public/upload/"+dpath;
   var file = path.resolve(__dirname, 'public/uploads/'+dpath)
   res.download(file) ;
}); 

app.get('/read-resultfile/:path', function(req, res) {
  let buff = new Buffer(req.params.path, 'base64');
  let text = buff.toString('ascii');
   //var dpath = atob(req.params.path);
 //  var dpath2 = dpath.replace('+','/')
 // var dpath2 = dpath2.replace('*','.')
 // var file = "./public/upload/"+dpath;
  var file = path.resolve(__dirname, text)
  res.download(file) ;
}); 

// Getting our Root URL
app.get('/', async function (req, res) { 
  con.query(sql, function (err, result) {
    if (err) throw err;    
    setVar (`<a href='/read-bookfile/${result[0].bookfile}'> Download Book (.CSV) </a>`, `<a href='/read-kyfile/${result[0].keywordfile}'> Download Keyword (.CSV) </a>`);  
  }); 
  await sleep(600)
  res.render('index',  {uploaded: null, bookfile: bf , kwordfile: ky });

})

// Getting our Root URL
app.get('/loadresult', async function (req, res) { 
  var sqlx = "SELECT * FROM results"
  con.query(sqlx, function (err, result) {
    if (err) throw err;    
   
    res.json(result);
   });  

})
////////////////////////////////////////////////////
///
/*app.post('/changeurl', function (req, res) {
  let val = { theurl: req.body.cname, thekeyword: req.body.kname  };
  
})*/
var totaldatax = 0; 
var curdata = null; 
////////////////////////////////////////////////////
///
//
app.post('/polldata', async function (req, res) {
  var jobid = "result_"+Date.now();
  
  var search = req.body.search;
  var pagesnum = Number(req.body.maxpages);
  console.log(search);
  //,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
 //ABCDEFGHIJKLMNOPQRSTUVWXYZ
   
  let pages = Array.from({length: pagesnum}, (v, k) => k+1);
  var resultsbooks = []
  var resultskeyword = []
  var bookfile = null
  var keywordfile = null    
 
  con.query(sql, function (err, result) {
    if (err) throw err;
      bfstring = result[0].bookfile;
      kystring = result[0].keywordfile;

       //get the Current Book & Keyword file
      bookfile = path.resolve(__dirname, 'public/uploads/'+bfstring)
      keywordfile = path.resolve(__dirname, 'public/uploads/'+kystring)
  });

   await sleep(600)
   //Read the Book file (.csv)
   fs.createReadStream(bookfile)
   .pipe(csv())
   .on('data', (data) => resultsbooks.push(data))
   .on('end', () => {
     console.log(resultsbooks);
   });

   //Read the Keyword file (.csv)
   fs.createReadStream(keywordfile)
   .pipe(csv())
   .on('data', (data) => resultskeyword.push(data))
   .on('end', () => {
     console.log(resultskeyword);
   });  
  
   await sleep(600)
    //thefinalurl =  "https://www.amazon.com/s?k=young+adult+fantasy&i=digital-text"
   // thefinalkeyword = url.thekeyword
   var dirx1 = `./public/uploads/${jobid}`;

  if (!fs.existsSync(dirx1)){
      fs.mkdir(dirx1, function (err) {
        if (err) {
            console.log('failed to create directory', err);
        }
      });
  }

  var dirx = `./public/uploads/${jobid}/${search}`;

  if (!fs.existsSync(dirx)){
    fs.mkdir(dirx, function (err) {
      if (err) {
          console.log('failed to create directory', err);
      }
    });
  }

    console.log(JSON.stringify(pages))
    var cursorTasks = 0     
      var datax = [];
      for (let page of pages) {
          await sleep(100)         
          
          for (let book of resultsbooks) {
              await sleep(200)
              console.log("1st Book Object title: " + book.name);
             
              for (let keyword of resultskeyword) {
                let doi = { page: page, bookname: book.name, keyword: keyword.name, type: search }
                datax.push(doi)                
              }   
            
          }

      }
    
    /* const textnow = datax.map(JSON.stringify).reduce((prev, next) => `${prev}\n${next}`);
  
      fs.writeFile(`./public/uploads/${utc_date}/${search}/datawrite.csv`,textnow, function(err) {
        if(err) console.log(err)
      }) */

      await sleep(800) 

      var dira = `./public/uploads/${jobid}/${search}/htmlrank`;
 
      if (!fs.existsSync(dira)){
          fs.mkdir(dira, function (err) {
            if (err) {
                console.log('failed to create directory', err);
            }
          });
      }

    //  var promises = [];

      var totaldatax = datax.length; 
      var foundarray = [];
   
      let ik = 0;
      for (d of datax){
        io.emit('taskcomplete', JSON.stringify({ status: 'pages' }));
        let doi2 = await resolvebooksandkeywords(d.page, d.bookname, d.keyword, search);       
       // const textnow = doi2.map(JSON.stringify).reduce((prev, next) => `${prev}\n${next}`);
        await sleep(1200)
        //find the rank 
     //   let found = doi2.find(o => o.book ===  d.bookname);
     //   console.log("Found a match: "+ JSON.stringify(found))
      
        totaldatax = totaldatax - 1
        let percentage = ((datax.length - totaldatax) / datax.length) * 100;        
        io.emit('status', JSON.stringify({ page: d.page, bookname: d.bookname, keyword: d.keyword, percent: Math.round(percentage) }));

        await sleep(1200)

        for (d2 of doi2){
           // add to general result
           var attach = "";
           if (d2.link !== undefined){
              var link =  d2.link;         
              console.log("Link to : "+ link)
              var sea = link.split("/");  
              
              if(sea[2].match("^[a-zA-Z0-9]*$")){
                attach = "--Ebook";
              }
              else {
                attach = "--Print";
              } 
          }           
          
          if (d2.book === d.bookname){
              await sleep(800)
              io.emit('taskcomplete', JSON.stringify({ status: 'save' }));
              console.log("Found a match: "+ JSON.stringify(d2))
              let body = { Department: search, Search: d2.keyword, Bookname: d2.search + attach, Status: "Found", Page: d2.page, Rank: (Number(d2.rank) + 1) }
              foundarray.push(body)
          }
          else{
               // add to general result
               await sleep(800)
               io.emit('taskcomplete', JSON.stringify({ status: 'notfound' }));
               let body = { Department: search, Search: d2.keyword, Bookname: d2.search + attach, Status: "Not Found", Page: d2.page, Rank: (Number(d2.rank) + 1) }
               foundarray.push(body)
          }
        }

      
        ik++
      }
      /////////////////////////////
      if (foundarray.length > 0){
          const fields = ['Department', 'Search', 'Bookname', 'Status', 'Page', 'Rank'];
          const opts = { fields };
          parseAsync(foundarray, opts)
            .then(csv => {           
              fs.writeFile(`./public/uploads/${jobid}/${search}/htmlrank/result.csv`, csv, function (err) {
                if (err) {
                    return res.json(err).status(500);
                }
                console.log(" CSV has been saved ");
                })
              }).catch(err => console.error(err));
      }

      await sleep(800)

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var CurrentDateTime = date+' '+time;

      var sqlq = `INSERT into results (dept, _date, bookfile, keywordfile, result) VALUES ( '${search}' , '${CurrentDateTime}' , '${bfstring}' , '${kystring}' , "public/uploads/${jobid}/${search}/htmlrank/result.csv" ) `;
      con.query(sqlq, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted right now");
      });

      console.log("Now to write the file sample...")
 
      console.log("Complete...")

      io.emit('taskcomplete', JSON.stringify({  status: 'complete' }));
      
      await sleep(3000) 
      totaldatax = 0; var curdata = null; 
 
      res.redirect('/');  
})

async function resolvebooksandkeywords(page, book, keyword, search){

  var attachpage = "&page="+ page;
  var attachsearch = "" ;
  var replaced = keyword.split(' ').join('+');
  if( search === "Ebook" ) { 
    attachsearch = "&i=digital-text" ;
  } 
  else if ( search === "book"){
    attachsearch = "&i=stripbooks-intl-ship";
  }
  var url = "https://www.amazon.com/s?k=" + replaced 

  var response = await axios.get(url + attachsearch + attachpage, {
      port: 80,
      headers: {        
        'sec-fetch-mode': curl1,
        'accept-encoding': curl2,
        'accept-language': curl3,
        'accept': curl5,
        'authority': curl6 ,
        "user-agent": curl7   
      }
  });
  var obj = await ParsePage.parseAmazonPage(response.data, book, page, keyword);
  return obj;
}

// Server Port
http.listen(PORT, () => console.log(`Listening on ${ PORT }`))