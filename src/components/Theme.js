/**
 * NB: If you update this file, please also update `docs/src/app/customization/Themes.js`
 */


import spacing from './spacing';

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  fontWeight:'100,300,400',
  borderRadius: 2,
  palette: {
    primary1Color: '#dd2c00',
    primary2Color: '#ff6434',
    primary3Color: '#a30000',
    accent1Color: '#64dd17',
    accent2Color: '#9cff57',
    accent3Color: '#1faa00',
    textColor: '#616161',
    secondaryTextColor: '#757575',
    alternateTextColor: '#ffffff',
    canvasColor: '#ffffff',
    borderColor: '#e0e0e0',
    disabledColor: '#9E9E9E',
    pickerHeaderColor: '00bcd4',
    clockCircleColor: '#000000',
    shadowColor: '#000000',
  },

};
