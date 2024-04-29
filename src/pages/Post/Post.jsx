import styles from "./Post.module.css"

//hooks
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

export const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando Post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img height={'400em'} width={'600em'} src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span> {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
