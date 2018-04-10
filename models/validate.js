function judgeType () {
  var paramType = Object.prototype.toString.call(param)
  return paramType.substring(8, paramType.length - 1).toLowerCase() === type
}

function Validator (key, value) {
  this.key = key
  this.value = value
  this.stop = false
  this.result = {
    valid: true,
    message: ''
  }
}

Validator.prototype.setResult = function (message) {
  this.result.valid = false
  this.result.message = message
  this.stop = true
}

Validator.prototype.required = function () {
  if (!this.value || !judgeType(this.value)('string').trim()) {
    var message = this.key + ' is required'
    this.setResult(message)
  }

  return this
}

Validator.prototype.string = function () {
  if (!this.stop) {
    if (!judgeType(this.value)('string')) {
      var message = this.key + ' should be a string'
      this.setResult(message)
    }
  }

  return this
}

Validator.prototype.bool = function () {
  if (!this.stop) {
    if (!judgeType(this.value)('boolean')) {
      var message = this.key + ' should be a boolean'
      this.setResult(message)
    }
  }

  return this
}

Validator.prototype.number = function () {
  if (!this.stop) {
    if (!judgeType(this.value)('number')) {
      var message = this.key + ' should be a number'
      this.setResult(message)
    }
  }

  return this
}

Validator.prototype.array = function () {
  if (!this.stop) {
    if (!judgeType(this.value)('array')) {
      var message = this.key + ' should be an array'
      this.setResult(message)
    }
  }

  return this
}

Validator.prototype.integer = function () {
  if (!this.stop) {
    if (!/^\d+$/.test(this.value)) {
      var message = this.key + ' should be an integer'
      this.setResult(message)
    }
  }

  return this
}

Validator.prototype.min = function (minNum) {
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

  return this
}

Validator.prototype.max = function (maxNum) {
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

  return this
}

Validator.prototype.regex = function (reg) {
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
}

module.exports = Validator
