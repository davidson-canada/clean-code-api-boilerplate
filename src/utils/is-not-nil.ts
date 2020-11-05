export function isNotNil<A>(input: A | undefined | null): input is A {
  return input !== undefined && input !== null;
}
