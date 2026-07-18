import type { Metadata } from "next";
import { updateInquiryStatusAction } from "@/app/admin/(protected)/inquiries/actions";
import { requireAdmin } from "@/server/auth";

export const metadata: Metadata = { title: "문의 관리" };
const statusLabels: Record<string, string> = { new: "새 문의", in_progress: "처리 중", resolved: "완료", spam: "스팸" };

export default async function AdminInquiriesPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("inquiries").select("id,inquiry_type,name,email,company,message,status,created_at").order("created_at", { ascending: false }).limit(100);
  if (error) throw new Error(`문의를 불러오지 못했습니다: ${error.message}`);

  return (
    <div>
      <p className="mb-2 text-sm font-bold tracking-widest text-primary-light uppercase">Inquiry Inbox</p>
      <h1 className="mb-8 text-3xl font-black">문의 관리</h1>
      {!data?.length ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center text-slate-400">접수된 문의가 없습니다.</div>
      ) : (
        <div className="space-y-4">
          {data.map((inquiry) => (
            <article key={inquiry.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div><h2 className="font-bold text-white">{inquiry.name} <span className="font-normal text-slate-500">{inquiry.company || "개인"}</span></h2><a href={`mailto:${inquiry.email}`} className="text-sm text-primary-light">{inquiry.email}</a></div>
                <time className="text-xs text-slate-500">{new Date(inquiry.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</time>
              </div>
              <p className="mb-5 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{inquiry.message}</p>
              <form action={updateInquiryStatusAction} className="flex items-center gap-3">
                <input type="hidden" name="inquiry_id" value={inquiry.id} />
                <select name="status" defaultValue={inquiry.status} className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white">
                  {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <button type="submit" className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:border-primary/50">상태 저장</button>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
