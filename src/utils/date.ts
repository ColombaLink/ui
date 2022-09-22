export const toDateString = (ms) =>
  new Date(ms).toLocaleString('local', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

export const isDate = (n) => typeof n === 'number' && n > 9466812e5
