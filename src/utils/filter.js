/**
 * 全局定义的过滤器集合
 */

// 时间格式转为字符串
function date2str (val, type) {
  if (!val) return null
  val = new Date(val)
  let Y = val.getFullYear()
  let M = val.getMonth() + 1
  let D = val.getDate()
  let h = val.getHours()
  let m = val.getMinutes()
  let s = val.getSeconds()
  if (type === 'y') return Y
  if (type === 'ym') return [Y, M > 9 ? M : '0' + M].join('-')
  if (type === 'ymd') return [Y, M > 9 ? M : '0' + M, D > 9 ? D : '0' + D].join('-')
  return [[Y, M > 9 ? M : '0' + M, D > 9 ? D : '0' + D].join('-'), [h > 9 ? h : '0' + h, m > 9 ? m : '0' + m, s > 9 ? s : '0' + s].join(':')].join(' ')
}

export default {
  // 解析时间
  y (val) { return date2str(val, 'y') },
  ym (val) { return date2str(val, 'ym') },
  ymd (val) { return date2str(val, 'ymd') },
  ymdt (val) { return date2str(val) },
  // 解析文件大小
  n2s (val) {
    if (val < 1024) {
      return val + 'KB'
    } else if (val < 1024 * 1024) {
      return ~~(val / 1024) + 'MB'
    } else {
      return ~~(val / 1024 / 1024) + 'G'
    }
  },
  // 超出……
  cut2str (val, n) {
    if (val.length > n) {
      return val.substring(0, n) + '…'
    } else {
      return val
    }
  }
}
