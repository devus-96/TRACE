"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
// Assurez-vous que ces imports sont corrects et que les composants existent
import { InputPasswrd } from "@/components/ui/passwordInput";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from 'lucide-react';
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Pour la gestion du champ MyPhoneInput, vous devrez utiliser Controller de react-hook-form
import { userLoginSchema } from "@/types/schema";
import clsx from "clsx";

// "@/types/form.ts"
export type userData = z.infer<typeof userLoginSchema>;

export default function LoginPage () {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<userData>({
        resolver: zodResolver(userLoginSchema),
        defaultValues: {
            email: "",
            password: ""
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
        console.log(values)
        await create(values);
    };

    return (
        <section className="w-full text-primary space-y-14">
            <div>
                <h1 className="font-semibold text-4xl">Let’s log you in.</h1>
                <p className="font-light">Log Into your TRACE acount.</p>
            </div>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="email">Your email</Label>
                    <Input
                        id="email"
                        type="email"
                        className={clsx("rounded-none py-1.5", {
                            "border border-red-500" : form.formState.errors.email?.message !== undefined,
                            "border border-[#33475B]" : form.formState.errors.email?.message === undefined
                        })}
                        {...form.register("email")}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="password">Password</Label>
                    <InputPasswrd
                        state={form.formState.errors.password?.message}
                        {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
                    )}
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
                        "Login"
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