import SingleItemLoader from '../../../data/loaders/SingleItemLoader';

test('SingleItemLoader returns an URL with no parameters', () => {

    const loader = new SingleItemLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl()).toBe('http://localhost:1234/api/fields');
});

test('SingleItemLoader returns an URL with $select in fields', () => {

    const loader = new SingleItemLoader({
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

test('SingleItemLoader returns an URL with extra parameters', () => {

    const loader = new SingleItemLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        params: {
            param1: 123,
            param2: 'Param2'
        }
    })).toBe("http://localhost:1234/api/fields?param1=123&param2=Param2");
});

test('SingleItemLoader returns an URL with a combination of all above', () => {

    const loader = new SingleItemLoader({
        url: 'http://localhost:1234/api/fields'
    });

    expect(loader.buildUrl({
        fields: [
            'Field1',
            'Field2',
            'Field3'
        ],
        params: {
            param1: 123,
            param2: 'Param2'
        }
    })).toBe("http://localhost:1234/api/fields?$select=Field1,Field2,Field3&param1=123&param2=Param2");
});
