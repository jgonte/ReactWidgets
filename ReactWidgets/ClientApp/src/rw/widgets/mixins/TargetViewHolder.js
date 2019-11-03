// Holds a reference to a target view
import componentManager from '../../componentManager';

const TargetViewHolder = Base => class extends Base {

    targetViewId = '';

    constructor(props) {

        super(props);

        const {
            targetViewId
        } = props;

        this.targetViewId = targetViewId || this.targetViewId;
    }

    getTargetView() {

        if (!this.targetViewId) {

            throw new Error('Target view must have an Id');
        }

        return componentManager.get(this.targetViewId);
    }
}

export default TargetViewHolder;