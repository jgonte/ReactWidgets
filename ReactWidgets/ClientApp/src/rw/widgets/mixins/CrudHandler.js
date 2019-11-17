import React from 'react';
import Container from './Container';
import { Button } from 'antd';

// Connect dialogs to the component to perform CRUD operations
const CrudHandler = (Base) => class extends Container(Base) {

    isAddable = () => this.props.createItemDialog;

    isEditable = () => this.props.updateItemDialog;

    isDeletable = () => this.props.deleteItemDialog;

    render() {

        if (!this.props.loadableComponent) {

            throw new Error('Loadable component is required');
        }

        const loadableComponent = React.cloneElement(
            this.props.loadableComponent,
            {
                parent: this,
                itemId: 'loadableComponent',
                actionColumns: this.getActionColumns()
            }
        );

        return (
            <div>
                {this.renderAddButton()}
                {loadableComponent}
                {this.renderAddItemDialog()}
                {this.renderEditItemDialog()}
                {this.renderDeleteItemDialog()}
            </div>
        );
    }

    renderAddButton() {

        if (!this.isAddable()) {

            return null;
        }

        return (
            <div style={{ margin: '10px' }}>
                <Button
                    type="primary"
                    ghost
                    icon="plus-circle"
                    onClick={() => this.createItemDialog.show()}
                >
                    {this.props.addItemButton.label}
                </Button>
            </div >
        );
    }

    renderAddItemDialog() {

        if (!this.isAddable()) {

            return null;
        }

        return React.cloneElement(
            this.props.createItemDialog,
            {
                parent: this,
                itemId: 'createItemDialog'
            }
        );
    }

    renderEditItemDialog() {

        if (!this.isEditable()) {

            return null;
        }

        return React.cloneElement(
            this.props.updateItemDialog,
            {
                parent: this,
                itemId: 'updateItemDialog'
            }
        );
    }

    showEditDialog(record) {

        const dialog = this.updateItemDialog;

        const params = this.buildParams(record);

        dialog.setParams(params);

        dialog.show();
    }

    renderDeleteItemDialog() {

        if (!this.isDeletable()) {

            return null;
        }

        return React.cloneElement(
            this.props.deleteItemDialog,
            {
                parent: this,
                itemId: 'deleteItemDialog'
            }
        );
    }

    showDeleteDialog(record) {

        const dialog = this.deleteItemDialog;

        const params = this.buildParams(record);

        dialog.setParams(params);

        dialog.show();
    }

    // Builds the parameters to update or delete according to the record key
    buildParams(record) {

        const o = {};

        var recordKey = this.loadableComponent.props.recordKey;

        recordKey.forEach(el => o[el] = record[el]);

        return o;
    }

    getActionColumns() {

        let actionColumns = [];

        if (this.isEditable()) {

            actionColumns.push({
                name: 'edit',
                key: 'edit',
                render: (text, record) => (
                    <Button
                        type="primary"
                        ghost
                        icon="edit"
                        onClick={() => this.showEditDialog(record)}
                    >
                        Edit
                    </Button>
                )
            });
        }

        if (this.isDeletable()) {

            actionColumns.push({
                name: 'delete',
                key: 'delete',
                render: (text, record) => (
                    <Button
                        type="danger"
                        ghost
                        icon="delete"
                        onClick={() => this.showDeleteDialog(record)}
                    >
                        Delete
                    </Button>
                )
            });
        }

        return actionColumns;
    }
};

export default CrudHandler;