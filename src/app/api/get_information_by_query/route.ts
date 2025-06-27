export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("受け取ったデータ:", body);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const endpointURL = `${apiBaseUrl}/api/locations/ai-search`;

    const params = new URLSearchParams();

    // フリーワード
    params.append("keyword", body.keyword || "*");

    // カテゴリー
    if (body.categories?.length) {
      body.categories.forEach((cat: string) => params.append("categories", cat));
    }

    // エリア（List[str] を想定）
    if (Array.isArray(body.area)) {
      body.area.forEach((area: string) => params.append("area_keyword", area));
    }

    // 金額（日単位）
    if (Array.isArray(body.price_day)) {
      if (body.price_day[0] != null) {
        params.append("price_day_min", String(body.price_day[0]));
      }
      if (body.price_day[1] != null) {
        params.append("price_day_max", String(body.price_day[1]));
      }
    }

    // 金額（時間単位）
    if (Array.isArray(body.price_hour)) {
      if (body.price_hour[0] != null) {
        params.append("price_hour_min", String(body.price_hour[0]));
      }
      if (body.price_hour[1] != null) {
        params.append("price_hour_max", String(body.price_hour[1]));
      }
    }

    // APIへGETリクエスト
    const response = await fetch(`${endpointURL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`FastAPI呼び出しエラー status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("検索API中継エラー:", error);
    return NextResponse.json(
      { message: "リクエスト処理中にエラーが発生しました", error: error.message },
      { status: 500 }
    );
  }
}