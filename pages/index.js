import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from '../components/PostList'
import { initializeApollo } from '../lib/apolloClient'
import Title from '../components/Title'

export default function Home() {
  return (
    <div>
      <Title>PokeBank</Title>
      <PostList />
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  }
}