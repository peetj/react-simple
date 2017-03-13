import React, { Component } from 'react';
import ItemViewer from '../ItemViewer/ItemViewer';
import ProductDefaultDescription from '../ProductDefaultDescription/ProductDefaultDescription';

import '../../sass/index.scss';

// Save exporting the class later on!
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <ItemViewer>
            {/*
                Pass in a child component that represents the product being shown
                Potentially, we could use ItemViewer to view multiple product types
            */}
            <ProductDefaultDescription />
        </ItemViewer>
    );
  }
}
