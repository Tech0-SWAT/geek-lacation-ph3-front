import { Creator, CreatorData } from "@/app/types/types";

export const dynamic = 'force-dynamic';

export async function fetchCreatorDetail(creator_id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/creator/${creator_id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`クリエイター情報の取得に失敗しました: ${res.status}`);
  }

  const json = await res.json();

  return json as CreatorData;
}

export async function fetchRelatedWorks(params: {
  creator_id: string;
  limit?: number;
  page?: number;
  internal_matter?: boolean;
  sort?: string;
}) {
  const { creator_id, limit = 10, page = 1, internal_matter = false, sort = "updated_desc" } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const url = `${baseUrl}/creator/${creator_id}/relatedworks?limit=${limit}&page=${page}&internal_matter=${internal_matter}&sort=${sort}`;

  console.log("fetchRelatedGeekWorks URL:", url);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`関連作品の取得に失敗しました: ${res.status}`);
  }

  return res.json();
}

export async function fetchRelatedStaffs(params: {
  creator_id: string;
  limit?: number;
  page?: number;
  sort?: string;
  internal_matter?: boolean;
}) {
  const { creator_id, limit = 10, page = 1, sort = "matters_desc" } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const url = `${baseUrl}/creator/${creator_id}/relatedstaff?limit=${limit}&page=${page}&sort=${sort}`;

  console.log("fetchRelatedStaffs URL:", url);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`関連スタッフの取得に失敗しました: ${res.status}`);
  }

  return res.json();
}


// import { Creator } from "@/app/types/types";

// export const dynamic = 'force-dynamic';

// // Next.js API Routes 経由でCORSを回避
// export async function fetchCreatorDetail(creator_id: string) {
//   const url = `/api/proxy/creator/${creator_id}`; // ✅修正ポイント

//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error(`クリエイター情報の取得に失敗しました: ${res.status}`);
//   }

//   return (await res.json()) as Creator;
// }

// export async function fetchRelatedGeekWorks(params: {
//   creator_id: string;
//   limit?: number;
//   page?: number;
//   internal_matter?: boolean;
//   sort?: string;
// }) {
//   const {
//     creator_id,
//     limit = 10,
//     page = 1,
//     internal_matter = false,
//     sort = "updated_desc",
//   } = params;

//   const query = new URLSearchParams({
//     limit: limit.toString(),
//     page: page.toString(),
//     internal_matter: internal_matter.toString(),
//     sort,
//   });

//   const url = `/api/proxy/creator/${creator_id}/relatedworks?${query.toString()}`;

//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error(`関連作品の取得に失敗しました: ${res.status}`);
//   }

//   return res.json();
// }

// export async function fetchRelatedStaffs(params: {
//   creator_id: string;
//   limit?: number;
//   page?: number;
//   sort?: string;
//   internal_matter?: boolean;
// }) {
//   const {
//     creator_id,
//     limit = 10,
//     page = 1,
//     sort = "matters_desc",
//     internal_matter = false,
//   } = params;

//   const query = new URLSearchParams({
//     limit: limit.toString(),
//     page: page.toString(),
//     sort,
//     internal_matter: internal_matter.toString(),
//   });

//   const url = `/api/proxy/creator/${creator_id}/relatedstaff?${query.toString()}`;

//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error(`関連スタッフの取得に失敗しました: ${res.status}`);
//   }

//   return res.json();
// }
