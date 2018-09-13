import S from 'sanctuary'
import pipe from '../../core/pipe'
import replace from '../../string/replace'

const rxLink = /\[([^\]]*)]\(([^#][^)]*)\)/gi
const rxExternalLink = /:\/\//

export const getAllLinks = pipe ([
  S.matchAll (rxLink),
  S.map (({ groups }) => S.justs (groups)),
])

export const getInternalLinks = pipe ([
  getAllLinks,
  S.filter (([text, link]) => !S.test (rxExternalLink) (link)),
])

export const prependLink = baseUrl => document => ([text, link]) =>
  replace (`[${text}](${link})`) (`[${text}](${baseUrl}/${link})`) (document)

export const prependAllLinks = baseUrl =>
  S.reduce (prependLink (baseUrl))