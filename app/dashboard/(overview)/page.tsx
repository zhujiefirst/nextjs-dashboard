import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton} from '@/app/ui/skeletons';
import {fetchCardData, fetchLatestInvoices} from "@/app/lib/data";

export default async function Page() {
    // 获取开始时间
    let startTime = Date.now();
    const
        { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices }
    = await fetchCardData()
    let revenueTime = Date.now();
    console.log(`执行时间：${revenueTime - startTime}毫秒`);
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                仪表板
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper/>
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}