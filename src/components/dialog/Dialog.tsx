import Button from "@/components/Button/Button";

interface Props {
  title: string,
  primaryAction: {
    text: string,
    onClick: () => void,
  }
  secondaryAction: {
    text: string,
    onClick: () => void,
  }
}

export default function Dialog({title, primaryAction, secondaryAction}: Props) {
  return (
    <div className="rounded-lg bg-white p-8 shadow-2xl">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm text-gray-500"></p>
      <div className="mt-4 flex gap-2">
        <Button onClick={primaryAction.onClick}>{primaryAction.text}</Button>

        <Button onClick={secondaryAction.onClick}>
          {secondaryAction.text}
        </Button>
      </div>
    </div>
  );
}
