export {connect} from 'react-redux';

export function createActionCreator(type) {
    return (payload, meta) => {
        const action = {type};
        if (typeof payload !== 'undefined') {
            action.payload = payload;
        }

        if (typeof meta !== 'undefined') {
            action.meta = meta;
        }

        if (payload instanceof Error) {
            action.error = true;
        }

        return action;
    };
}

export function createActionCreators(typesArray) {
    return typesArray.reduce((result, type) => {
        result[type] = createActionCreator(type);
        return result;
    }, {})
}

export const createActionTypes = (actionTypes) => (
    actionTypes.reduce((prev, current) => {
        const next = prev;
        next[current] = current;
        return next;
    }, {})
);
