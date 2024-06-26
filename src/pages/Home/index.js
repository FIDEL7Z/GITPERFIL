import React, { useState } from 'react';
import { Header } from '../../components/Header';
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState('');

  const handleGetData = async () => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${user}`);
      if (!userResponse.ok) {
        throw new Error('Perfil não encontrado. Verifique o nome de usuário.');
      }
      const newUser = await userResponse.json();

      if (newUser.name) {
        const { avatar_url, name, bio, login } = newUser;
        setCurrentUser({ avatar_url, name, bio, login });

        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos`);
        const newRepos = await reposResponse.json();

        if (newRepos.length > 0) {
          setRepos(newRepos);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input
              name="usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@username"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {error && <p className="error-message">{error}</p>}

          {currentUser?.name && (
            <div className="perfil">
              <img
                src={currentUser.avatar_url}
                className="profile"
                alt="Imagem de perfil"
              />
              <div>
                <h3>{currentUser.name}</h3>
                <span>{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
          )}

          {repos?.length > 0 && (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map((repo) => (
                <ItemList key={repo.id} title={repo.name} description={repo.description} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
