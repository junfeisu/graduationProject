function judgeType () {
  var paramType = Object.prototype.toString.call(param)
  return paramType.substring(8, paramType.length - 1).toLowerCase() === type
}

function Validator (key, value) {
  this.key = key
  this.value = value

  this.stop = false

  this.tasks = []
  this.result = {
    valid: true,
    message: ''
  }
}

Validator.prototype.next = function () {
  var fn = this.tasks.shift()
  fn()
}

Validator.prototype.setResult = function (message) {
  this.result.valid = false
  this.result.message = message
  this.stop = true
}

Validator.prototype.required = function () {
  var fn = (function () {
    return function () {
      if (!this.value) {
        var message = this.key + ' is required'
        this.setResult(message)
      }

      this.next()
    }
  }())

  this.tasks.unshift(fn)

  return this
}

Validator.prototype.string = function () {
  var fn = (function () {
    return function () {
      if (!this.stop) {
        if (!judgeType(this.value)('string')) {
          var message = this.key + ' should be a string'
          this.setResult(message)
        }
      }

      this.next()
    }
  }())
  
  this.tasks.push(fn)
  return this
}

Validator.prototype.bool = function () {
  var fn = (function () {
    return function () {
      if (!this.stop) {
        if (!judgeType(this.value)('boolean')) {
          var message = this.key + ' should be a boolean'
          this.setResult(message)
        }
      }

      this.next()
    }
  }())
  
  this.tasks.push(fn)

  return this
}

Validator.prototype.number = function () {
  var fn = (function () {
    return function () {
      if (!this.stop) {
        if (!judgeType(this.value)('number')) {
          var message = this.key + ' should be a number'
          this.setResult(message)
        }
      }

      this.next()
    }
  }())
  
  this.tasks.push(fn)

  return this
}

Validator.prototype.array = function () {
  var fn = (function () {
    return function () {
      if (!this.stop) {
        if (!judgeType(this.value)('array')) {
          var message = this.key + ' should be an array'
          this.setResult(message)
        }
      }

      this.next()
    }
  }())
  
  this.tasks.push(fn)

  return this
}

Validator.prototype.integer = function () {
  var fn = (function () {
    return function () {
      if (!this.stop) {
        if (!/^\d+$/.test(this.value)) {
          var message = this.key + ' should be an integer'
          this.setResult(message)
        }
      }
      
      this.next()
    }
  }())

  return this
}

Validator.prototype.min = function (minNum) {
  var fn = (function () {
    return function () {
      if (!this.stop) {
        var valueType = judgeType(this.value)

        if (valueType('string') && !this.value.lenght < minNum) {
          let message = this.key + ' length must be at least ' + minNum + 'characters long'
          this.setResult(message)
        } else if (valueType('number') && !this.value < minNum) {
          let message = this.key + ' must be larger than or equal to ' + minNum
          this.setResult(message)
        }
      }
      
      this.next()
    }
  }())

  this.tasks.push(fn)

  return this
}

Validator.prototype.max = function (maxNum) {
  var fn = (function () {
    return function () {
      if (!this.stop) {
        var valueType = judgeType(this.value)

        if (valueType('string') && !this.value.length > maxNum) {
          let message = this.key + ' length must be at least ' + maxNum + ' characters long'
          this.setResult(message)
        } else if (valueType('number') && !this.value < maxNum) {
          let message = this.key + ' must be larger than or equal to ' + maxNum
          this.setResult(message)
        }
      }
      
      this.next()
    }
  }())
  
  this.tasks.push(fn)

  return this
}

Validator.prototype.regex = function (reg) {
  var fn = (function () {
    return function () {
      try {
        if (!this.stop) {
          var checkReg = new RegExp(reg)
          if (!checkReg.test(this.value)) {
            var message = this.key + ' with value ' + this.value + ' fails to macth the pattern ' + checkReg
            this.setResult(message)
          }
        }
      } catch (err) {
        this.setResult(reg + ' is not a valid regular expression')
      }
      
      this.next()
    }
  }())

  this.tasks.push(fn)

  return this
}

module.exports = Validator
