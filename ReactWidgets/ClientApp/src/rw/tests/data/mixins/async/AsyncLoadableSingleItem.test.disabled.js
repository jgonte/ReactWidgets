//import AsyncLoadableSingleItem from '../../../../data/mixins/async/AsyncLoadableSingleItem';

//class TestComponent {
//    _setState = state => this.state = state;
//}

//class AsyncLoadableSingleItemTestComponent extends AsyncLoadableSingleItem(TestComponent) {
//}

//test('AsyncLoadableSingleItemTestComponent load error', async () => {

//    const cmp = new AsyncLoadableSingleItemTestComponent({
//        loadUrl: 'http://localhost:1234/api/ItDoesNotExist', // Invalid URL
//        onLoadError: error => console.log(error)
//    });

//    await cmp.load();

//    expect(cmp.state.error).toBe("Network request failed");
//});