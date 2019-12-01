import WebComponent from '../mixins/WebComponent';
import Templated from '../mixins/Templated';

class ListItem extends Templated(WebComponent(HTMLElement)) {

}

customElements.define('wc-list-item', ListItem);