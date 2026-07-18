import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/server/auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const extensionByMime = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

function hasValidSignature(bytes: Uint8Array, mime: string) {
  if (mime === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (mime === "image/png") return bytes.slice(0, 8).every((value, index) => value === [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a][index]);
  if (mime === "image/gif") return new TextDecoder().decode(bytes.slice(0, 6)) === "GIF87a" || new TextDecoder().decode(bytes.slice(0, 6)) === "GIF89a";
  if (mime === "image/webp") return new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" && new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP";
  return false;
}

export async function POST(request: Request) {
  const context = await getAuthenticatedAdmin();
  if (!context) return NextResponse.json({ message: "관리자 인증이 필요합니다." }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "이미지 파일이 필요합니다." }, { status: 400 });

  const extension = extensionByMime.get(file.type);
  if (!extension || file.size <= 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ message: "JPG, PNG, WebP, GIF 이미지를 5MB 이하로 업로드해 주세요." }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!hasValidSignature(bytes, file.type)) {
    return NextResponse.json({ message: "파일 내용과 이미지 형식이 일치하지 않습니다." }, { status: 400 });
  }

  const path = `${context.user.id}/${crypto.randomUUID()}.${extension}`;
  const { error } = await context.supabase.storage.from("portfolio-media").upload(path, bytes, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false,
  });

  if (error) return NextResponse.json({ message: `업로드 실패: ${error.message}` }, { status: 500 });
  const { data } = context.supabase.storage.from("portfolio-media").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path }, { status: 201 });
}
