'use strict'
const model = require('../models/userModel')
const mongoose = require('mongoose')
const User = mongoose.model('User')


exports.read = async(req, res) => {
     const { username } = "RicardoSampaio"

     // Get the user from mongodb
     const user = await User.findOne({username: "RicardoSampaio"}).lean()

     // Return user as json
     res.status(200).json(user)
 }

 exports.update = async(req, res) => {
     const username = 'RicardfdsfdsfdsoSampaio'
     const email = 'ricardo_cs@outlook.pt'
     const password = '2862'
     const verified = false
    
     User.create({
         username, password, email, verified
     })
     res.json({status:'ok'})
 }

 exports.delete = async(req, res) => {
    
 }