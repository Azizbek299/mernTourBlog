const { default: mongoose } = require("mongoose");
const TourModel = require("../models/tourModel");



exports.createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModel({ ...tour, creator: req.userId }); //  req.userId га   authMiddleware  ни ичида дата бириктирилган

  try {
    await newTour.save();
    return res.status(201).json(newTour);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};

exports.getTours = async (req, res) => {
  const {page} = req.query
  try {
    // const tours = await TourModel.find();      //  Бу код барча сахифани курсатар эди пагинациясиз
    // return res.status(200).json(tours);

    const limit = 6
    const startIndex = (Number(page) - 1) * limit
    const total = await TourModel.countDocuments({})                      //  count га ухшаш ичида нечта пост борлигини курсатиб беради
    const tours = await TourModel.find().limit(limit).skip(startIndex)    //  skip(3)  та постни сакраб ( ташлаб ) утиб кетади 

    return res.json({
      data: tours,
      currentPage:Number(page),
      totalTours:total,                                           
      numberOfPages: Math.ceil(total / limit)                     //  numberOfPages  Нечта сахифа борлигини курсатади  Мисол: 18 та булса  limit = 6  ( 18 / 6 ) = 3  та сахифа ,  
    })                                                            //  Хар бир сахифада 6 тадан пост

  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};


exports.getTour = async (req, res) => {                                     //  For Detail page
  const { id } = req.params;
  try {
    const tour = await TourModel.findById(id);
    return res.status(200).json(tour);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};



exports.getTourByUser = async(req, res) => {          //  Факат аник бир юзерга тегишли булган постларни курсатади
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {    //  Шунака id борми дегани (true еки false)  кайтаради
    return res.status(404).json({message: 'User does not exist'})
  }

  const userTour = await TourModel.find({ creator:id })
  return res.status(200).json(userTour)
}


exports.deleteTour = async(req, res) => {
  const {id} = req.params

  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {    //  Шунака id ли   tour хакида езилган пост борми дегани (true еки false)  кайтаради
      return res.status(404).json({message: 'No tour exist with id: ' + id })
    }
  
    await TourModel.findByIdAndRemove(id)
    return res.json({message: 'Tour deleted successfully '})
    
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
}


exports.updateTour = async(req, res) => {
  const {id} = req.params
  const {title, description, creator, imageFile, tags} = req.body

  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {    //  Шунака id ли   tour хакида езилган пост борми дегани (true еки false)  кайтаради
      return res.status(404).json({message: 'No tour exist with id: ' + id })
    }

    const updatedTour = {
      creator,
      title,
      description,
      tags, 
      imageFile,
      _id:id
    }

    await TourModel.findByIdAndUpdate(id, updatedTour, {new: true})
    return res.json(updatedTour)
    
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
}


exports.getToursBySearch = async(req, res) => {             //  Search  да излаган title ни курсатиб беради
  const {searchQuery} = req.query
  try {
    const title = new RegExp(searchQuery, 'i')
    const tours = await TourModel.find({title})
    return res.json(tours)
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
}



exports.getToursByTag = async(req, res) => {          //  Суралган Tag лар тупламини курсатиб беради
  const {tag} = req.params                            //  req.params  Запрос браузерни url сидан келади  (сабаби у get , post эмас , post ники body дан келади)
  try {
    const tours = await TourModel.find({tags: {$in: tag}})
    return res.json(tours)
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
}




exports.getRelatedTours = async(req, res) => {                          //  Суралган Tag лар тупламини курсатиб беради
  const tags = req.body                                              //  Запрос  axios оркали post булиб келгани учун маълумотни ( аргументни )   body дан оламиз
  try {
    const tours = await TourModel.find({tags: {$in: tags}})
    return res.json(tours)                                              //  Ва у суралган tag даги маълумотларни Front-End га жунатади ,  Front-End булса келган барча маълумотларни 
  } catch (error) {                                                     //  redux ни ичига туплайди ва браузерда юзерга сиз кизикан нарсалар деб худди youtube ни библиотека сига ухшатиб 
    return res.status(404).json({ message: "Something went wrong" });   //  маълумотларни браузерни пастги ойнасида курсатиб беради
  }
}




exports.likeForTour = async(req, res) => {      //  Факат auth булган юзерлар like боса олади

  const {id} = req.params                       //  Tour ни id исини оляпти

  try {
    if (!req.userId) {                            //   Юзер auth булганми ?
      return res.json({message: 'User is not authenticated'})
    }
  
    if (!mongoose.Types.ObjectId.isValid(id)) {    //  Шунака id ли   tour хакида езилган пост борми дегани (true еки false)  кайтаради
      return res.status(404).json({message: 'No tour exist with id: ' + id })
    }
  
    const tour = await TourModel.findById(id)
  
    const index = tour.likes.findIndex((id) => id === String(req.userId))
  
    //console.log('index', index) 
  
    if (index === -1) {                 //  if do not have same user
      tour.likes.push(req.userId)
    }else {                             // if the same user clicks on button then we decrease
      tour.likes = tour.likes.filter((id) => id !== String(req.userId))
    }
  
    const updatedTour = await TourModel.findByIdAndUpdate(id, tour, {new:true})
    return res.status(200).json(updatedTour)
    
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }  
}