import config from '../../config';

const Styleable = (Base) => class extends Base {

    style = {};

    fit = true;

    constructor(props) {

        super(props);

        const {
            styleProvider,
            style
        } = props;

        this.styleProvider = styleProvider || config.defaultStyleProvider;

        if (typeof props.fit !== 'undefined') {

            this.fit = props.fit;
        }

        let width = (style || this.style).width;

        let height = (style || this.style).height;

        this.style = { 
            ...this.style, 
            ...style, 
            width: this.fit ? width || '100%' : width,
            height: this.fit ? width || 'auto' : height
        };
    }

    getMergedCssClass(props, callback) {

        let cssClass = callback();

        const {
            className
        } = props;

        if (className) {

            cssClass = `${cssClass} ${className}`;
        }

        return cssClass;
    }
}

export default Styleable;