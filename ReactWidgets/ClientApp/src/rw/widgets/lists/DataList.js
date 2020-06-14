import React from 'react';
import ComponentBase from '../../ComponentBase';
import CollectionDataHandler from '../mixins/CollectionDataHandler';
import SelectionContainer from '../mixins/SelectionContainer';

export default class DataList extends SelectionContainer(CollectionDataHandler(ComponentBase)) {

    children = [];

    renderComponent(data) {

        //const {
        //    minWidth,
        //    minHeight,
        //} = this.props;

        //let scroll = {
        //    x: minWidth,
        //    y: minHeight
        //};

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

            const id = Array.isArray(recordKey) ? // Multiple keys
                recordKey.map(key => item[key]) :
                item[recordKey];

            const predicate = Array.isArray(recordKey) ?
                (i1, i2) => {

                    for (var i = 0; i < recordKey.length; ++i) {

                        let key = recordKey[i];

                        if (i1[key] !== i2[key]) {

                            return false;
                        }
                    }

                    return true;
                } :
                (i1, i2) => i1[recordKey] === i2[recordKey];

            return React.cloneElement(
                renderItem(item),
                {
                    parent: this,
                    data: item,
                    key: id,
                    record: this._recordSet.getById(id),
                    selected: this.isSelected(item, predicate)
                }
            );
        })
    }
}