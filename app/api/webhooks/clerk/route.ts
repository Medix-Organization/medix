import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';

// You'll need to add your Clerk webhook secret to your environment variables
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error('Please add CLERK_WEBHOOK_SECRET to your environment variables');
}

export async function POST(req: NextRequest) {
 
  try {
    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse('Error occurred -- no svix headers , or one of the svix headers is missing', {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(webhookSecret!);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new NextResponse('Error occurred', {
        status: 400,
      });
    }

    // Handle the webhook
    const { id } = evt.data;
    const eventType = evt.type;

    console.log('🚀 WEBHOOK RECEIVED!');
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', body);

    // Handle user creation
    if (eventType === 'user.created') {
      const { id, email_addresses, image_url } = evt.data;
      
      // Create user in your database
      const userData = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        imageUrl: image_url,
      };

      console.log('🔥 CREATING USER:', userData);
      console.log('📧 User email:', userData.email);
      
      try {
        ;
        console.log('User created successfully:',userData.email);
      } catch (error) {
        console.error('Error creating user:', error);
        return new NextResponse('Error creating user', { status: 500 });
      }
    }

    // Handle user updates
    // if (eventType === 'user.updated') {
    //   const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      
    //   const updateData = {
    //     email: email_addresses[0]?.email_address,
    //     firstName: first_name,
    //     lastName: last_name,
    //     imageUrl: image_url,
    //     updatedAt: new Date(),
    //   };

    //   console.log('Updating user:', updateData);
      
    //   try {
    //     const user = await updateUserByClerkId(id, updateData);
    //     console.log('User updated successfully:', user);
    //   } catch (error) {
    //     console.error('Error updating user:', error);
    //     return new NextResponse('Error updating user', { status: 500 });
    //   }
    // }

    // // Handle user deletion
    // if (eventType === 'user.deleted') {
    //   const { id } = evt.data;
      
    //   console.log('Deleting user with Clerk ID:', id);
      
    //   try {
    //     const user = await deleteUserByClerkId(id);
    //     console.log('User deleted successfully:', user);
    //   } catch (error) {
    //     console.error('Error deleting user:', error);
    //     return new NextResponse('Error deleting user', { status: 500 });
    //   }
    // }

    return new NextResponse('', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}