const express = require("express");

const bodyParser = require("body-parser");

const ejs = require("ejs");
const lodash = require('lodash');
const jsdom = require('jsdom');
var fs = require('fs');



const {
  JSDOM
} = jsdom;
const {
  window
} = new JSDOM();
const {
  document
} = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var data = fs.readFileSync('Cocktails.json', 'utf8');
var words = JSON.parse(data);



app.get('/', function(req, res) {
  res.render("home", {
    new_card: words
  });
})


app.get('/filter', function(req, res) {
  res.render("filter", {
    new_card: Z
  });
})

app.post('/', function(req, res) {
  var alcohol1 = req.body.Alc
  var taste1 = req.body.Taste
  var type1 = req.body.type


  function type_test(s, a) {
    const type = []
    typ = String(type1)
    words.forEach((item, i) => {
      for (var i = 0; i < item.alcohol.length; i++) {
        for (var j = 0; j < item.taste.length; j++) {
          for (var t = 0; t < item.type.length; t++) {
            if (item.alcohol[i] == a ) {
              if (item.type[t] == typ  ) {
                if (s == item.taste[j]  ) {
                  type.push(item)
                }
              }
            }
          }
        }
      }
    })
    X.push(type);
  }


  function taste_test(s) {
    const taste = []
    tas = String(taste1)
    if(tas=="any"){
      anyTaste_type(s)
    }
    words.forEach((item, i) => {
      for (var j = 0; j < item.alcohol.length; j++) {
        for (var t = 0; t < item.taste.length; t++) {
          if (item.taste[t] == tas) {
            if (item.alcohol[j] == s) {
              taste.push(item)
              type_test(tas, String(item.alcohol[j]))
            }
          }
        }
      }
    })
    X.push(taste);
  }

  // Any Alcohol

  function anyAlchohol_Taste(){
    const taste = []
    tas = String(taste1)
    if(tas=="any"){
      anyTaste_type("any")
    }

    words.forEach((item, i) => {
        for (var t = 0; t < item.taste.length; t++) {
          if (item.taste[t] == tas) {
              taste.push(item)
              anyAlchohol_Type(tas)
        }
      }
    })
    X.push(taste);
  }


  function anyAlchohol_Type(s){
    const type = []
    typ = String(type1)
    words.forEach((item, i) => {
        for (var j = 0; j < item.taste.length; j++) {
          for (var t = 0; t < item.type.length; t++) {
              if (item.type[t] == typ  ) {
                if (s == item.taste[j]  ) {
                  type.push(item)
              }
          }
        }
      }
    })
    X.push(type);
  }

function anyTaste_type(a){
  const type = []
  typ = String(type1)
  words.forEach((item, i) => {
    var j=0;
      //for (var j = 0; j < item.alcohol.length; j++) {
        for (var t = 0,j=0; j < item.alcohol.length,t < item.type.length; j++,t++) {
            if (item.type[t] == typ  ) {
              if (a == item.alcohol[j] || a=="any" ) {
                type.push(item)
            }
        //}
      }
    }
  })
  X.push(type);
}

  var X = new Array();
  if (alcohol1 == "any") {
    anyAlchohol_Taste("any");
  }
  else{
    taste_test(String(alcohol1));
  }

  //console.log(X[0]);
  res.render("filter", {
    new_card: X[0]
  });
})



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
