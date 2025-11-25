type Cat = {
  id: string;
  url: string;
};

export const getTopCats = (cats: Cat[], matches: string[]) =>
  Object.entries(
    matches.reduce<Record<string, number>>(
      (acc, id) => ((acc[id] = (acc[id] || 0) + 1), acc),
      {}
    )
  )
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => cats.find((c) => c.id === id)!)
    .filter(Boolean);
