"use server"

import {stripe} from '@/lib/stripe'

export async function getLoginOnboardAccount (accountId: string | undefined ){

    if (!accountId){
        return null;
    }

    try{

        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${process.env.HOST_URL!}/dasboard`,
            return_url: `${process.env.HOST_URL!}/dasboard`,
            type: "account_onboarding"
        })

        return accountLink.url

    }catch (err) {
        console.log ("## ERRO ACCOUNT ID", err)
        return null;
    }
}