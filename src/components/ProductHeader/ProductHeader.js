import React, { Component } from 'react';

export default class ProductHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Select the show/hide class which determines the image shown
        const clsItemviewerSortIcon = this.props.showDescription ? 'fontawesome-sort-up' : 'fontawesome-sort-down' ;
        const clsItemviewerToggle = clsItemviewerSortIcon + ' itemviewer-header-expand';
        return (
            <div className="itemviewer-header"> {/* Most of our container divs will generally be a flexbox layout */}
                {/* Using fontawesome for the icons - it had to come from somewhere! */}
                <span className="fontawesome-file itemviewer-header-icon"></span>
                <span className="itemviewer-header-title">{this.props.title}</span>
                {/* The arrow function will call the handler on the container component */}
                <span className={clsItemviewerToggle} onClick={() => this.props.toggleDescription()}></span>
            </div>
        );
    }
}
