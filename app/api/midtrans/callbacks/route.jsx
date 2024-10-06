import { NextResponse } from 'next/server';

import { core } from '@/app/lib/midtrans';
export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Received callback:', JSON.stringify(body));

        const verificationResult = await core.transaction.notification(body);
        console.log('Verification status:', verificationResult);

        switch(verificationResult.transaction_status) {
            case 'capture':
            case 'settlement':
                if (verificationResult.fraud_status === 'accept') {
                    console.log('Transaction successful:', verificationResult.order_id);
                }
                break;
            case 'deny':
                console.log('Transaction denied:', verificationResult.order_id);
                break;
            case 'cancel':
            case 'expire':
                console.log('Transaction canceled or expired:', verificationResult.order_id);
                break;
            case 'pending':
                console.log('Transaction pending:', verificationResult.order_id);
                break;
        }

        return NextResponse.json({ status: 'OK' }, { status: 200 });
    } catch (error) {
        console.error('Error processing callback:', error.message);
        return NextResponse.json({ error: 'Failed to process callback' }, { status: 500 });
    }
}