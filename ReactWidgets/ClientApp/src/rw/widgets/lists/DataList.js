import React from 'react';
import ComponentBase from '../../ComponentBase';
import CollectionDataHandler from '../mixins/CollectionDataHandler';
import SelectionContainer from '../mixins/SelectionContainer';

export default class DataList extends SelectionContainer(CollectionDataHandler(ComponentBase)) {

    children = [];

    renderComponent(data) {

        const {
            recordKey,
            minWidth,
            minHeight,
            renderItem
        } = this.props;

        let scroll = {
            x: minWidth,
            y: minHeight
        };

        const {
            sorters
        } = this.state;

        return (
            <ul className="ant-list-items">
                {this.renderItems(data)}
                {this.renderPager()}
            </ul>
            //<div>
            //    <List
            //        rowKey={recordKey.toString()}
            //        renderItem={renderItem}
            //        dataSource={data}
            //        size="middle"
            //        pagination={false}
            //        scroll={scroll}
            //        onChange={this.handleChange}
            //    />
            //    {this.renderPager()}
            //</div>
        );
    }

    renderItems(data) {

        const {
            recordKey,
            renderItem
        } = this.props;

        return data.map(item => {

            return React.cloneElement(
                renderItem(item),
                {
                    parent: this,
                    data: item,
                    key: item[recordKey],
                    selected: this.isSelected(item, (i1, i2) => i1[recordKey] === i2[recordKey])
                }
            );
        })
    }
}