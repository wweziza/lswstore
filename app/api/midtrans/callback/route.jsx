import { NextResponse } from 'next/server';
import { snap } from '@/app/lib/midtrans';
import crypto from 'crypto';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Received callback:', JSON.stringify(body));
        const expectedSignatureKey = crypto.createHash('sha512')
            .update(body.order_id + body.status_code + body.gross_amount + process.env.MIDTRANS_SERVER_KEY)
            .digest('hex');

        if (body.signature_key !== expectedSignatureKey) {
            console.error('Invalid signature key!');
            return NextResponse.json({ error: 'Invalid signature key' }, { status: 403 });
        }

        const verificationResult = await snap.transaction.status(body.order_id); 
        console.log('Verification status:', verificationResult);

        switch(verificationResult.transaction_status) {
            case 'capture':
            case 'settlement':
                if (verificationResult.fraud_status === 'accept') {
                    console.log('Transaction successful:', verificationResult.order_id);
                    const { metadata } = verificationResult;

                    if (metadata) {
                        console.log('Metadata - userid:', metadata.userid);
                        console.log('Metadata - zone:', metadata.zone);
                        console.log('Metadata - code:', metadata.code);

                        const params = {
                            key: process.env.VIPRESELLER_APIKEY,
                            sign: process.env.VIPRESELLER_APISIGN,
                            type: 'order',
                            service: metadata.code,
                            data_no: metadata.userid, 
                            data_zone: metadata.zone 
                          };
                        try {
                            const response = await fetch('https://vip-reseller.co.id/api/game-feature', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(params),
                            });

                            const result = await response.json();
                            console.log('Response from API VIP-RESELLER:', result);
                        } catch (error) {
                            console.error('Error posting to API:', error);
                        }

                    } else {
                        console.log('No metadata found in the verification result.');
                    }
                    
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
