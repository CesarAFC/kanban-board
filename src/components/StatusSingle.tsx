import StatusHeader from "./StatusHeader"

type StatusProps = {
    status: string
}

function StatusSingle({status}: StatusProps) {
  return (
    <div className={`w-72 rounded-md p-2 bg-slate-200`}>
      <StatusHeader header={status} />
      <div className="h-96">
        <h2>Tasks</h2>
      </div>
    </div>
  );
}

export default StatusSingle