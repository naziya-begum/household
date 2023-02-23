const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const app = express();

const URI = 'mongodb+srv://Ahmed:AhmedBaig@cluster0.zqy7kxw.mongodb.net/householddata?retryWrites=true&w=majority'
mongoose.connect(URI, function () {
    console.log('connected to mongoose');
});
mongoose.set('strictQuery', false);

const dataSchema1 = ({

    Name: String,
    HouseholdHead: String,
    Adhar: Number,
    Gender: String,
    DOB: String,
    Cluster: String,
    PresenWorkingVolunteerName: String,
    Secrateriate: String

});

const DATA = mongoose.model('hhdata1', dataSchema1);




app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
var byName;
app.get('/', function (req, res) {
    DATA.findOne({ Name: byName }, function (err, foundData) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundData);

        }
        DATA.find({}, function (err, found) {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(found.length);
                res.render('data', { names: foundData, name: found });
            }
        })

    })





})

app.post('/', function (req, res) {
    console.log(req.body.name);
    byName = req.body.name;
    res.redirect('/')
})


app.listen(1000, function () {
    console.log("server running on port 1000");
})

