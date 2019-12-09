
// 含时分秒的日期格式化 为 yyyy-MM-dd HH:mm:ss
export function formatStrTime(value) {
  if (typeof (value) === 'undefined' || value == null) {
    return
  }
  if (value.length === 8) {
    return YYYYMMDD(value)
  }
  if (value.length === 12) {
    return YYYYMMDDHHMM(value)
  }
  if (value.length === 14) {
    return YYYYMMDDHHMMSS(value)
  }
  return value
}

function YYYYMMDD(value) {
  const day = value.substr(6, 2)
  const month = value.substr(4, 2)
  const year = value.substr(0, 4)
  return year + '-' + month + '-' + day
}

function YYYYMMDDHHMM(value) {
  const minute = value.substr(10, 2)
  const hour = value.substr(8, 2)
  return YYYYMMDD(value) + ' ' + hour + ':' + minute
}

function YYYYMMDDHHMMSS(value) {
  const second = value.substr(12, 2)
  const minute = value.substr(10, 2)
  const hour = value.substr(8, 2)
  return YYYYMMDD(value) + ' ' + hour + ':' + minute + ':' + second
}
