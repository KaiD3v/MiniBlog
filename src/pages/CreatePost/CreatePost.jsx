import styles from "./CreatePost.module.css";

import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validar url da imagem

    // criar o array de tags

    //checar todos os valores
    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirecionar para home page
    redirect('/home')
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que você quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Insira um título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            id="image"
            required
            placeholder="Insira uma imagem para o seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            name="body"
            placeholder="Insira o conteúdo do post"
            value={body}
            required
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            id="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Enviar</button>}
        {response.loading && <button className="btn">Aguarde...</button>}
        {response.error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
