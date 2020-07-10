import { Link, withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { SortByDirection, Table, TableBody, TableHeader, sortable, TableVariant } from '@patternfly/react-table';

import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import TimesCircleIcon from '@patternfly/react-icons/dist/js/icons/times-circle-icon';
import PropTypes from 'prop-types';

const ContentTable = ({ data, searchText = '' }) => {
    const columns = [
        { title: 'Active', transforms: [sortable] },
        { title: 'Plugin', transforms: [sortable] },
        { title: 'Error Key', transforms: [sortable] },
        { title: 'Product Code', transforms: [sortable] },
        { title: 'Role', transforms: [sortable] },
        { title: 'Category', transforms: [sortable] },
        { title: 'Hits', transforms: [sortable] }
    ];
    const [sort, setSort] = useState({ index: 1, direction: 'asc' });
    const [rows, setRows] = useState([]);

    const sortBy = (key) => {
        return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
    };

    const buildRows = (data) => data.flatMap((item, key) => {
        const isValidSearchText = searchText.length === 0
            || item.name.toLowerCase().includes(searchText.toLowerCase())
            || item.plugin.toLowerCase().includes(searchText.toLowerCase())
            || item.error_key.toLowerCase().includes(searchText.toLowerCase());

        return isValidSearchText ? [{
            cells: [{
                title: <span key={key}> {item.status === 'active' ? <CheckCircleIcon /> : <TimesCircleIcon />}</span>
            }, {
                title: <Link key={key} to={`${item.rule_id}`}> {item.plugin} </Link>
            }, `${item.error_key}`, `${item.product_code}`, `${item.role}`, `${item.category}`, 'fix me']
        }] : [];
    });

    const onSort = (_event, index, direction) => {
        const sortAttr = { 0: 'status', 1: 'plugin', 2: 'error_key', 3: 'product_code', 4: 'role', 5: 'category' };
        const sortedData = data.asMutable().concat().sort(sortBy(sortAttr[index]));
        setSort({ index, direction });
        setRows(buildRows(direction === SortByDirection.asc ? sortedData : sortedData.reverse()));
    };

    useEffect(() => {
        sort.index ? onSort(null, sort.index, sort.direction) : setRows(buildRows(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, searchText]);

    return <Table aria-label="content preview table" variant={TableVariant.compact} sortBy={sort} onSort={onSort} cells={columns} rows={rows}>
        <TableHeader />
        <TableBody />
    </Table>;
};

ContentTable.propTypes = {
    data: PropTypes.array,
    searchText: PropTypes.string
};

export default withRouter(ContentTable);
