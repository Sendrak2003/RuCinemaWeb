import React from 'react'; 
import { StyleSheet, View, StyleProp, ViewStyle, Text } from 'react-native'; 
import StarIcon, { StarIconProps } from './StarIcon'; 
import { getStars } from './utils'; 

type Props = { 
  rating: number; 
  color?: string; 
  emptyColor?: string; 
  maxStars?: number; 
  starSize?: number; 
  enableHalfStar?: boolean; 
  style?: StyleProp<ViewStyle>; 
  starStyle?: StyleProp<ViewStyle>; 
  StarIconComponent?: (props: StarIconProps) => JSX.Element; 
  textColor?: string;
  testID?: string; 
}; 

const defaultColor = '#fdd835'; 

const StarRatingDisplay = ({ 
  rating, 
  maxStars = 5, 
  starSize = 32, 
  color = defaultColor, 
  emptyColor = color, 
  style, 
  starStyle, 
  StarIconComponent = StarIcon, 
  textColor = '#000',
  testID, 
}: Props) => { 
  return ( 
    <View style={[styles.starRating, style]} testID={testID}> 
      {getStars(rating, maxStars).map((starType, i) => { 
        return ( 
          <View key={i} style={[starStyle]}> 
            <StarIconComponent 
              index={i} 
              type={starType} 
              size={starSize} 
              color={starType === 'empty' ? emptyColor : color} 
            /> 
          </View> 
        ); 
      })} 
      <Text style={{ marginHorizontal: 10, fontSize: 15, color: textColor }}>
        {rating} / {maxStars} 
      </Text> 
    </View> 
  ); 
}; 

const styles = StyleSheet.create({ 
  starRating: { 
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center', 
    flexWrap: "wrap" 
  }, 
}); 

export default StarRatingDisplay;
