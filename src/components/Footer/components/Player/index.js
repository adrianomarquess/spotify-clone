import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

/* Redux */
import { connect } from 'react-redux';
import PlayerActions from 'store/ducks/player';

import styles from './styles';

export class Player extends Component {
  static propTypes = {
    player: PropTypes.shape({
      song: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        author: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
      loading: PropTypes.bool,
      paused: PropTypes.bool,
    }).isRequired,
    playerPause: PropTypes.func.isRequired,
    playerPlay: PropTypes.func.isRequired,
  };

  renderPause = () => (
    <TouchableOpacity onPress={this.props.playerPause}>
      <Icon name="controller-paus" size={20} color="#FFF" />
    </TouchableOpacity>
  );

  renderPlay = () => (
    <TouchableOpacity onPress={this.props.playerPlay}>
      <Icon name="controller-play" size={20} color="#FFF" />
    </TouchableOpacity>
  );

  renderButton = () => (
    this.props.player.paused ? this.renderPlay() : this.renderPause()
  );

  render() {
    const { song } = this.props.player;

    return (
      <View style={styles.player}>
        <View style={styles.content}>

          <View style={styles.leftContent}>
            <Image
              style={styles.thumbnail}
              source={{ uri: song.thumbnail }}
            />

            <View style={styles.current}>
              <Text style={styles.title}>{song.title}</Text>
              <Text style={styles.description}>{song.author}</Text>
            </View>
          </View>

          { this.props.player.loading
            ? <ActivityIndicator size="small" color="#FFF" />
            : this.renderButton()
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

const mapDispatchToProps = dispatch => ({
  playerPlay: () => dispatch(PlayerActions.playerPlay()),
  playerPause: () => dispatch(PlayerActions.playerPause()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
