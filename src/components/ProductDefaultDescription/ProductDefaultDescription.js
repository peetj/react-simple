import React, { Component } from 'react';

export default class ProductDefaultDescription extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // The class to display tells us whether to show or hide the description
        const clsProductDefaultDescription = this.props.showDescription ? 'product-default-description' : 'hide' ;
        // We will fallback on the first thumbnail but if not there will supply some default instead
        const imgProduct = this.props.item.thumbnail || this.props.defaultThumbnail;

        return (
            <div className={clsProductDefaultDescription}>
                <div className="product-container">
                    {/* Image is inlined by Webpack */}
                    <img className="product-image" src={require(`../../assets/images/${imgProduct}`)} />
                    {/* Data coming to us is HTML so we need to process it this way */}
                    <p className="product-description" dangerouslySetInnerHTML={{ __html: this.props.item.description}}></p>
                </div>
            </div>
        );
    }
}
