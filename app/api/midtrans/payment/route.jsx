import { NextResponse } from 'next/server';
import { core } from '@/app/lib/midtrans';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Received body:', body);
        let parameter = {
            "transaction_details": {
                "gross_amount": body.gross_amount,
                "order_id": body.order_id,
            },
            "customer_details": {
                "first_name": body.customer_name,
                "email": body.customer_email,
                "phone": body.customer_phone
            },
            "item_details": [
                {
                    "id": body.item_id,
                    "price": body.gross_amount,
                    "quantity": 1,
                    "name": body.item_name
                }
            ],
            "metadata": {
                "userid": body.userid,    
                "zone": body.zone,           
                "code": body.item_id         
            }
        };

        switch(body.payment_type) {
            case 'bank_transfer':
                parameter.payment_type = "bank_transfer";
                parameter.bank_transfer = {
                    "bank": body.payment_method 
                };
                break;
            case 'ewallet':
                parameter.payment_type = body.payment_method; 
                if (body.payment_method === 'gopay') {
                    parameter.gopay = {
                        "enable_callback": true,
                        "callback_url": "someapps://callback" 
                    };
                }
                break;
            case 'qris':
                parameter.payment_type = "gopay";
                break;
            default:
                throw new Error('Unsupported payment type');
        }
        const chargeResponse = await core.charge(parameter);
        console.log('chargeResponse:', JSON.stringify(chargeResponse));

        return NextResponse.json(chargeResponse, { status: 200 });
    } catch (error) {
        console.error('Error occurred:', error.message);
        return NextResponse.json({ error: 'Failed to generate payment' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const orderId = url.searchParams.get('orderId');

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const transactionStatus = await core.transaction.status(orderId);
        console.log('Transaction status:', JSON.stringify(transactionStatus));

        return NextResponse.json(transactionStatus, { status: 200 });
    } catch (error) {
        console.error('Error occurred while checking transaction status:', error.message);
        return NextResponse.json({ error: 'Failed to check transaction status' }, { status: 500 });
    }
}