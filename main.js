const express=require('express');
const app= express();

const mongoose=require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://nihal_kv:Knit20234@cluster0.rbvj59r.mongodb.net/results');
}

const registerSchema = new mongoose.Schema({
    roll: Number,
    name: String,
    prevMarks: Number,
    curMarks: Number,
    backs: Number
  });

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number,
    email: String,
    address: String,
    concern: String
});



const newResult = mongoose.model('newResult', registerSchema);
const Contact = mongoose.model('Contact', contactSchema);


app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));

app.set('view engine','ejs');

app.post('/result',(req,res)=>{
    let entry= new newResult(req.body);
    entry.save().then(()=>{
        console.log("saved to database");
    })

    const {roll, name, prevMarks, curMarks, backs}=req.body;
    res.render('result',{roll, name, prevMarks, curMarks, backs});
    // console.log(req.body);
})

app.post('/nci',(req,res)=>{
  let myData=new Contact(req.body);
  myData.save().then(()=>{
      console.log("saved to database");
  });
  const {name, number, email, address, concern}= req.body;
  res.render('form', {name, number, email, address, concern});
  // console.log(req.body);
})

app.get('/student',(req, res)=>{
  newResult.find({}).then((data)=>{
      res.render('student',{data})
  })
  
})

app.get('/student/:id',(req,res)=>{
  const {id}= req.params;
  newResult.findById(id).then((data)=>{
      res.render('studentDetails', {data});
  })
  
})

app.listen(3000, ()=>{
    console.log("listening on port 3000");
})