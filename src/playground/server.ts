import componentAnalysis from './componentAnalysis'

export default async (params) => {
  const { head, body, url } = params

  console.log('xx', url)

  // http://192.168.111.26:8005/public/Badges.tsx

  if (url.pathname.includes('.json')) {
    componentAnalysis(url.pathname.replace('.json', '.tsx'))
    console.info('check', url)
  }

  return `<!DOCTYPE html><html><head><meta charset="UTF-8" />
  ${head}
</head>
<body>
    ${body}
</body>
</html>
`
}
