function judgeType (param) {
  return function (type) {
    var paramType = Object.prototype.toString.call(param)
    return paramType.substring(8, paramType.length - 1).toLowerCase() === type
  }
}

function typeHandler (context, type) {
  var self = context
  var fn = (function () {
    return function () {
      if (!self.stop) {
        if (!judgeType(self.value)(type)) {
          var message = self.key + ' should be a/an ' + type
          self.setResult(message)
        }
      }

      self.next()
    }
  }())
  
  self.tasks.push(fn)
}

function _Validator (key, value) {
  this.key = key
  this.value = value

  this.stop = false
  this.tasks = []
  this.result = {
    valid: true,
    message: ''
  }
}

_Validator.prototype.next = function () {
  var fn = this.tasks.shift()
  if (fn) {
    fn()
  } else {
    return this.result
  }
}

_Validator.prototype.done = function () {
  this.next()
}

_Validator.prototype.setResult = function (message) {
  this.result.valid = false
  this.result.message = message
  this.stop = true
}

_Validator.prototype.required = function () {
  var self = this
  var fn = (function () {
    return function () {
      if (!self.value) {
        var message = self.key + ' is required'
        self.setResult(message)
      }

      self.next()
    }
  }())

  this.tasks.unshift(fn)

  return this
}

_Validator.prototype.string = function () {
  typeHandler(this, 'string')
  
  return this
}

_Validator.prototype.bool = function () {
  typeHandler(this, 'boolean')

  return this
}

_Validator.prototype.number = function () {
  typeHandler(this, 'number')

  return this
}

_Validator.prototype.array = function () {
  typeHandler(this, 'array')

  return this
}

_Validator.prototype.integer = function () {
  var self = this
  var fn = (function () {
    return function () {
      if (!self.stop) {
        if (!/^\d+$/.test(self.value)) {
          var message = self.key + ' should be an integer'
          self.setResult(message)
        }
      }
      
      self.next()
    }
  }())

  return this
}

_Validator.prototype.min = function (minNum) {
  var self = this
  var fn = (function () {
    return function () {
      if (!self.stop) {
        var valueType = judgeType(self.value)

        if (valueType('string') && self.value.length < minNum) {
          let message = self.key + ' length must be at least ' + minNum + 'characters long'
          self.setResult(message)
        } else if (valueType('number') && self.value < minNum) {
          let message = self.key + ' must be larger than or equal to ' + minNum
          self.setResult(message)
        }
      }
      
      self.next()
    }
  }())

  this.tasks.push(fn)

  return this
}

_Validator.prototype.max = function (maxNum) {
  var self = this
  var fn = (function () {
    return function () {
      if (!self.stop) {
        var valueType = judgeType(self.value)

        if (valueType('string') && self.value.length > maxNum) {
          let message = self.key + ' length must be less than or equal to ' + maxNum + ' characters long'
          self.setResult(message)
        } else if (valueType('number') && self.value > maxNum) {
          let message = self.key + ' must be less than or equal to ' + maxNum
          self.setResult(message)
        }
      }
      
      self.next()
    }
  }())
  
  this.tasks.push(fn)

  return this
}

_Validator.prototype.regex = function (reg) {
  var self = this
  var fn = (function () {
    return function () {
      try {
        if (!self.stop) {
          var checkReg = new RegExp(reg)
          if (!checkReg.test(self.value)) {
            var message = self.key + ' with value ' + self.value + ' fails to match the pattern ' + checkReg
            self.setResult(message)
          }
        }
      } catch (err) {
        self.setResult(reg + ' is not a valid regular expression')
      }
      
      self.next()
    }
  }())

  this.tasks.push(fn)

  return this
}

function Validator (key, value) {
  return new _Validator(key, value)
}

module.exports = Validator
