import CollectionLoader from '../../../data/loaders/CollectionLoader';
import ComparisonOperators from '../../../data/ComparisonOperators';
import StringFunctions from '../../../data/StringFunctions';
import LogicalOperators from '../../../data/LogicalOperators';

test('CollectionLoader returns an URL with no parameters', () => {

    const loader = new CollectionLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl()).toBe('http://localhost:1234/api/fields');
});

test('CollectionLoader returns an URL with $top and $skip', () => {

    const loader = new CollectionLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        top: 5,
        skip: 2
    })).toBe("http://localhost:1234/api/fields?$top=5&$skip=2");
});

test('CollectionLoader returns an URL with $select in fields', () => {

    const loader = new CollectionLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        fields: [
            'Field1',
            'Field2',
            'Field3'
        ]
    })).toBe('http://localhost:1234/api/fields?$select=Field1,Field2,Field3');
});

test('CollectionLoader returns an URL with $filter contains field', () => {

    const loader = new CollectionLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        filter: {
            fieldName: 'Field1',
            operator: StringFunctions.Contains,
            value: 'ABC'
        }
    })).toBe("http://localhost:1234/api/fields?$filter=contains(Field1, 'ABC')");
});

test('CollectionLoader returns an URL with $filter not contains fieldName', () => {

    const loader = new CollectionLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        filter: {
            operator: LogicalOperators.Not,
            filter:
            {
                fieldName: 'Field1',
                operator: StringFunctions.Contains,
                value: 'ABC'
            }
        }
    })).toBe("http://localhost:1234/api/fields?$filter=not contains(Field1, 'ABC')");
});

test('CollectionLoader returns an URL with $filter composite filter using not contains and eq in fields', () => {

    const loader = new CollectionLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        filter: {
            operator: LogicalOperators.And,
            filters: [
                {
                    operator: LogicalOperators.Not,
                    filter:
                    {
                        fieldName: 'Field1',
                        operator: StringFunctions.Contains,
                        value: 'ABC'
                    }
                },
                {
                    fieldName: 'Field2',
                    operator: ComparisonOperators.IsEqual,
                    value: 'def'
                }
            ]

        }
    })).toBe("http://localhost:1234/api/fields?$filter=(not contains(Field1, 'ABC') and Field2 eq 'def')");
});

test('CollectionLoader returns an URL with $orderby', () => {

    const loader = new CollectionLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        sorters: [
            {
                fieldName: 'Field1',
                order: 'asc'
            },
            {
                fieldName: 'Field2',
                order: 'desc'
            }
        ]

    })).toBe('http://localhost:1234/api/fields?$orderby=Field1 asc, Field2 desc');
});

test('CollectionLoader returns an URL with extra parameters', () => {

    const loader = new CollectionLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        params: {
            param1: 123,
            param2: 'Param2'
        }
    })).toBe("http://localhost:1234/api/fields?param1=123&param2=Param2");
});

test('CollectionLoader returns an URL with a combination of all above', () => {

    const loader = new CollectionLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        top: 5,
        skip: 2,
        fields: [
            'Field1',
            'Field2',
            'Field3'
        ],
        filter: {
            operator: 'and',
            filters: [
                {
                    operator: 'not',
                    filter:
                    {
                        fieldName: 'Field1',
                        operator: 'contains',
                        value: 'ABC'
                    }
                },
                {
                    fieldName: 'Field2',
                    operator: 'eq',
                    value: 'def'
                }
            ]

        },
        sorters: [
            {
                fieldName: 'Field1',
                order: 'asc'
            },
            {
                fieldName: 'Field2',
                order: 'desc'
            }
        ],
        params: {
            param1: 123,
            param2: 'Param2'
        }
    })).toBe("http://localhost:1234/api/fields?$top=5&$skip=2&$select=Field1,Field2,Field3&$filter=(not contains(Field1, 'ABC') and Field2 eq 'def')&$orderby=Field1 asc, Field2 desc&param1=123&param2=Param2");
});