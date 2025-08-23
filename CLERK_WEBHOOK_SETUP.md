# Clerk Webhook Setup Guide

This guide will help you set up Clerk webhooks to automatically create users in your database when they register through Clerk.

## Prerequisites

- Clerk account and application set up
- MongoDB database (local or Atlas)
- Next.js application with Clerk integration

## Step 1: Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your environment variables:
   ```env
   # Get these from your Clerk Dashboard
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_here
   CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   
   # Your MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/medix
   ```

## Step 2: Configure Clerk Webhook

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to **Webhooks** in the sidebar
4. Click **Add Endpoint**
5. Set the endpoint URL to: `https://yourdomain.com/api/webhooks/clerk`
   - For local development with ngrok: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
6. Select the following events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
7. Click **Create**
8. Copy the **Signing Secret** and add it to your `.env.local` as `CLERK_WEBHOOK_SECRET`

## Step 3: Local Development with ngrok (Optional)

For local testing, you'll need to expose your local server to the internet:

1. Install ngrok: https://ngrok.com/download
2. Start your Next.js development server:
   ```bash
   npm run dev
   ```
3. In another terminal, expose your local server:
   ```bash
   ngrok http 3002
   ```
4. Use the ngrok URL in your Clerk webhook configuration

## Step 4: Test the Webhook

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Register a new user through your Clerk sign-up flow

3. Check your server logs - you should see:
   ```
   Webhook with an ID of evt_... and type of user.created
   Creating user: { clerkId: 'user_...', email: '...', ... }
   User created successfully: { _id: '...', ... }
   ```

4. Verify the user was created in your MongoDB database

## Webhook Events Handled

- **user.created**: Creates a new user in your database
- **user.updated**: Updates existing user information
- **user.deleted**: Removes user from your database

## Database Schema

The webhook creates users with the following schema:

```typescript
{
  clerkId: string;        // Clerk user ID
  email: string;          // User's email
  firstName?: string;     // User's first name
  lastName?: string;      // User's last name
  imageUrl?: string;      // Profile image URL
  role: 'patient' | 'doctor' | 'admin'; // Default: 'patient'
  createdAt: Date;
  updatedAt: Date;
}
```

## Troubleshooting

### Webhook not receiving events
- Check that your endpoint URL is correct and accessible
- Verify your `CLERK_WEBHOOK_SECRET` matches the one in Clerk Dashboard
- Check server logs for any errors

### Database connection issues
- Verify your `MONGODB_URI` is correct
- Ensure MongoDB is running (if using local instance)
- Check network connectivity for MongoDB Atlas

### Verification errors
- Ensure you're using the correct webhook secret
- Check that the svix headers are being passed correctly

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your webhook secret secure
- The webhook endpoint verifies requests using Svix signatures
- All database operations include error handling

## Next Steps

After setting up webhooks, you can:
- Add additional user fields to the schema
- Implement role-based access control
- Add user profile management features
- Sync additional Clerk user data