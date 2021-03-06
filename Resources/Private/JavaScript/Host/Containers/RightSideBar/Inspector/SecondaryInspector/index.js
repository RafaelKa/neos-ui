import React, {PropTypes, Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';
import Portal from 'react-portal';
import mergeClassNames from 'classnames';
import {$transform, $get} from 'plow-js';
import Icon from '@neos-project/react-ui-components/lib/Icon/';
import Button from '@neos-project/react-ui-components/lib/Button/';
import style from './style.css';

@connect($transform({
    isFringeLeft: $get('ui.leftSideBar.isHidden'),
    isFringeRight: $get('ui.rightSideBar.isHidden'),
    isFullScreen: $get('ui.fullScreen.isFullScreen')
}))
export default class SecondaryInspector extends Component {
    static propTypes = {
        isFringeLeft: PropTypes.bool.isRequired,
        isFringeRight: PropTypes.bool.isRequired,

        // Interaction related propTypes.
        onClose: PropTypes.func.isRequired,
        children: PropTypes.element.isRequired
    };

    shouldComponentUpdate(...args) {
        return shallowCompare(this, ...args);
    }

    render() {
        const {
            onClose,
            children,
            isFringeLeft,
            isFringeRight
        } = this.props;
        const finalClassName = mergeClassNames({
            [style.secondaryInspector]: true,
            [style['secondaryInspector--isFringeLeft']]: isFringeLeft,
            [style['secondaryInspector--isFringeRight']]: isFringeRight
        });

        return (
            <Portal isOpened={true}>
                <div className={finalClassName}>
                    <Button
                        style="clean"
                        className={style.close}
                        onClick={onClose}
                        >
                        <Icon icon="close"/>
                    </Button>
                    {children}
                </div>
            </Portal>
        );
    }
}
