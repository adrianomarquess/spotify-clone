import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { View, ScrollView, TextInput } from 'react-native';
import Header from 'components/Header';
import SongListComponent, { SongList } from 'components/SongList';

import { connect } from 'react-redux';
import SearchActions from 'store/ducks/search';

import styles from './styles';

class Search extends Component {
  static propTypes = {
    searchEmpty: PropTypes.func.isRequired,
    searchRequest: PropTypes.func.isRequired,
    search: PropTypes.shape({
      data: SongList.propTypes.songs,
      loading: PropTypes.bool,
      error: PropTypes.bool,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.searchSongs = _.debounce(this.searchSongs, 500);
  }

  state = {
    searchText: '',
  }

  inputChangeText = (text) => {
    this.setState({ searchText: text }, () => {
      if (this.state.searchText.length > 0) {
        this.searchSongs();
      } else {
        this.props.searchEmpty();
      }
    });
  };

  searchSongs = () => {
    this.props.searchRequest(this.state.searchText);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar músicas"
            placeholderTextColor="#999"
            onChangeText={this.inputChangeText}
            underlineColorAndroid="transparent"
            autoCorrect={false}
          />
        </Header>

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <SongListComponent
            showTitle={false}
            songs={this.props.search.data}
            loading={this.props.search.loading}
            error={this.props.search.error}
          />
        </ScrollView>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  searchRequest: search => dispatch(SearchActions.searchRequest(search)),
  searchEmpty: () => dispatch(SearchActions.searchEmpty()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
