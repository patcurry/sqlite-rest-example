const express = require('express');
const router = express.Router();
//const movies = [
//    {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
//    {id: 102, name: "Inception", year: 2010, rating: 8.7},
//    {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
//    {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
//];

const scidata = [
    //    {id: , title: , shorttitle:, contactperson:, involvedscientists:, department:, keywords:, taxon:, study:},

    {id: 101,
     title: "Fish Survey Chumbe Zanzibar",
     contactperson: "Hauke Reuter",
     involvedscientists: "Melanie Klaus",
     department: "Ecological Modelling - Spatial Ecology and Interactions",
     keywords: "Coral reef",
     study: "Field survey"
    },
    {id: 102,
     title: "The influence of seagrass spatial arrangement on fish abundance in Bolinao northern Philippines",
     contactperson: "Werner Ekau",
     involvedscientists: "Joselita Salita",
     department: "Ecology - Algae and Seagrass Ecology",
     keywords: "seagrass",
     study: "Field experiments"
    },
    {id: 103,
     title: "Livelihoods of fishing households on Zanzibar",
     contactperson: "Marion Glaser",
     involvedscientists: "Daniella Ferrol-Schulte",
     department: "Social Sciences - Social-Ecological Systems Analysis",
     keywords: "Social sciences",
     study: "Field survey"
    }
];

//Routes will go here
router.get('/', (req, res) => {
    res.json(scidata);
});

router.get('/:id([0-9]{3,})', (req, res) => {
    const currDat = scidata.filter( dat => {
        if(dat.id == req.params.id) {
            return true;
        }
    });
    if(currDat.length == 1){
        res.json(currDat[0]);
    } else {
        res.status(404);//Set status to 404 as data was not found
        res.json({message: "Not Found"});
    }
});

router.post('/', (req, res) => {
    //Check if all fields are provided and are valid:
    if(!req.body.title ||
       //!req.body.year.toString().match(/^[0-9]{4}$/g) ||
       //!req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
       !req.body.contactperson ||
       !req.body.involvedscientists ||
       !req.body.department ||
       !req.body.keywords ||
       !req.body.study
      ) {
        
        res.status(400);
        res.json({message: "Bad Request"});
    } else {

        //    {id: , title: , contactperson:, involvedscientists:, department:, keywords:, study:},
        const newId = scidata[scidata.length-1].id+1;
        scidata.push({
            id: newId,
            title: req.body.title,
            contactperson: req.body.contactperson,
            involvedscientists: req.body.involvedscientists,
            department: req.body.department,
            keywords: req.body.keywords,
            study: req.body.study
        });
        res.json({message: "New data created.", location: "/scidata/" + newId});
    }
});


/*

  router.put('/:id', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.body.name ||
  !req.body.year.toString().match(/^[0-9]{4}$/g) ||
  !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
  !req.params.id.toString().match(/^[0-9]{3,}$/g)){
  
  res.status(400);
  res.json({message: "Bad Request"});
  } else {
  //Gets us the index of movie with given id.
  var updateIndex = movies.map(function(movie){
  return movie.id;
  }).indexOf(parseInt(req.params.id));
  
  if(updateIndex === -1){
  //Movie not found, create new
  movies.push({
  id: req.params.id,
  name: req.body.name,
  year: req.body.year,
  rating: req.body.rating
  });
  res.json({message: "New movie created.", location: "/movies/" + req.params.id});
  } else {
  //Update existing movie
  movies[updateIndex] = {
  id: req.params.id,
  name: req.body.name,
  year: req.body.year,
  rating: req.body.rating
  };
  res.json({message: "Movie id " + req.params.id + " updated.", 
  location: "/movies/" + req.params.id});
  }
  }
  });

  router.delete('/:id', function(req, res){
  var removeIndex = movies.map(function(movie){
  return movie.id;
  }).indexOf(req.params.id); //Gets us the index of movie with given id.
  
  if(removeIndex === -1){
  res.json({message: "Not found"});
  } else {
  movies.splice(removeIndex, 1);
  res.send({message: "Movie id " + req.params.id + " removed."});
  }
  });
*/

module.exports = router;
