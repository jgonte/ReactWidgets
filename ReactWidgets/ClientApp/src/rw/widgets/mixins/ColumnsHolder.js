const ColumnsHolder = (Base) => class extends Base {

    sortingColumnName = null;

    constructor(props) {

        super(props);

        const { columns } = props;

        if (columns) {

            this.state = { ...this.state, columns };
        }
    }

    sort(name, sortDirection) {

        let columns = this.state.columns.map(column => {

            if (column.name === name) {

                return { ...column, sortDirection };
            }
            else {

                if (column.name === this.sortingColumnName) {

                    return { ...column, sortDirection: null };
                }

                return { ...column };
            }
        });

        if (name !== this.sortingColumnName) {

            this.sortingColumnName = name;
        }

        this.state = { ...this.state, columns };

        this.updateData();
    }
};

export default ColumnsHolder;
