import Image from "next/image";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[calc(100svh-70px)] items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl text-slate-900 dark:text-slate-200">
        <div className="mb-8 flex justify-center">
          <Image
            alt="Payment Success"
            className="h-auto w-auto"
            height={200}
            src="/success.png"
            width={200}
          />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="font-bold text-2xl text-slate-900 dark:text-slate-50">
            Payment Successful
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Your transaction has been processed.
          </p>
        </div>

        <div className="mt-10 space-y-3 rounded-xl border border-slate-200 p-6 text-sm dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Payment ID
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              PAY-000000
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Status</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Successful
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Plan</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              Hyperscaler AI Pro
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
