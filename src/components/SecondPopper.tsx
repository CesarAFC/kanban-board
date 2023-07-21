import { useState } from 'react';
import { usePopper } from 'react-popper';

type Popperprops = {
    isOpen: boolean,
    referenceElement: any
}

export const SecondPopper = ({isOpen, referenceElement }: Popperprops) => {

//   const [isOpen, setIsOpen] = useState(false);
//   const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: 'top'
  });

  return (
    <>
      {/* <button
        type="button"
        ref={setReferenceElement}
        onClick={() => setIsOpen(!isOpen)}
      >
        Reference element
      </button> */}

      {isOpen && (
        <div
          className="bg-emerald-300 p-2 rounded-md"
          ref={setPopperElement as any}
          style={styles.popper}
          {...attributes.popper}
        >
          <button
            value="high"
            className="disabled:text-slate-400 hover:bg-slate-400 px-1 rounded-sm transition"
          >
            High
          </button>
          <button
            value="low"
            className="hover:bg-slate-400 px-1 rounded-sm transition"
          >
            Low
          </button>
          <button
            value="mid"
            className="hover:bg-slate-400 px-1 rounded-sm transition"
          >
            Mid
          </button>
          <div
            className="h-0 w-0 m-2 border-x-4 border-x-transparent border-t-4 border-t-emerald-300 font-semibold"
            ref={setArrowElement as any}
            style={styles.arrow}
          />
        </div>
      )}
    </>
  );
};