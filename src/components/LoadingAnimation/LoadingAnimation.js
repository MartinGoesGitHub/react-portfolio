import React, { Component } from 'react'

export class LoadingAnimation extends Component {
    render() {
        return (
            <div class="lds-ripple"><div></div><div></div></div>
        )
    }
}

export default LoadingAnimation
