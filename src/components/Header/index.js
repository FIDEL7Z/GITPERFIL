import './styles.css';
import icon from '../../assets/GitHUb.png'; 

const Header = () => {
  return (
    <header>
      <img src={icon} alt="Ícone" className="icon" />
      <h1>GITPERFIL</h1>
    </header>
  );
}

export { Header };
