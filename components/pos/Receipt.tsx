import { Order } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ReceiptProps {
  order: Order;
}

export default function Receipt({ order }: ReceiptProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Receipt</CardTitle>
        <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <h3 className="font-semibold">Items</h3>
            <Separator className="my-2" />
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>
                  {item.qty} x ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold">Summary</h3>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="text-center text-sm text-gray-500">
            <p>Thank you for your purchase!</p>
            <p>Date: {new Date(order.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
