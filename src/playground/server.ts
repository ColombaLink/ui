import componentAnalysis from './componentAnalysis'

export default async (params) => {
  const { head, body, url } = params

  if (url.pathname.includes('.json')) {
    return componentAnalysis(url.pathname.replace('.json', '.tsx'))
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
