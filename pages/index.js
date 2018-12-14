// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

// Pass this content as 'props' to child components
const Index = props => (
  <div>
    <ul>
      <li><Link href="/index"><a>Home</a></Link></li>
      <li><Link href="/news"><a>Irish News</a></Link></li>
      <li><Link href="/business"><a>Business News</a></Link></li>
      <li><Link href="/sport"><a>Sport News</a></Link></li>
      <li><Link href="/ign"><a>Gaming News</a></Link></li>
    </ul>
    <h3><Link href="https://newsapi.org"><a>Powered by News API</a></Link></h3>
  </div>
);

// see https://nextjs.org/learn/basics/fetching-data-for-pages

Index.getInitialProps = async function() {

  const url = 'https://api.tvmaze.com/search/shows?q=batman';

  const res = await fetch(url)
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index