"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from 'lucide-react';
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userOtpSchema } from "@/types/schema";
import clsx from "clsx";

// "@/types/form.ts"
export type userData = z.infer<typeof userOtpSchema>;

export default function SignupPage () {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<userData>({
        resolver: zodResolver(userOtpSchema),
        defaultValues: {
            otp: 0
        },
    });

    const create = async (data: userData) => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            console.log(data)
        } catch (error: unknown) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            if (error instanceof Error) {
                setErrorMessage(error?.message || "Une erreur inattendue est survenue.");
            }
        } finally {
            setIsLoading(false);
            console.log(errorMessage)
        }
    };

    const onSubmit = async (values: userData) => {
        await create(values);
    };

    return (
        <section className="w-full text-primary space-y-14">
            <div>
                <h1 className="font-semibold text-4xl">Email <br/> Confirmation</h1>
            </div>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full max-w-sm items-center gap-3">
                    {form.formState.errors.otp && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.otp.message}</p>
                    )}
                    <Label htmlFor="email">Your email</Label>
                    <Input
                        id="otp"
                        type="otp"
                        className={clsx("rounded-none py-1.5", {
                            "border border-red-500" : form.formState.errors.otp?.message !== undefined,
                            "border border-[#33475B]" : form.formState.errors.otp?.message === undefined
                        })}
                        {...form.register("otp")}
                    />
                </div>
                <Button
                    type="submit" // Très important pour déclencher la soumission du formulaire
                    className="w-full bg-primary rounded-none text-white border border-primary cursor-pointer hover:bg-white hover:text-primary"
                    disabled={isLoading} // Désactive le bouton pendant le chargement
                >
                    {isLoading ? (
                        <>
                            Processing <LoaderCircle className="h-4 w-4 animate-spin ml-2" />
                        </>
                    ) : (
                        "Next"
                    )}
                </Button>
            </form>
            <div className='w-fit flex items-center mt-4'>
                <p className="mr-1">Already have an account ? </p>
                <Link href='/auth/login' className="text-secondary">Let&apos;s login</Link>
            </div>
        </section>
    );
}