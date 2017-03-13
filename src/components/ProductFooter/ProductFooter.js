import React, { Component } from 'react';

export default class ProductFooter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // If we had a bit more time, we would use CSS Modules with namespaced classes, plus some npm
        // packages which makes stringing together classes a bit easier!!!
        const clsItemviewerFooter = this.props.showDescription ? 'itemviewer-footer' : 'hide' ;
        const prevEnabled = this.props.isPrevEnabled ? 'enabled' : 'disabled' ;
        const nextEnabled = this.props.isNextEnabled ? 'enabled' : 'disabled' ;
        const clsPrev = `fontawesome-caret-left itemviewer-footer-prev-${prevEnabled}`;
        const clsNext = `fontawesome-caret-right itemviewer-footer-next-${nextEnabled}`;

        return (
            <div className={clsItemviewerFooter}>
                {/* The button and corresponding link call the same code (handler) in the container component */}
                <span className={clsPrev} onClick={() => this.props.prevItem()}></span>
                <a href="#" className="itemviewer-footer-prev-link" onClick={() => this.props.prevItem()}>{this.props.prevItemTitle.title}</a>
                <a href="#" className="itemviewer-footer-jump-link" onClick={() => this.props.nextItem()}>{this.props.nextItemTitle.title}</a>
                <span className={clsNext} onClick={() => this.props.nextItem()}></span>
            </div>
        );
    }
}
