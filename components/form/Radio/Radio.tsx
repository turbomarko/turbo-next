import { Base, Note } from "@/components/text";

type Props = {
  name: string;
  value: string;
  options: {value: string, label: string, note?: string}[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isAlternative?: boolean;
};

export default (props: Props) => {
  return (
    <>
      {props.options.map(item => (
        <div
          key={item.value}
          className={`
            flex items-start
            ${props.isAlternative ? "my-0.5" : "my-3"}
          `}
        >
          <input
            type="radio"
            id={item.value}
            name={props.name}
            value={item.value}
            required
            onChange={props.onChange}
            checked={props.value === item.value}
            className={`
              relative float-left mt-0.5 h-2 w-2 appearance-none rounded-full border-8 border-solid before:pointer-events-none before:absolute before:h-2 before:w-2 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-2 after:w-2 after:rounded-full after:content-[''] checked:before:opacity-1 checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.325rem] checked:after:w-[0.325rem] checked:after:rounded-full checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-1 focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]
              ${props.isAlternative ? "border-primary checked:border-primary checked:after:border-primary checked:after:bg-secondary checked:focus:border-primary mr-2" : "border-card checked:border-card checked:after:border-card checked:after:bg-secondary checked:focus:border-card mr-3"}
            `}
          />
          <label htmlFor={item.value}>
            <Base>{item.label}</Base>
            <Note>{item.note}</Note>
          </label>
        </div>
      ))}
    </>
  );
};
