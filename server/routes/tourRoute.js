const express = require("express");
const {
  createTour,
  getTours,
  getTour,
  getTourByUser,
  deleteTour,
  updateTour,
  getToursBySearch,
  getToursByTag,
  getRelatedTours,
  likeForTour,
} = require("../controllers/tourController");

const router = express.Router();
const { auth } = require("../middleware/authMiddleware");



router.get("/userTours/:id", auth, getTourByUser);              //  Факат шу юзерни постлари чикади узи куриши учун кайсиларни пост килган эканман деб
router.post("/", auth, createTour);                             //  For create post
router.patch("/:id", auth, updateTour);                         //  For Update post
router.patch("/like/:id", auth, likeForTour);                   //  For clicking like
router.delete("/:id", auth, deleteTour);                        //  For Delete post

router.get("/", getTours);

router.get("/search", getToursBySearch);                        //  For search query
router.get("/tag/:tag", getToursByTag);                         //  Search  by tag
router.post("/relatedTours", getRelatedTours);                  //  Как youtube ни библиотекаси га ухшатиб сиз кизикан нарсалар дейиш учун
                                                                //  Курган нарсаларини тупламини браузерни пастги ойнасида курсатиб беради

router.get("/:id", getTour);                                    //  For Detail page

module.exports = router;
