import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const min = 2;

class Search extends React.Component {
  state = {
    inputText: '',
    buttonDisabled: true,
    receivedAPI: false,
    albums: [],
    searchedName: '',
    result: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonAvailable);
  }

  buttonAvailable = () => {
    const { inputText } = this.state;
    if (inputText.length >= min) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  onSearchClick = async () => {
    const { inputText } = this.state;
    this.setState({
      receivedAPI: true,
      searchedName: inputText,
    });
    const result = await searchAlbumAPI(inputText);
    this.setState({
      albums: result,
      receivedAPI: false,
      inputText: '',
      result: result.length === 0,
    });
  }

  render() {
    const { inputText,
      buttonDisabled,
      receivedAPI,
      albums,
      searchedName,
      result } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <input
            type="text"
            name="inputText"
            value={ inputText }
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            onClick={ this.onSearchClick }
          >
            Pesquisar
          </button>
        </form>
        <div>
          {
            receivedAPI && <Loading />
          }
          {
            result ? <p>Nenhum álbum foi encontrado</p> : (
              <section>
                <p>
                  { `Resultado de álbuns de: ${searchedName}` }
                </p>
                {albums.map((artist) => (
                  <Link
                    to={ `/album/${artist.collectionId}` }
                    data-testid={ `link-to-album-${artist.collectionId}` }
                    key={ artist.collectionId }
                  >
                    <div>
                      <p>{ artist.artistName }</p>
                      <p>{ artist.collectionName }</p>
                      <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
                    </div>
                  </Link>
                ))}
              </section>
            )
          }
        </div>
      </div>
    );
  }
}
export default Search;
