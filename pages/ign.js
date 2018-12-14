// This is the Link API
import Link from 'next/link';

import fetch from 'isomorphic-unfetch';

import SearchForm from '../components/SearchForm';

const defaultNewsSource = 'ign';

const apiKey = '62409199c79d461ea0a6fd6f83b8d44d';

async function getNews(url){
  try{
    const res = await fetch(url);

    const data = await res.json();

    return (data);
  }
  catch(error){
    return (error);
  }
}

export default class News extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  }

  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/top-headlines?source=${input}$apiKey=${apiKey}`
    })
  }

  render(){
    if(this.state.articles.length == 0){
      this.state.articles = this.props.articles;
    }
    return(
      <div>

        <SearchForm setNewsSource={this.setNewsSource}/>

        <div>
          {/* Iterate through articles using Array map */}
          {/* Display author, publishedAt, image, description, and content */}
          {/* for each story. Also a link for more.. */}
          {this.state.articles.map((article, index) =>(
            <section key={index}>
            <h3>{article.title}</h3>
            <p className="author">{article.author} {formatDate(article.publishedAt)}</p>
            <img src={article.urlToImage} alt="article image" className="img-article"></img>
            <p>{article.description}</p>
            <p>{article.content}</p>
            <p><Link href="/story"><a>Read More</a></Link></p>
            <p onClick={this.test}>click..</p>
            </section>
          ))}
        </div>
        <style jsx>{`
              /* CSS for this page */
              section {
                width: 50%;
                border: 1px solid gray;
                background-color: rgb(240, 248, 255);
                padding: 1em;
                margin: 1em;
              }

            .author {
                font-style: italic;
                font-size: 0.8em;
              }
            .img-article {
                max-width: 50%;
              }

            .newsMenu {
              display: flex;
              flex-direction: row;
              margin: 0;
              padding: 0;
              margin-top: 20px;
            }
            .newsMenu li {
              display: inline-table;
              padding-left: 20px;
            }

            .newsMenu li a {
              font-size: 1em;
              color: blue;
              display: block;
              text-decoration: none;
            }

            .newsMenu li a:hover {
              color: rgb(255, 187, 0);
              text-decoration: underline;
            }
          `}</style>
      </div>
    );
  }

  static async getInitialProps(response){

    const initUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

    const data = await getNews(initUrl);

    if(Array.isArray(data.articles)){
      return{
        articles: data.articles
      }
    }
    else{
      console.error(data)
      if(response){
        response.statusCode = 400
        response.end(data.message);
      }
    }
  }
  

  async componentDidUpdate(_prevProps, prevState){

    if(this.state.url !== prevState.url){

      const data = await getNews(this.state.url);

      if(Array.isArray(data.articles)){

        this.state.articles = data.articles;

        this.setState(this.state);
      }
      else{
        console.error(data)
        if(response){
          response.statusCode = 400
          response.end(data.message);
        }
      }
    }
  }

}

function formatDate(dates) {
  var date = new Date(dates)
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}
