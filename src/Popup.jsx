import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Align from 'rc-align';
import Animate from 'rc-animate';
import PopupInner from './PopupInner';

const Popup = React.createClass({
  propTypes: {
    visible: PropTypes.bool,
    wrap: PropTypes.object,
    style: PropTypes.object,
    getClassNameFromAlign: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onAnimateLeave: PropTypes.func,
    className: PropTypes.string,
    onMouseLeave: PropTypes.func,
  },

  componentDidMount() {
    this.rootNode = this.getPopupDomNode();
  },

  onAlign(popupDomNode, align) {
    const props = this.props;
    const alignClassName = props.getClassNameFromAlign(props.align);
    const currentAlignClassName = props.getClassNameFromAlign(align);
    if (alignClassName !== currentAlignClassName) {
      this.currentAlignClassName = currentAlignClassName;
      popupDomNode.className = this.getClassName(currentAlignClassName);
    }
  },

  onAnimateLeave() {
    this.props.onAnimateLeave();
  },

  getPopupDomNode() {
    return ReactDOM.findDOMNode(this);
  },

  getTarget() {
    return ReactDOM.findDOMNode(this.props.wrap);
  },

  getTransitionName() {
    const props = this.props;
    let transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${props.prefixCls}-${props.animation}`;
    }
    return transitionName;
  },

  getClassName(currentAlignClassName) {
    const props = this.props;
    const {prefixCls} = props;
    let className = prefixCls + ' ' + props.className + ' ';
    className += currentAlignClassName;
    return className;
  },

  render() {
    const props = this.props;
    const {align, style, visible, prefixCls} = props;
    const className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
    const hiddenClassName = `${prefixCls}-hidden`;
    if (!visible) {
      this.currentAlignClassName = null;
    }
    return (<Animate component=""
                     exclusive
                     transitionAppear
                     onLeave={this.onAnimateLeave}
                     transitionName={this.getTransitionName()}
                     showProp="xVisible">
      <Align target={this.getTarget}
             key="popup"
             monitorWindowResize
             xVisible={visible}
             childrenProps={{
               visible: 'xVisible',
             }}
             disabled={!visible}
             align={align}
             onAlign={this.onAlign}>
        <PopupInner className={className}
                    hiddenClassName={hiddenClassName}
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.onMouseLeave}
                    style={style}>
          {props.children}
        </PopupInner>
      </Align>
    </Animate>);
  },
});

export default Popup;
