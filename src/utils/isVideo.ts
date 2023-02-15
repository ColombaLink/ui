export const isVideo = (val) =>
  /(http(s?):)([/|.|\w|\s|-])*\.(?:m4v|m3u8|mov|mp4)/.test(val)
