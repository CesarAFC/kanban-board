import StatusSingle from "./StatusSingle";

type StatusProps = {
}

function StatusComponent({}: StatusProps) {

    const taskState = ["todo", "inProgress", "closed"]; 

  return (
    <div className="flex gap-16">
      {
      taskState.map( status => (
        <StatusSingle status={status} />
      ))
      }

    </div>
  );
}

export default StatusComponent