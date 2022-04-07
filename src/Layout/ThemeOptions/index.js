import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Button,
    UncontrolledTooltip
} from 'reactstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    faComments,
} from '@fortawesome/free-solid-svg-icons'

class ThemeOptions extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };

    }

    

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    state = {
        showing: false
    };



    render() {
        let {
        } = this.props;

        const {showing} = this.state;

        return (
            <div className={"ui-theme-settings " + (showing ? 'settings-open' : '')}>
                <Button className="btn-open-options" id="TooltipDemo" style={{backgroundColor:'#fc0',border:0}}
                 onClick={() => this.setState({showing: !showing})}>
                    <FontAwesomeIcon icon={faComments}   color="#D40511" 
                    fixedWidth={false} size="2x"/>
                </Button>
                <UncontrolledTooltip placement="left" target={'TooltipDemo'}>
                    Open Chat
                </UncontrolledTooltip>
                <div className="theme-settings__inner">
                  
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    backgroundColor: state.ThemeOptions.backgroundColor,
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeOptions);
