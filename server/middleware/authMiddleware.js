const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'test'

exports.auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500                    //  Оддий токен булса 500 тадан кам булади Google ники 500 тадан купрок булади
        let decodedData
        
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret)
            req.userId = decodedData?.id                           //  req.userId  га маълумот бириктирамиз уни браузерда тортиб олсак булади     
            next()
        } else {
            decodedData = jwt.decode(token)
            const googleId = decodedData?.sub.toString()
            const user = await userModel.findOne({ googleId })
            req.userId = user?._id                                //  req.userId  га маълумот бириктирамиз уни браузерда тортиб олсак булади
            next()
        }
    } catch (error) {
        console.log(error) 
    }
}



