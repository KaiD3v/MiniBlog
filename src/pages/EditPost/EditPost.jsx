import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      setTags(post.tags.join(", "));
    }
  }, [post]);

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validar a URL da imagem
    try {
      new URL(image);
    } catch (error) {
      return setFormError("A imagem precisa ser uma URL válida.");
    }

    // Criar um array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Verificar se todos os campos estão preenchidos
    if (!title || !image || !tags || !body) {
      return setFormError("Por favor, preencha todos os campos.");
    }

    // Atualizar o documento
    const data = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    // Redirecionar para a página de dashboard após a atualização
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post conforme desejar.</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Insira o título do post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira a URL da imagem"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </label>
            <button type="submit" className="btn">
              Editar
            </button>
            {response.loading && <p>Aguarde...</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
