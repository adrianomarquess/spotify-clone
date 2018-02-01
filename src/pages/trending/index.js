import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, ScrollView } from 'react-native';
import Header from 'components/Header';
import SongListComponent, { SongList } from 'components/SongList';
import AlbumList from 'components/AlbumList';

// Redux
import { connect } from 'react-redux';
import TrendingsSongsActions from 'store/ducks/trending-songs';
import RecommendedAlbumsActions from 'store/ducks/recommended-albums';

import styles from './styles';

class Trending extends Component {
  static propTypes = {
    trendingRequest: PropTypes.func.isRequired,
    recommendedRequest: PropTypes.func.isRequired,
    trendingSongs: PropTypes.shape({
      data: SongList.propTypes.songs,
      loading: PropTypes.bool,
      error: PropTypes.bool,
    }).isRequired,
    recommendedAlbums: PropTypes.shape({
      data: AlbumList.propTypes.albums,
      loading: PropTypes.bool,
      error: PropTypes.bool,
    }).isRequired,
  };

  componentDidMount() {
    this.props.trendingRequest();
    this.props.recommendedRequest();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Em alta" />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <SongListComponent
            title="Músicas em alta"
            loading={this.props.trendingSongs.loading}
            songs={this.props.trendingSongs.data}
          />

          <AlbumList
            title="Álbuns recomendados"
            loading={this.props.recommendedAlbums.loading}
            albums={this.props.recommendedAlbums.data}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  trendingSongs: state.trendingSongs,
  recommendedAlbums: state.recommendedAlbums,
});

const mapDispatchToProps = dispatch => ({
  trendingRequest: () => dispatch(TrendingsSongsActions.trendingRequest()),
  recommendedRequest: () => dispatch(RecommendedAlbumsActions.recommendedRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
