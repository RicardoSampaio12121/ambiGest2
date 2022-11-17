'use strict'
const model = require('../models/userModel')
const mongoose = require('mongoose')
const User = mongoose.model('User')


exports.read = async(req, res) => {
     const { username } = req.username

     // Get the user from mongodb
     const user = await User.findOne({username: username}).lean()

     if(!user) return res.status(500).json({auth: false, message: 'There is no user with those credentials.'})

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