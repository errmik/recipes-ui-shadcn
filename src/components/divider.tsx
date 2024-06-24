interface Props {
  text: string;
}

export const Divider = (props: Props) => {
  return (
    <div className="flex items-center">
      <div className="border border-b w-full" />
      <span className="content w-full">
        <i>{props.text}</i>
      </span>
      <div className="border border-b w-full" />
    </div>
  );
};
