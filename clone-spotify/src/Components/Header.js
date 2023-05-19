import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
    state = {
      response: '',
      loading: false,
    }

    async componentDidMount() {
      const returnUser = await getUser();
      this.setState({ response: returnUser, loading: true });
    }

    render() {
      const { response, loading } = this.state;
      return (
        <header data-testid="header-component">
          {
            (loading) ? (
              <>
                <p data-testid="header-user-name">
                  Bem vindo
                  { response.name }
                </p>
                <nav>
                  <Link data-testid="link-to-search" to="/search">
                    Search
                  </Link>
                  <Link data-testid="link-to-favorites" to="/favorites">
                    Favoritos
                  </Link>
                  <Link data-testid="link-to-profile" to="/profile">
                    Perfil
                  </Link>
                </nav>
              </>
            ) : <Loading />

          }
        </header>
      );
    }
}

export default Header;
