import { Button } from '@/components/ui/Button';

export function UploadForm() {
  return (
    <div className="rounded-2xl border border-violet-500/20 bg-slate-900/70 p-6">
      <h3 className="text-xl font-bold text-white">Upload media</h3>
      <div className="mt-4 rounded-xl border border-dashed border-violet-500/40 bg-slate-950/80 p-8 text-center text-slate-400">
        Drop files here or browse
      </div>
      <div className="mt-4">
        <Button className="bg-gradient-to-r from-violet-500 to-cyan-400 text-slate-950">Select files</Button>
      </div>
    </div>
  );
}
