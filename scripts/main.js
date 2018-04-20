const superagent = require('superagent')
const getMovie = require('./doubanSpider')
const mongoose = require('mongoose')
const mongoConnect = require('../utils/mongoConnect')()
const MovieModel = require('../schemas/movie')
const requestHeader = require('../models/header')
var urlencode = require('urlencode')

superagent.get('https://movie.douban.com/j/search_tags?type=movie&source=index')
    .set(requestHeader)
    .end(function(err, res) {
        if (err) {
            console.log(err)
            console.log('获取标签出错，错误内容为' + err.message)
            return
        }
        var tags = res.body.tags
        var tagsLength = tags.length
        for (var i = 0; i < tagsLength; i++) {
            var url = 'https://movie.douban.com/j/search_subjects?type=movie&tag=' + urlencode(tags[i]) + '&page_limit=20&page_start=0'
            getLink(url)
        }
    })

function getLink(url) {
    superagent.get(url)
        .set(requestHeader)
        .timeout(1000 * 10)
        .end(function(err, res) {
            if (err) {
                if (err.timeout) {
                    console.log('超时')
                }
                return
            }
            let movies = res.body.subjects
            movies.forEach(function (val) {
                getMovie(val.url, save)
            })
        })
}

function save(movie, $) {
    MovieModel.findOne({ _id: movie._id }, function(err, res) {
        if (err) {
            console.log('查找电影是否存在出错，错误内容为' + err.message)
        }
        if (res) {
            console.log(movie.zh_name + '    已经存在')
            return
        } else if ($('.episode_list').text()) {
            // console.log(movie.zh_name + '    电视剧不要～')
            return
        } else {
            var movieEntity = new MovieModel(movie)
            movieEntity.markModified('directors')
            movieEntity.markModified('scenarists')
            movieEntity.markModified('actors')
            movieEntity.markModified('imdb')
            movieEntity.markModified('recommendations')
            movieEntity.save(function(err, newMovie) {
                if (err) {
                    console.log('数据插入数据库出错，错误内容为' + err.message)
                } else {
                    console.log(newMovie._id + '保存成功')
                }
            })
        }
    })
}
