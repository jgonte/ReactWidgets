import React from 'react';
import Pager from '../pagers/Pager';

const Paginable = (Base) => class extends Base {

    paginable = true;

    constructor(props) {

        super(props);

        if (typeof props.paginable !== 'undefined') {

            this.paginable = props.paginable;
        }

        this.state = { ...this.state, pageIndex: 1, pageSize: 10 };
    }

    renderPager(props) {

        if (!this.paginable) {

            return;
        }

        const {
            pageIndex,
            pageSize,
            totalRecords
        } = props;

        const totalPages = props.totalPages || Math.ceil(totalRecords / pageSize);

        return (
            <div style={{ width: '100%', textAlign: 'center' }}>
                <Pager
                    parent={this}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    totalRecords={totalRecords}
                    totalPages={totalPages}
                />
            </div>
        );
    }

    paginate(pageIndex, pageSize) {

        this.state = { ...this.state, pageIndex, pageSize };

        this.updateData();
    }
}

export default Paginable;