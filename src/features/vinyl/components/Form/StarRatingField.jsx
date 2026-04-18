import { useWatch } from "react-hook-form";

//純顯示模式
const StarDisplay = ({ value }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`text-sm ${star <= value ? "text-yellow-400" : "text-gray-600"}`}
      >
        ★
      </span>
    ))}
  </div>
);

//編輯模式
const StarEditable = ({ name, control, setValue, size }) => {
  const watchRating = useWatch({
    control,
    name,
    defaultValue: 0,
  });

  const current = Number(watchRating) || 0;

  const handleStarClick = (clickedStar) => {
    const target = Number(clickedStar);
    const newValue = target === current ? 0 : target;
    setValue(name, newValue, { shouldValidate: true });
  };

  return (
    <div className="flex pr-1 items-center">
      <div className="flex gap-0.5 pr-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            className={`${size} transition-transform hover:scale-110 ${
              star <= watchRating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <span className="text-sm font-mono text-gray-500 tabular-nums">
        {current}/5
      </span>
    </div>
  );
};

export const StarRatingField = (props) => {
  if (props.readonly) return <StarDisplay value={props.value || 0} />;

  return <StarEditable {...props} />;
};
