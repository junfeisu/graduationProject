const express = require('express')
const route = express.Router()
const movieModel = require('../schemas/movie')

// 添加电影
route.post('/add', (req, res) => {
  new movieModel(req.body).save(function (err, movie) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(movie)
    }
  })
})

// 修改电影信息
route.post('/update', (req, res) => {
  const { movie_id, movieInfo } = req.body
  if (movie_id) {
    movieModel.findOneAndUpdate({movie_id: movie_id}, {$set: movieInfo}, {new: true}, function (err, movie) {
      if (err) {
        res.status(500).json(err)
      } else {
        movie ? res.json({status: 'OK', message: '修改成功', data: movie}) : res.json({status: 'Fail', message: '电影不存在', data: null})
      }
    })
  } else {
    res.status(400).json({
      status: 'Fail',
      message: 'movie_id is necessary'
    })
  }
})

// 删除电影
route.post('/delete', (req, res) => {
  if (req.body.movie_id) {
    movieModel.remove({movie_id: req.body.movie_id}, function (err, result) {
      if (err) {
        res.status(500).json(err)
      } else {
        result.result.n ? res.json({status: 'OK', message: '删除成功'}) : res.json({status: 'Fail', message: '删除失败'})
      }
    })
  } else {
    res.status(400).json({
      status: 'Fail',
      message: 'movie_id is necessary'
    })
  }
})

module.exports = route
