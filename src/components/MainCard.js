import React from 'react'

import MainHeader from './MainHeader'
import ConversionCard from './ConversionCard'

class MainCard extends React.Component {

    render() {
        return (
            <div className='main-card'>
                <MainHeader title='exchange'/>
                <ConversionCard />
            </div>
        )
    }
}

export default MainCard