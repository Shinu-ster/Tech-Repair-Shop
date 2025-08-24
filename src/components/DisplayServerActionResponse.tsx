type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};

const MessageBox = ({
  type,
  content,
}: {
  type: "success" | "error";
  content: React.ReactNode;
}) => (
  <div
    className={`bg-accent px-4 py-2 my-2 rounded-lg ${
      type === "error" ? "text-red-500" : ""
    }`}
  >
    {type === "success" ? "🎉" : "🚨"} {content}
  </div>
);

export function DisplayServerActionResponse({ result }: Props) {
  const { data, serverError, validationErrors } = result;
   // Log messages here, outside JSX
  if (data?.message) {
    console.log("Success message:", data.message);
  }

  if (serverError) {
    console.log("Server error:", serverError);
  }

  if (validationErrors) {
    console.log("Validation errors:", validationErrors);
  }

  return (
    <div>
      {data?.message && (
        <MessageBox type="success" content={`Sucess: ${data?.message}`} />
      )}
      {serverError && <MessageBox type="error" content={serverError} />}
      {validationErrors && (
        <MessageBox
          type="error"
          content={Object.keys(validationErrors).map((key) => (
            <p key={key}>{`${key}: ${
              validationErrors[key as keyof typeof validationErrors]
            }`}</p>
          ))}
        />
      )}
    </div>
  );
}
