import AsyncLoadableCollection from '../../../../data/mixins/async/AsyncLoadableCollection';

class TestComponent {
    _setState = state => this.state = state;
}

class AsyncLoadableCollectionTestComponent extends AsyncLoadableCollection(TestComponent) {
}

test('AsyncLoadableCollectionTestComponent load error', async () => {

    const cmp = new AsyncLoadableCollectionTestComponent({
        loadUrl: 'http://localhost:1234/api/ItDoesNotExist', // Invalid URL
        onLoadError: error => console.log(error)
    });

    await cmp.load();

    expect(cmp.state.error).toBe("Network request failed");
});

test('AsyncLoadableCollectionTestComponent load without extra parameters', async() => {

    const cmp = new AsyncLoadableCollectionTestComponent({
        loadUrl: 'http://localhost:3856/api/SampleData/WeatherForecasts',
        onLoadData: data => console.log(data)
    });

    await cmp.load();

    expect(cmp.state.data).toBe("");
});