import React from 'react';
// import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

import { View } from 'react-native';
import NavigationTabs from './components/NavigationTabs';
import PlayerComponent, { Player } from './components/Player';

import styles from './styles';

const Footer = props => (
  <View style={styles.footerContainer}>
    { props.player.song && <PlayerComponent /> }
    <NavigationTabs {...props} />
  </View>
);

Footer.propTypes = {
  player: Player.propTypes.player,
};

Footer.defaultProps = {
  player: null,
};

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(Footer);
