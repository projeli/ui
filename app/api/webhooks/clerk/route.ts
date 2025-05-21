import { userApi } from '@/lib/api/user/user-api'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req)

    if (event.type === 'user.created') {
        console.log('User created:', event.data)
        var response = await userApi.createUser({
            userId: event.data.id,
            userName: event.data.username!,
            email: event.data.email_addresses.find((email) => email.id === event.data.primary_email_address_id)?.email_address || '',
            firstName: event.data.first_name,
            lastName: event.data.last_name,
            imageUrl: event.data.image_url,
        })
        if (!response.success) {
            console.error('Error creating user:', response);
            return new Response('Error creating user', { status: 500 })
        }
    } else if (event.type === 'user.updated') {
        var response = await userApi.updateUser({
            userId: event.data.id,
            userName: event.data.username!,
            email: event.data.email_addresses.find((email) => email.id === event.data.primary_email_address_id)?.email_address || '',
            firstName: event.data.first_name,
            lastName: event.data.last_name,
            imageUrl: event.data.image_url,
        })
        if (!response.success) {
            console.error('Error updating user:', response);
            return new Response('Error updating user', { status: 500 })
        }
    } else if (event.type === 'user.deleted') {
        if (event.data.deleted && event.data.id) {
            var response = await userApi.deleteUser(event.data.id);
            if (!response.success) {
                console.error('Error deleting user:', response);
                return new Response('Error deleting user', { status: 500 })
            }
        }
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error("reqult", 'Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}

export async function GET(req: NextRequest) {
    console.log(await userApi.deleteUser("user_2xPEAN4ZS1Zwbtbe4P0Xj49ECUa"));
    return new Response('Webhook endpoint for Clerk')
}