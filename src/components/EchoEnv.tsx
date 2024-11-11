export default function EchoEnv({
  variable: variableName,
}: {
  variable: string;
}) {
  const value = import.meta.env[variableName];

  return (
    <>
      <p>{value}</p>
    </>
  );
}
