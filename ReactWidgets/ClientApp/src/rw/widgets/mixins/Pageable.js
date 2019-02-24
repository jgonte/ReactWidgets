import React from 'react';
import Pager from '../pagers/Pager';

const Pageable = (Base) => class extends Base {

    pageable = true;

    constructor(props) {

        super(props);

        if (typeof props.pageable !== 'undefined') {

            this.pageable = props.pageable;
        }

        this.state = { ...this.state, pageIndex: 1, pageSize: 10 };
    }

    renderPager() {

        if (!this.pageable) {

            return;
        }

        const {
            pageIndex,
            pageSize
        } = this.state;

        const metadata = this.metadata || {};

        const {
            totalPages,
            totalRecords
        } = metadata;

        return (
            <Pager
                pagedView={this}
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalRecords={totalRecords}
                totalPages={totalPages}
            />
        );
    }

    paginate(pageIndex, pageSize) {

        this.state = { ...this.state, pageIndex, pageSize };

        this.updateData();
    }
};

export default Pageable;