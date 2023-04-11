export function exclude(data: any, keys: string[]) {
  for (const key of keys) {
    delete data[key];
  }

  return data;
}
