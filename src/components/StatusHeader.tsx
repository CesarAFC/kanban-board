type HeaderProps = {
    header: string,
    count: number
}

interface HeaderStyle {
    [key: string]: string;
  }

function StatusHeader({header, count}: HeaderProps) {

    const headerStyle: HeaderStyle = {
        todo: 'bg-slate-500',
        inProgress: 'bg-purple-500',
        closed: 'bg-green-500',
      }

  return (
    <div className={`${headerStyle[header]} flex items-center h-12 pl-4 mb-4 shadow-md rounded-md uppercase text-sm text-white duration-500`}>
        {header}<div className="ml-2 bg-white w-5 h-5 text-black rounded-full text-center">{count}</div>
    </div>
  )
}

export default StatusHeader