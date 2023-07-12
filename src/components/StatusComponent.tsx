import StatusSingle from "./StatusSingle";

type StatusProps = {
}

function StatusComponent({}: StatusProps) {

    // Different status for the todos
    const taskState = ["todo", "inProgress", "closed"]; 

  return (
    <div className="flex gap-16">
      {
      taskState.map( status => (
        <StatusSingle key={status} status={status} />
      ))
      }

    </div>
  );
}

export default StatusComponent