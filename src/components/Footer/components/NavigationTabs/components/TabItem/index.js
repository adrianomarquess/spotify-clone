import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import styles from './styles';

const TabItem = ({ title, icon, active, onPress }) => (
  <TouchableOpacity
    style={styles.tabItem}
    onPress={onPress}
    activeOpacity={0.6}
  >
    <Icon name={icon} size={32} style={active ? styles.activeIcon : styles.inactiveIcon} />
    <Text
      style={[
        styles.title,
        active ? styles.activeTitle : styles.inactiveTitle,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

TabItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default TabItem;
