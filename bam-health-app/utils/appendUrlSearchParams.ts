enum ObjectEntry {
  Key,
  Value
}

export const appendUrlSearchParams = (params: any) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach((param) => {
    searchParams.append(
      param[ObjectEntry.Key],
      param[ObjectEntry.Value] as string
    );
  });
  return searchParams;
};