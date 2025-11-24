import localData from "@/data/cats.json";

const REMOTE_URL = "https://data.latelier.co/cats.json";

type CatImage = {
  id: string;
  url: string;
};

type CatsResponse = {
  images: CatImage[];
};

export async function getCats(): Promise<CatsResponse> {
  try {
    const res = await fetch(REMOTE_URL, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error("Remote fetch failed");
    }
    return (await res.json()) as CatsResponse;
  } catch (e) {
    console.warn(
      "⚠️ Impossible de joindre l'API distante, fallback sur le JSON local: ",
      e
    );
    return localData as CatsResponse;
  }
}
