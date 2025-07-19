import React from "react";
import { Button } from "@/components/ui/button"
import { Mail } from 'lucide-react';
import Link from "next/link";


export default function AuthWelcome () {
    return (
        <section className="w-full text-primary space-y-14">
            <div>
                <h1 className="font-semibold text-4xl">Let’s sign you up.</h1>
                <p className="font-light">Create your TRACE acount.</p>
            </div>
            <div>
                <h1 className="font-semibold text-4xl">Get started with our <br/> <span className="text-secondary font-semibold text-4xl">7 day, free trial</span> no credit card required</h1>
            </div>
            <Link href='/auth/signup'>
                <Button className="w-full bg-primary rounded-md text-white border border-primary cursor-pointer hover:bg-white hover:text-primary"><Mail />Sign up with Email</Button>
            </Link>
            <div className='w-fit flex items-center mt-4'>
                <p className="mr-1">Already have an account ? </p>
                <Link href='/auth/login' className="text-secondary">Let&apos;s login</Link>
            </div>
        </section>
    )
}