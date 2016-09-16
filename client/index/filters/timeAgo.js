function pluralOrSingular(data, locale) {
  if (data === 'just now') {
    return locale
  }
  const count = Math.round(data)
  return count + locale + '前'
}

export default function timeAgo (date) {
    const MINUTE = 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const WEEK = DAY * 7
    const MONTH = DAY * 30
    const YEAR = DAY * 365

    const locale = ['刚刚', '秒', '分钟', '小时', '天', '周', '月', '年']

    const seconds = (new Date().getTime() / 1000) - (new Date(date).getTime() / 1000)
    return seconds <= 5
          ? pluralOrSingular('just now', locale[0])
          : seconds < MINUTE
          ? pluralOrSingular(seconds, locale[1])
          : seconds < HOUR
          ? pluralOrSingular(seconds / MINUTE, locale[2])
          : seconds < DAY
          ? pluralOrSingular(seconds / HOUR, locale[3])
          : seconds < WEEK
          ? pluralOrSingular(seconds / DAY, locale[4])
          : seconds < MONTH
          ? pluralOrSingular(seconds / WEEK, locale[5])
          : seconds < YEAR
          ? pluralOrSingular(seconds / MONTH, locale[6])
          : pluralOrSingular(seconds / YEAR, locale[7])
}