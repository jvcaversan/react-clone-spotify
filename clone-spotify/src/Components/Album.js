import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    artistName: '',
    albumName: '',
    photo: '',
    tracks: [],
    favSongs: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const songs = response.slice(1);
    const fav = await getFavoriteSongs();
    this.setState({
      musics: response,
      tracks: songs,
      favSongs: fav,
    }, this.setInfo);
  }

  setInfo = () => {
    const { musics } = this.state;
    this.setState({
      artistName: musics[0].artistName,
      photo: musics[0].artworkUrl100,
      albumName: musics[0].collectionName,
    });
  }

  render() {
    const { artistName, photo, albumName, tracks, favSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <div>
            <h1 data-testid="artist-name">{ artistName }</h1>
            <h3 data-testid="album-name">{ albumName }</h3>
            <img src={ photo } alt={ albumName } />
          </div>
          <div>
            {
              tracks
                .map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    info={ track }
                    favSongs={ favSongs }
                  />))
            }
          </div>
        </section>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;
