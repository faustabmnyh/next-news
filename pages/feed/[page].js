import styles from "../../styles/Feed.module.css";
import { useRouter } from "next/router";

const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();

  return (
    <div className="page-container">
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>
              {article.title}
            </h1>
            <p>{article.description}</p>
            {!!article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} />
            )}
          </div>
        ))}
      </div>

      <div className={styles.paginator}>
        <div
          onClick={() =>
            pageNumber > 1 && router.push(`/feed/${pageNumber - 1}`)
          }
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous page
        </div>
        <div>#{pageNumber}</div>
        <div
          onClick={() =>
            pageNumber < articles.length &&
            router.push(`/feed/${pageNumber + 1}`)
          }
          className={
            pageNumber === articles.length ? styles.disabled : styles.active
          }
        >
          Next page
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const pageNumber = context.query.page;
  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const {
    articles,
  } = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}&apiKey=${process.env.NEXT_PUBLIC_NEWS_KEY}
  `).then((res) => res.json());
  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;
