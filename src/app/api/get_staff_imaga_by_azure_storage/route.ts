export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let fileName = searchParams.get("fileName");
    if (!fileName) {
      return NextResponse.json({ error: "fileName is required" }, { status: 400 });
    }
    // fileName が "w13.png" だった場合は "w12.png" に変更
    if (fileName === "w13.png") {
      console.log("filename",fileName)
    }



    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const sasToken = process.env.SASTOKEN_IMAGE;

    if (!connectionString) {
      throw new Error("Azure Storage connection string not found");
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const primaryContainer = "geek-staff-image"; // 変更必要に応じて
    const secondaryContainer = "geek-dummy-image"; // 変更必要に応じて

    const tryGetBlobUrl = async (containerName: string, fileName: string) => {
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobClient = containerClient.getBlobClient(fileName);
      const exists = await blobClient.exists();
      return exists ? blobClient.url : null;
    };

    
    let blobUrl = await tryGetBlobUrl(primaryContainer, fileName);
    if (!blobUrl) {
      blobUrl = await tryGetBlobUrl(secondaryContainer, fileName);
    }
    // secondaryContainer も null の場合、fileName を "m14.png" に置き換えて再度チェック
    if (!blobUrl) {
      blobUrl = await tryGetBlobUrl(secondaryContainer, "m14.png");
      console.log("2nd secondary (fallback m14.png):", blobUrl);
    }


    if (!blobUrl) {
      return NextResponse.json({ error: "Blob not found in any container" }, { status: 404 });
    }
    const blobUrlWithSas = `${blobUrl}?${sasToken}`;
    return NextResponse.json({ url: blobUrlWithSas });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
