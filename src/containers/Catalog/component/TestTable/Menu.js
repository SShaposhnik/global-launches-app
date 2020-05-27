import React, { Component } from 'react'

class Menu extends Component {
    state = { isActive: false };

    wrapper = React.createRef();

    // componentDidMount() {
    //   this.removeOutsideClickListener();
    // }

    addOutsideClickListener() {
        document.addEventListener('mousemove', this.handleDocumentClick);
        console.log('mousemove');

    }

    removeOutsideClickListener() {
        document.removeEventListener('mousemove', this.handleDocumentClick);
        console.log('mouseout');
    }

    onShow() {
        this.addOutsideClickListener();
    }

    onHide() {
        this.removeOutsideClickListener();
    }

    onClickOutside() {
        this.setState({ isActive: false });
    }

    handleDocumentClick = e => {
        if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
            this.onClickOutside();
        }
    };

    toggleMenu = () => {
        this.setState(
            prevState => ({ isActive: !prevState.isActive }),
            () => {
                this.state.isActive ? this.onShow() : this.onHide();
            },
        );
    };

    render() {
        const { isActive } = this.state;

        return ( <div ref = { this.wrapper } >
            <button onClick = { this.toggleMenu } > MENU < /button> {isActive && ( < ul ><
                    li > qwe < /li> <
                    li > asd < /li> <
                    li > zxc < /li> <
                    /ul>
                )
            } <
            /div>
        )
    }
}

export default Menu