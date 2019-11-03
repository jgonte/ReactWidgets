import React from 'react';
import Pager from '../pagers/Pager';

const Pageable = (Base) => class extends Base {

    pageable = true;

    constructor(props) {

        super(props);

        if (typeof props.pageable !== 'undefined') {

            this.pageable = props.pageable;
        }

        this.state = {
            ...this.state,
            currentPage: 1,
            pageSize: 10
        };
    }

    renderPager() {

        const {
            data,
            currentPage,
            pageSize,
            totalCount,
            totalPages
        } = this.state;

        if (!this.pageable || !data.length) {

            return;
        }
        
        return (
            <Pager
                pagedView={this}
                pageIndex={currentPage}
                pageSize={pageSize}
                totalRecords={totalCount}
                totalPages={totalPages}
            />
        );
    }

    paginate(currentPage, pageSize) {

        this.state = {
            ...this.state,
            currentPage,
            pageSize
        };

        this.updateData();
    }
};

export default Pageable;