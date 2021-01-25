const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')
const path = require('path')
var fs = require('fs')

var multer = require('multer');
const uploadPath = path.join('public/uploads')
const imageMimeTypes = ['image/jpeg', 'image/png']
/*var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});*/

//var upload = multer({ storage: storage });

const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

router.get('/', async(req,res)=>{
    try{
    Photo.find({}, (err, photos) => {   
        res.render('allPhotos', { photos: photos });
                  
     })
     }
    catch{
        res.send("error")
    }
   
})

router.get('/search', async(req,res)=>{
    try{
        if(req.body.search!=null){
            photo = await Photo.find().where('category', req.body.search)
            res.render('allPhotos', {photos:photo})
        }
    
        
     }
    catch{
        res.send("error")
    }
   
})

router.get('/new',(req,res)=>{
    res.render('newPhoto',{photo: new Photo()})
})

router.post('/new', upload.single("image"), async(req,res)=>{
    //const tempPath = "public/photos/"+req.file.filename;
    const photo = new Photo({
        img: {
            data: fs.readFileSync(path.join(process.cwd() + '/public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        category: req.body.category
    })
    
    try{

        const newPhoto =  await photo.save()
        res.redirect('/')
    }
    catch{
        
        res.render('newPhoto',{
            photo: photo,
            errorMessage: 'error creating PhotoPost'
        })
    }

})

router.get('/edit/:id', async(req,res)=>{
    try{
        const photo = await Photo.findById(req.params.id)
        res.render('editPhoto',{photo:photo})
    }
    catch{
        res.redirect('/')
    }
    
})
router.put('/edit/:id', upload.single("image"), async(req,res)=>{
    const photo = await Photo.findById(req.params.id)
    photo.category = req.body.category
        if(req.file!=null){
            photo.img.data = fs.readFileSync(path.join(process.cwd() + '/public/uploads/' + req.file.filename))
            photo.img.contentType = 'image/png'
        }
    try{
        console.log(photo)
        const newPhoto =  await photo.save()
        res.redirect('/')
    }
    catch{
        res.render('editPhoto',{photo:photo})
    }
    
})

router.delete('/delete/:id', async(req,res)=>{
    const photo = await Photo.findById(req.params.id)
    try{
        await photo.remove()
        res.redirect('/')
    }
    catch{
        res.send("Couldn't remove post")
    
    }
})
 
module.exports = router