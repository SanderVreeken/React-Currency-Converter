import React from 'react'

class MainHeader extends React.Component {

    render() {
        return (
            <div className='main-header'>
                <h6 className='header-label'>{this.props.title.toUpperCase()}</h6>
            </div>
        )
    }
}

export default MainHeader