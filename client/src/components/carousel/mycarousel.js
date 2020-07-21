import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Carousel,  { Pagination } from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import styles, { colors } from './index.style';

const SLIDER_1_FIRST_ITEM = 1;

export class MyCarousel extends Component {
    state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        entries: [
            {
                title: 'Build Your Dream Nest',
                subtitle: 'Get your home loan eligibility and interest rates now',
                illustration: 'https://i.imgur.com/1hiPLuK.jpg'
            },
            {
                title: 'Shield Yourself from Uncertainity',
                subtitle: 'Avoid late payment fines - how?',
                illustration: 'https://i.imgur.com/3dz4yPv.jpg'
            },
            {
                title: 'Gift Your Child Their Future',
                subtitle: 'Know more about education funds and how you can set one up for your child',
                illustration: 'https://i.imgur.com/QZ7mBnz.jpg'
            },
            {
                title: 'Dream car?',
                subtitle: 'Drive home your dream car at the best interest rates',
                illustration: 'https://i.imgur.com/eVBHz1j.jpg'
            },
            {
                title: 'Grow Your Investments',
                subtitle: 'Learn more about recurring deposits',
                illustration: 'https://i.imgur.com/GlX1DOz.jpg'
            }
        ]
    }

    onPressed = (data) => {
        this.props.whenClicked(data)
    }

    _renderItemWithParallax = ({item, index}, parallaxProps) => {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
              whenClicked={ (data) => this.onPressed(data) }
            />
        );
    }

  

    render () {
        return (
            <View>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={this.state.entries}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                    dotsLength={this.state.entries.length}
                    activeDotIndex={this.state.slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(244, 81, 30, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
          </View>
        );
    }
}
export default MyCarousel