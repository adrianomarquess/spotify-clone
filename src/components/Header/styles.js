import { StyleSheet } from 'react-native';
import { metrics, colors, fonts } from 'styles';

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: metrics.statusBarHeight,
    height: metrics.navBarHeight + metrics.statusBarHeight,
    paddingHorizontal: metrics.baseMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.darker,
  },

  title: {
    color: colors.white,
    fontSize: fonts.regular,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  leftButton: {
    width: 20,
  },

  rightHidden: {
    width: 20,
  },

});

export default styles;
