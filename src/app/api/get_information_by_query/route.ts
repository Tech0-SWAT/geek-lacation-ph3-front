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

    // facilities（設備）- 複数可能
    if (body.facilities?.length) {
      body.facilities.forEach((facility: string) => params.append("facilities", facility));
    }

    // people_min/people_max（利用人数）
    if (body.userCount) {
      if (body.userCount.start != null) {
        params.append("people_min", String(body.userCount.start));
      }
      if (body.userCount.end != null) {
        params.append("people_max", String(body.userCount.end));
      }
    }

    // time_min/time_max（利用時間）
    if (body.usageTime) {
      if (body.usageTime.start != null) {
        params.append("time_min", String(body.usageTime.start));
      }
      if (body.usageTime.end != null) {
        params.append("time_max", String(body.usageTime.end));
      }
    }

    // area_min/area_max（面積）
    if (body.spaceArea) {
      if (body.spaceArea.start != null) {
        params.append("area_min", String(body.spaceArea.start));
      }
      if (body.spaceArea.end != null) {
        params.append("area_max", String(body.spaceArea.end));
      }
    }

    // ceiling_min/ceiling_max（天井高）
    if (body.ceilingHeight) {
      if (body.ceilingHeight.start != null) {
        params.append("ceiling_min", String(body.ceilingHeight.start));
      }
      if (body.ceilingHeight.end != null) {
        params.append("ceiling_max", String(body.ceilingHeight.end));
      }
    }

    // payment_method（支払方法）
    if (body.payment_method?.length) {
      body.payment_method.forEach((method: string) => params.append("payment_method", method));
    }

    // APIへGETリクエスト
    const response = await fetch(`${endpointURL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`FastAPI呼び出しエラー status: ${response.status}`);
    }

    const data = await response.json();
    
    // console.log("🎯 FastAPIからのデータ:", data);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("検索API中継エラー:", error);
    return NextResponse.json(
      { message: "リクエスト処理中にエラーが発生しました", error: error.message },
      { status: 500 }
    );
  }
}