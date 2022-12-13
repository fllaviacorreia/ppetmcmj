import React from 'react';
import {View} from 'react-native';
import {BottomNavigation, BottomNavigationTab, Divider} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ListQuestionnairesScreen} from '../screens/questionnaire/ListQuestionnairesScreen';
import {HomeScreen} from '../screens/HomeScreen';
import { AboutUsScreen } from '../screens/AboutUsScreen';
import {HomeIcon, ListQuestionnairesIcon, InfoIcon} from '../assets/icons';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
  <View>
    <Divider/>
    <BottomNavigation
      appearance='noIndicator'
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='Página inicial' icon={HomeIcon}/>
      <BottomNavigationTab title='Questionários aplicados' icon={ListQuestionnairesIcon}/>
      <BottomNavigationTab title='Sobre nós' icon={InfoIcon}/>
    </BottomNavigation>
  </View>
);

export const BottomTabsNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Página inicial' component={HomeScreen}/>
    <Screen name='Questionários aplicados' component={ListQuestionnairesScreen}/>
    <Screen name='Sobre nós' component={AboutUsScreen}/>
  </Navigator>
);