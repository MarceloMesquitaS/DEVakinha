import {loadStripe} from '@stripe/stripe-js'

export async function getStripe() {
const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
return stripeJs;
}