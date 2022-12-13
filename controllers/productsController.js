let products = require('../data/simulated_database')
const express = require('express')
const controller = express.Router()

const ProductSchema = require('../schemas/productSchema')

controller.param("articleNumber", (req, res, next, articleNumber) => {
    req.products = products.find(x => x.articleNumber == articleNumber)
    next()
})
controller.param("tag", (req, res, next, tag) => {
    req.products = products.filter(x => x.tag == tag)
    next()
})

controller.route('/details/:articleNumber').get((req, res) => {
    if(req.product != undefined)
        res.status(200).json(req.product)
    else
        res.status(404).json()
})

controller.route('/:tag').get((req, res) => {
    
    if(req.products != undefined)
        res.status(200).json(req.products)
    else
        res.status(404).json()
})

controller.route('/:tag/:take').get((req, res) => {
    let list = []

    for (let i = 0; i < Number(req.params.take); i++)
        list.push(req.products[i])

    res.status(200).json(list)
    
})


controller.route('/').get( async (req, res) => {
    try {
        res.status(200).json(await ProductSchema.find())
    } catch {
        res.status(400).json()
    }
    
})

module.exports = controller

