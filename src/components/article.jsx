import { h, Fragment } from 'preact'
import { ArticleHeader } from 'components/articleheader.jsx'
import { Softkey } from 'components/softkey'
import { useArticle } from 'hooks/useArticle'
import { useBackToSearch } from 'hooks/useBackToSearch'

const Article = ({ lang, title }) => {
  const article = useArticle(lang, title)

  useBackToSearch()

  if (!article) {
    return 'Loading...'
  }

  return (
    <Fragment>
      <ArticleHeader
        imageUrl={article.imageUrl}
        title={article.title}
        description={article.description}
        preview={article.preview}
      />
      <Softkey />
    </Fragment>
  )
}

export default Article
