import { useAuthentication } from "../../hooks/useAuthentication.js";
import styles from "./Register.module.css";

import db from "../../firebase/config";

import { useState, useEffect } from "react";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password != confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Confirmar Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {!loading && (
          <button type="submit" className="btn">
            Cadastrar
          </button>
        )}
        {loading && (
          <button type="submit" className="btn">
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
