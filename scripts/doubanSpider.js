'use strict'

const superagent = require('superagent')
const cheerio = require('cheerio')
const url = require('url')
const requestHeader = require('../models/header.js')

function getMovie(urlLink, save) {
    superagent.get(urlLink)
        .set(requestHeader)
        .end(function(err, res) {
            if (err) {
                console.log('get movie error', urlLink)
                console.log(err)
                return
            }
            var $ = cheerio.load(res.text)
            var movie = {}
            // _id
            var pathnames = url.parse(urlLink).pathname.split('/')
            movie._id = pathnames[pathnames.length - 2]
            // 电影名
            var name = $('span[property="v:itemreviewed"]').text().split(' ')
            movie.zh_name = name[0]
            movie.foreign_name = name.splice(1).join(' ')
            // 海报
            movie.image = $('#mainpic img').attr('src')
            // 导演
            movie.directors = []
            $('a[rel="v:directedBy"]').each(function(i, elem) {
                var celebrity = $(this).attr('href').split('/')
                var director = {
                    name: $(this).text(),
                    celebrity: celebrity[celebrity.length - 2]
                }
                movie.directors.push(director)
            })
            // 编剧
            movie.scenarists = []
            var hasScenarist = $('#info > span').children().eq(2).text()
            if (hasScenarist == '编剧') {
                $('#info > span').children().eq(3).find('a').each(function(i, elem) {
                    var celebrity = $(this).attr('href').split('/')
                    var scenarist = {
                        name: $(this).text(),
                        celebrity: celebrity[celebrity.length - 2]
                    }
                    movie.scenarists.push(scenarist)
                })
            }
            // 演员
            movie.actors = []
            $('a[rel="v:starring"]').each(function(i, elem) {
                var celebrity = $(this).attr('href').split('/')
                var actor = {
                    name: $(this).text(),
                    celebrity: celebrity[celebrity.length - 2]
                }
                movie.actors.push(actor)
            })
            // 类型
            movie.genres = []
            $('span[property="v:genre"]').each(function(i, elem) {
                movie.genres.push($(this).text())
            })
            // 上映日期
            movie.initialReleaseDate = []
            $('span[property="v:initialReleaseDate"]').each(function(i, elem) {
                movie.initialReleaseDate.push($(this).text())
            })
            // 片长
            movie.runtime = $('span[property="v:runtime"]').text()
            // imdb
            movie.imdb = {
                id: $('#info').children().eq(-2).text(),
                link: $('#info').children().eq(-2).attr('href')
            }
            // 简介
            movie.summary = $('span[property="v:summary"]').text().replace(/(^\s*)|(\s*$)/g, "")
            // 推荐
            movie.recommendations = []
            $('#recommendations .recommendations-bd dl dd a').each(function(i, elem) {
                var film = {}
                film.name = $(this).text()
                var start = $(this).attr('href').indexOf('subject')
                var end = $(this).attr('href').indexOf('?')
                film.id = $(this).attr('href').slice(start + 8, end - 1)
                movie.recommendations.push(film)
            })
            // 评分
            movie.average = $('strong[property="v:average"]').text()
            // 评价人数
            movie.votes = $('span[property="v:votes"]').text()
            // 标签
            movie.tags = []
            $('.tags-body a').each(function(i, elem) {
                movie.tags.push($(this).text())
            })
            // 语言
            movie.languange = []
            // 地区
            movie.region = []
            // 又名
            movie.aka = []
            $('#info').children().each(function(i, elem) {
                if ($(this).text().indexOf('语言') > -1) {
                    movie.language = $(this).next()['0'].prev.data.split('/')
                    for (var i = 0; i < movie.language.length; i++) {
                        movie.language[i] = movie.language[i].replace(/\s+/g, '')
                    }
                }
                if ($(this).text().indexOf('制片国家') > -1) {
                    movie.region = $(this).next()['0'].prev.data.split('/')
                    for (var i = 0; i < movie.region.length; i++) {
                        movie.region[i] = movie.region[i].replace(/\s+/g, '')
                    }
                }
                if ($(this).text().indexOf('又名') > -1) {
                    movie.aka = $(this).next()['0'].prev.data.split('/')
                    for (var i = 0; i < movie.aka.length; i++) {
                        movie.aka[i] = movie.aka[i].replace(/\s+/g, '')
                    }
                }
            })
            // return movie
            save(movie, $)
        })
}

module.exports = getMovie