const mongoose = require('mongoose')
const Schema = mongoose.Schema
const arrangeGenerate = require('./sequence').arrange

const arrangeSchema = new Schema({
    _id: {
        type: Number
    },
    movie: {
        type: Number,
        required: true,
        ref: 'Movie'
    },
    cinema: {
        type: Number,
        required: true,
        ref: 'Cinema'
    },
    time: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    room: {
        type: Array,
        default: [
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 1,
                    "seat_col": 10
                }
            ],
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 2,
                    "seat_col": 10
                }
            ],
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 3,
                    "seat_col": 10
                }
            ],
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 4,
                    "seat_col": 10
                }
            ],
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 5,
                    "seat_col": 10
                }
            ],
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 6,
                    "seat_col": 10
                }
            ],
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 7,
                    "seat_col": 10
                }
            ],
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 8,
                    "seat_col": 10
                }
            ],
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 9,
                    "seat_col": 10
                }
            ],
            [{
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 1
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 2
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 3
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 4
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 5
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 6
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 7
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 8
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 9
                },
                {
                    "saled": false,
                    "selected": false,
                    "seat_row": 10,
                    "seat_col": 10
                }
            ]
        ]

    }
}, { versionKey: false, _id: false })

arrangeSchema.index({ movie: 1, cinema: 1, time: -1, room: 1 }, { unique: true })

arrangeSchema.pre('save', function(next) {
    var that = this
    if (this.isNew) {
        arrangeGenerate.increase('ArrangeGenerate', function(err, res) {
            if (err) {
                console.log('err is ' + JSON.stringify(err))
            } else {
                console.log('res is ' + JSON.stringify(res))
                that._id = res.value.next
                next()
            }
        })
    } else {
        next()
    }
})

module.exports = mongoose.model('Arrange', arrangeSchema)