'use client';

import Receipt from '@/components/pos/Receipt';
import { Button } from '@/components/ui/button';
import { usePOSStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function PrintPage() {
  const router = useRouter();
  const { lastCompletedOrder } = usePOSStore();

  if (!lastCompletedOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="mb-4 text-lg">No order to print.</p>
        <Button onClick={() => router.push('/pos')}>Back to POS</Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="max-w-2xl p-8 mx-auto">
        <Receipt order={lastCompletedOrder} />
        <div className="flex justify-end mt-8 space-x-2 no-print">
          <Button variant="outline" onClick={() => router.push('/pos')}>
            Back to POS
          </Button>
          <Button onClick={() => window.print()}>Print</Button>
        </div>
      </div>
      <style jsx global>{`
        @media print {
          .no-print {
            display: none;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
