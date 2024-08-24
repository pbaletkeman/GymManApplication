import { PropTypes } from "prop-types";
// import { Steps } from "./Steps";
import { ListExercise } from "./List";

function CreateExercise() {
  return <div>Create Exercise</div>;
}

function UpdateExercise({ exerciseId }) {
  return <div>Update Exercise {exerciseId}</div>;
}

function SingleExercise({ exerciseId }) {
  return <div>Signle Exercise {exerciseId}</div>;
}

export function Excerise() {
  return (
    <>
      <CreateExercise />
      <UpdateExercise exerciseId={0} />
      <ListExercise />
      <SingleExercise exerciseId={0} />
      {/* <Steps /> */}
    </>
  );
}

UpdateExercise.propTypes = {
  exerciseId: PropTypes.number,
};

SingleExercise.propTypes = {
  exerciseId: PropTypes.number,
};
