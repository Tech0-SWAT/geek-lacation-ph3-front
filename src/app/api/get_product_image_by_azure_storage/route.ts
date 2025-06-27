// /src/app/api/get_product_image_by_azure_storage/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');
    console.log("ProductImage API: Received fileName =", fileName);
    
    if (!fileName) {
      console.log("Error: fileName is missing in the request");
      return NextResponse.json({ error: 'fileName is required' }, { status: 400 });
    }
    
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const sasToken = process.env.SASTOKEN_PRODUCT;
    
    if (!connectionString) {
      console.log("Error: Azure Storage connection string not found");
      return NextResponse.json({ error: 'Azure Storage connection string not found' }, { status: 500 });
    }
    if (!sasToken) {
      console.log("Error: SAS token not found");
      return NextResponse.json({ error: 'SAS token not found' }, { status: 500 });
    }
    
    console.log("Connecting to Blob Service...");
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = 'geek-product-image';
    console.log("Using container:", containerName);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    console.log("Getting blob client for fileName:", fileName);
    const blobClient = containerClient.getBlobClient(fileName);
    const exists = await blobClient.exists();
    console.log("Blob exists:", exists);
    if (!exists) {
      console.log("Error: Blob not found for fileName:", fileName);
      return NextResponse.json({ url: null }, { status: 200 });
    }
    const blobUrl = blobClient.url;
    const blobUrlWithSas = `${blobUrl}?${sasToken}`;
    console.log("Returning blob URL with SAS:", blobUrlWithSas);
    return NextResponse.json({ url: blobUrlWithSas }, { status: 200 });
  } catch (error: any) {
    console.error('Error in product image API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
