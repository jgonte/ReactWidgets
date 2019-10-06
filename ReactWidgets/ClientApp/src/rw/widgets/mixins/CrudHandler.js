import React from 'react';
import Container from './Container';
import { Button } from 'antd';

// Connect dialogs to the component to perform CRUD operations
const CrudHandler = (Base) => class extends Container(Base) {

    isEditable = () => this.props.updateItemDialog;

    render() {

        const loadableComponent = React.cloneElement(
            this.props.loadableComponent,
            {
                parent: this,
                itemId: 'loadableComponent',
                actionColumns: this.getActionColumns()
            }
        );

        const createItemDialog = React.cloneElement(
            this.props.createItemDialog,
            {
                parent: this,
                itemId: 'createItemDialog'
            }
        );

        const deleteItemDialog = React.cloneElement(
            this.props.deleteItemDialog,
            {
                parent: this,
                itemId: 'deleteItemDialog'
            }
        );

        return (
            <div>
                {this.renderAddButton()}
                {loadableComponent}
                {createItemDialog}
                {this.renderEditItemDialog()}
                {deleteItemDialog}
            </div>
        );
    }

    renderAddButton() {

        return (
            <Button
                type="primary"
                icon="plus"
                onClick={() => this.createItemDialog.show()}
            >
                {this.props.addItemButton.label}
            </Button>
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
                        icon="edit"
                        onClick={() => this.showEditDialog(record)}
                    >
                        Edit
                    </Button>
                )
            });
        }

        actionColumns.push({
            name: 'delete',
            key: 'delete',
            render: (text, record) => (
                <Button
                    icon="delete"
                    onClick={() => this.showDeleteDialog(record)}
                >
                    Delete
                    </Button>
            )
        });

        return actionColumns;
    }
};

export default CrudHandler;