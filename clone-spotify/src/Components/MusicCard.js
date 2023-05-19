import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    returned: false,
    checked: false,
  }

  componentDidMount() {
    const { favSongs } = this.props;
    const { info: { trackId } } = this.props;
    if (favSongs.some((music) => music.trackId === trackId)) {
      return this.setState({ checked: true });
    }
  }

  handleCheck = async () => {
    this.setState({ returned: true });
    const { info } = this.props;
    await addSong(info);
    this.setState({
      returned: false,
      checked: true,
    });
  }

  render() {
    const { returned, checked } = this.state;
    const { info: { trackName, previewUrl, trackId } } = this.props;
    return (
      <div>
        {
          returned ? <Loading /> : (
            <>
              <p>{ trackName }</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorite">
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  id="favorite"
                  onChange={ this.handleCheck }
                  checked={ checked }
                />
                Favorita
              </label>
            </>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  favSongs: PropTypes.arrayOf.isRequired,
  info: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
export default MusicCard;
