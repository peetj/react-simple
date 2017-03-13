import React, { Component } from 'react';
import ProductHeader from '../ProductHeader/ProductHeader';
import ProductFooter from '../ProductFooter/ProductFooter';
import ProductData from '../Data/ProductData';

export default class ItemViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDescription: true,
            productIndex: 0,
            productDescription: ProductData, // Our datasource. We could do better by loading it in componentDidMount
            isPrevEnabled: false,   // This and the next state property help us with User Experience (UX)
            isNextEnabled: true,
            // Our assumption here is the first image should always exist, however if there is no content, we have a backup
            defaultThumbnail: ProductData.content[0].thumbnail || 'placeholder-product.png'
        };

        // Setup event handler bindings to 'this'
        this.toggleDescription = this.toggleDescription.bind(this);
        this.prevItem = this.prevItem.bind(this);
        this.nextItem = this.nextItem.bind(this);
    }

    // Sets state to ensure the showing/hiding of the product description and footer
    toggleDescription () {
        this.setState({ showDescription: !this.state.showDescription })
    }

    // Previous button. No action is taken if state dictates we are on the first list entry
    prevItem () {
        if(this.state.productIndex === 0)
            return;

        this.setState({
            productIndex: this.state.productIndex - 1, // Decrement the product index as we want the previous product description
            isPrevEnabled: this.state.productIndex-1 > 0, // Disable the prev button if we are already at the beginning of the list
            isNextEnabled: this.state.productIndex+1 < this.state.productDescription.content.length-1 // Likewise, disable the next button if we are at the end of the list
        });
    }

    nextItem () {
        if(this.state.productIndex === this.state.productDescription.content.length-1)
            return;

        this.setState({
            productIndex: this.state.productIndex + 1,
            isPrevEnabled: this.state.productIndex+1 > 0,
            isNextEnabled: this.state.productIndex+1 < this.state.productDescription.content.length-1
        });
    }

    render() {
        return (
            <div className="itemviewer-container">
                {/*
                    ItemViewer contains the event handler called when the show/hide button in the header is clicked in the header.
                    This will be called (back) from the ProductHeader component.
                    showDescription is the flag that informs us whether the description is showing or not
                */}
                <ProductHeader
                    toggleDescription={this.toggleDescription}
                    showDescription={this.state.showDescription}
                    title={this.state.productDescription.title} />

                {/*
                    We need to pass some extra properties into the 'props.children' components.
                    We have used props.children here to keep the overall component flexible and decoupled
                */}
                {React.cloneElement(this.props.children, {
                    showDescription: this.state.showDescription,
                    item: this.state.productDescription.content[this.state.productIndex],
                    defaultThumbnail: this.state.defaultThumbnail
                })}

                {/*
                    The ProductFooter is where most of the functionality is. We need to know when to disable the buttons
                    which is provided by isPrevEnabled and isNextEnabled. We have two event handlers passed in to ProductFooter
                    called back when the buttons are clicked. We display the prev/next titles unless they are missing, in which
                    case we display an empty string
                */}
                <ProductFooter
                    showDescription={this.state.showDescription}
                    prevItemTitle = {this.state.productDescription.content[this.state.productIndex-1] || ''}
                    nextItemTitle={this.state.productDescription.content[this.state.productIndex+1] || ''}
                    prevItem={this.prevItem}
                    nextItem={this.nextItem}
                    isPrevEnabled={this.state.isPrevEnabled}
                    isNextEnabled={this.state.isNextEnabled} />
            </div>
        );
    }
}
