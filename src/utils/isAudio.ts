export const isAudio = (val) =>
  /(http(s?):)([/|.|\w|\s|-])*\.(?:mp3|mpeg|wav|mpga)/.test(val)
