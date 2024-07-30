import { PropTypes } from "prop-types";

function CreateStep({ exerciseId }) {
    return (<div>Create Step {exerciseId}</div>);
}

function UpdateStep({ stepId, exerciseId }) {
    return (<div>Update Step {stepId}, {exerciseId}</div>);
}

function ListSteps({ exerciseId }) {
    return (<div>List Steps {exerciseId}</div>);
}

function SingleStep({ stepId, exerciseId }) {
    return (<div>Single Step {stepId} {exerciseId}</div>);
}

export function Steps() {
    return (<>
        <CreateStep exerciseId={0} />
        <UpdateStep exerciseId={0} stepId={0} />
        <ListSteps exerciseId={0} />
        <SingleStep exerciseId={0} stepId={0} />
    </>);
}

CreateStep.propTypes = {
    exerciseId: PropTypes.number,
};

UpdateStep.propTypes = {
    stepId: PropTypes.number,
    exerciseId: PropTypes.number,
};

ListSteps.propTypes = {
    exerciseId: PropTypes.number,
};

SingleStep.propTypes = {
    stepId: PropTypes.number,
    exerciseId: PropTypes.number,
};
