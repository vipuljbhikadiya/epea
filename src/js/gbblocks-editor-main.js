export default function Alert({ text, type, onClick }) {
  let bgClass = "bg-green-50";
  let iconClass = "text-green-400 bcc-check-circle";
  let textClass = "text-green-800";
  let buttonClass = "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600  focus:ring-offset-green-50";
  switch (type) {
    case "error":
      bgClass = "bg-red-50";
      iconClass = "text-red-400 bcc-delete-circle";
      textClass = "text-red-800";
      buttonClass = "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600  focus:ring-offset-red-50";
      break;
    default:
      break;
  }

  return (
    <div className={`rounded-md bg-green-50 py-2 px-4 mt-2 ${bgClass}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <i className={`font-semibold size-5 ${iconClass}`} />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textClass}`}>{text}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={onClick}
              className={`inline-flex rounded-md bg-green-50 p-1.5 ${buttonClass} focus:outline-none focus:ring-2  focus:ring-offset-2 `}
            >
              <span className="sr-only">Dismiss</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
