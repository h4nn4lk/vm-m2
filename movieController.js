const express = require('express');
const router = express.Router();
const fs =require('fs');
const {Sequelize, QueryTypes, DataTypes} = require('sequelize')
let sequelize = new Sequelize('sqlite:db.sqlite');

const  Movie= sequelize.define('Movie',{
    name: {
        type: DataTypes.STRING,
        allownull: false,
    },
    year:{
        type: DataTypes.INTEGER,
        allownull: false,
    },
    description:{
        type: DataTypes.TEXT,
    },
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
    
    
},{tabelname:'movies', timestamps: false});

router.get('/',async(req, res) =>{
    let movies = await Movie.findAll();
res.render('movies/index.njk',{ movies: movies});
});
 router.get('/add',(req, res) =>{

     res.render('movies/add.njk'); 
});

 router.post('/add', async(req, res) =>{
    await Movie.create({name:req.body.movie, year:req.body.year, description: req.body.description});
    res.redirect('/movies/')
    });
   


 router.get('/view', async(req, res) => {
    let id = parseInt(req.query.id);
  
    let movie = await Movie.findOne({
        where: {
            id: req.query.id
        }

    })
    res.render ('movies/view.njk', {movie : movie})
});
router.get('/edit/:id',async(req, res) => {
    await Movie.update({name:req.body.movie, year:req.body.year, description: req.body.description},{
        where: {
            id: req.params.id
}
});
 res.redirect('/movies/');
});
router.post('/edit/:id',async (req, res) =>{
    let id = parseInt(req.params.id);
    await sequelize.query(`UPDATE movies
                            SET name= '${req.body.movie}',
                                year= ${req.body.year},
                                description= '${req.body.description}'
                                WHERE id=${id};`,
                            {type: QueryTypes.UPDATE});
    res.redirect('/movies/');
});
router.get('/delete/:id',async(req, res) => {
    await Movie.destroy({
        where:{
            id: req.params.id
        }
    });
    res.redirect('/movies/');
});
module.exports =router;