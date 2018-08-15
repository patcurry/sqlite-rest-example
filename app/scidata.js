const express = require('express');
const router = express.Router();

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




router.put('/:id', function(req, res){
    //Check if all fields are provided and are valid:
    ////    if(!req.body.name ||
    //      !req.body.year.toString().match(/^[0-9]{4}$/g) ||
    //     !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
    //    !req.params.id.toString().match(/^[0-9]{3,}$/g)){
    
    if(!req.body.title ||
       !req.body.contactperson ||
       !req.body.involvedscientists ||
       !req.body.department ||
       !req.body.keywords ||
       !req.body.study ||
       !req.params.id.toString().match(/^[0-9]{3,}$/g)
      ) {
        
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        //Gets us the index of scidata item with given id.
        var updateIndex = scidata.map(function(dat){
            return dat.id;
        }).indexOf(parseInt(req.params.id));
        
        if(updateIndex === -1){
            //Data not found, create new
            scidata.push({
                id: req.params.id,
                title: req.body.title,
                contactperson: req.body.contactperson,
                involvedscientists: req.body.involvedscientists,
                department: req.body.department,
                keywords: req.body.keywords,
                study: req.body.study

            });
            res.json({message: "New data created.", location: "/scidata/" + req.params.id});
        } else {
            //Update existing scidata 
            scidata[updateIndex] = {
                id: req.params.id,
                title: req.body.title,
                contactperson: req.body.contactperson,
                involvedscientists: req.body.involvedscientists,
                department: req.body.department,
                keywords: req.body.keywords,
                study: req.body.study
            };
            res.json({message: "Data id " + req.params.id + " updated.", 
                      location: "/scidata/" + req.params.id});
        }
    }
});

router.delete('/:id', function(req, res){
    var removeIndex = scidata.map(function(dat){
        return dat.id;
    }).indexOf(req.params.id); //Gets us the index of data with given id.
    
    if(removeIndex === -1){
        res.json({message: "Not found"});
    } else {
        scidata.splice(removeIndex, 1);
        res.send({message: "Data id " + req.params.id + " removed."});
    }
});

module.exports = router;
