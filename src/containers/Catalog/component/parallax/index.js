import React from 'react'
import ReactDOM from 'react-dom'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import {Table} from 'antd'
import './index.css'

// Little helpers ...
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

class ParallaxImageScreen extends React.Component {
  render() {
    return (
      <Parallax pages={3.15}>
            <ParallaxLayer offset={1} speed={1}
              style={{ backgroundColor: '#805E73' }}
            />

            <ParallaxLayer offset={2} speed={1}
              style={{ backgroundColor: '#87BCDE' }}
            />

            <ParallaxLayer offset={0} speed={0} factor={3.5} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover', backgroundColor: '#253237' }} />



            <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
              <img src={url('satellite2')} style={{ width: '15%', marginLeft: '70%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={2.85} speed={0.4} style={{ opacity: 0.6 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '37%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={0.1} speed={-0.7} style={{ pointerEvents: 'none' }}>
              <img src={url('satellite4')} style={{ width: '15%', marginRight: '70%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.2} speed={-0.3} style={{ pointerEvents: 'none' }}>
              <img src={'https://image.flaticon.com/icons/svg/2909/2909590.svg'} style={{ width: '25%', marginLeft: '15%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={0.6} speed={-0.2} style={{ pointerEvents: 'none' }}>
              <img src={'https://image.flaticon.com/icons/svg/2929/2929375.svg'} style={{ width: '15%', marginLeft: '55%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={2.7} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <img src={'https://image.flaticon.com/icons/svg/2277/2277588.svg'} style={{ width: '60%', marginRight: '45%' }} />
            </ParallaxLayer>
          </Parallax>
    )
  }
}

export default ParallaxImageScreen
